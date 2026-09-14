using domain_api.Data;
using domain_api.Entities.Users;
using domain_api.Services.Email;
using domain_api.Services.Clerk;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace domain_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Policy = "TeamManagement")]
    public class InvitationController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ILogger<InvitationController> _logger;
        private readonly IEmailService _emailService;
        private readonly IClerkOrganizationService _clerkOrgService;

        public InvitationController(
            AppDbContext context, 
            ILogger<InvitationController> logger, 
            IEmailService emailService,
            IClerkOrganizationService clerkOrgService)
        {
            _context = context;
            _logger = logger;
            _emailService = emailService;
            _clerkOrgService = clerkOrgService;
        }

        /// <summary>
        /// Helper method to get Clerk user ID from JWT claims
        /// </summary>
        private string? GetClerkUserId()
        {
            return User.FindFirstValue(ClaimTypes.NameIdentifier) ?? User.FindFirstValue("sub");
        }

        /// <summary>
        /// Create a user invitation (Admin only)
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> CreateInvitation([FromBody] CreateInvitationRequest request)
        {
            var clerkUserId = GetClerkUserId();
            if (clerkUserId == null)
                return Unauthorized();

            var currentUser = await _context.Users
                .Include(u => u.Organization)
                .Include(u => u.Role)
                .FirstOrDefaultAsync(u => u.ClerkUserId == clerkUserId);

            if (currentUser?.Organization == null)
                return BadRequest(new { message = "User is not associated with any organization" });

            var organization = currentUser.Organization;

            // Check if organization has reached user limit
            if (organization.ActiveUserCount >= organization.MaxUsers)
            {
                return BadRequest(new { 
                    message = $"Organization has reached its user limit of {organization.MaxUsers}. Please upgrade subscription to invite more users.",
                    currentUsers = organization.ActiveUserCount,
                    maxUsers = organization.MaxUsers,
                    upgradeRequired = true
                });
            }

            // Check if user already exists with this email
            var existingUser = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == request.Email);

            if (existingUser != null)
            {
                if (existingUser.OrganizationId == organization.Id)
                {
                    return BadRequest(new { message = "User is already a member of this organization" });
                }
                else
                {
                    return BadRequest(new { message = "User with this email already exists in another organization" });
                }
            }

            // Check if invitation already exists
            var existingInvitation = await _context.UserInvitations
                .FirstOrDefaultAsync(i => i.Email == request.Email && 
                                         i.OrganizationId == organization.Id && 
                                         i.Status == InvitationStatus.Pending);

            if (existingInvitation != null)
            {
                return BadRequest(new { message = "Invitation already sent to this email address" });
            }

            // Verify role exists
            var role = await _context.Roles
                .FirstOrDefaultAsync(r => r.Id == request.RoleId);

            if (role == null)
            {
                return BadRequest(new { message = "Invalid role specified" });
            }

            // SalesLead may only invite users into the Sales role
            if (currentUser.Role.Name != "Admin" && role.Name != "Sales")
            {
                return Forbid();
            }

            // Create invitation
            var invitation = new UserInvitation
            {
                Id = Guid.NewGuid(),
                Email = request.Email,
                OrganizationId = organization.Id,
                RoleId = request.RoleId,
                InvitedByUserId = currentUser.Id,
                Token = GenerateInvitationToken(),
                Status = InvitationStatus.Pending,
                ExpiresAt = DateTime.UtcNow.AddDays(7), // 7-day expiration
                CreatedAt = DateTime.UtcNow
            };

            _context.UserInvitations.Add(invitation);
            await _context.SaveChangesAsync();

            _logger.LogInformation($"User invitation created for {request.Email} to organization {organization.Name} by {currentUser.Email}");

            // Map role to Clerk role
            // Note: We use org:member (Clerk's default member role) for all non-admin roles, 
            // and assign the actual role via webhook when they accept
            var clerkRole = role.Name.ToLower() switch
            {
                "admin" => "org:admin",
                _ => "org:member"
            };

            // Send invitation via Clerk - Clerk will send the email automatically
            var clerkInvitationId = await _clerkOrgService.InviteUserToOrganizationAsync(
                organization.Id, 
                request.Email, 
                clerkRole);

            if (clerkInvitationId == null)
            {
                // If Clerk invitation fails, roll back the database invitation
                _context.UserInvitations.Remove(invitation);
                await _context.SaveChangesAsync();
                _logger.LogError($"Failed to send Clerk invitation to {request.Email} - rolling back database invitation");
                return StatusCode(500, new { message = "Failed to send invitation through Clerk. Please try again." });
            }

            invitation.ClerkInvitationId = clerkInvitationId;
            await _context.SaveChangesAsync();

            _logger.LogInformation($"Clerk invitation sent successfully to {request.Email} for organization {organization.Id} with role {clerkRole}");
            
            return Ok(new
            {
                message = "Invitation sent successfully",
                invitation = new
                {
                    id = invitation.Id,
                    email = invitation.Email,
                    role = role.Name,
                    expiresAt = invitation.ExpiresAt,
                    clerkInvitationSent = true,
                    note = "User will receive an invitation email from Clerk and be automatically added to the organization when they accept"
                }
            });
        }

        /// <summary>
        /// Get all pending invitations for the organization
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> GetInvitations()
        {
            var clerkUserId = GetClerkUserId();
            if (clerkUserId == null)
                return Unauthorized();

            var currentUser = await _context.Users
                .FirstOrDefaultAsync(u => u.ClerkUserId == clerkUserId);

            if (currentUser?.OrganizationId == null)
                return BadRequest(new { message = "User is not associated with any organization" });

            var invitations = await _context.UserInvitations
                .Include(i => i.Role)
                .Include(i => i.InvitedByUser)
                .Where(i => i.OrganizationId == currentUser.OrganizationId)
                .OrderByDescending(i => i.CreatedAt)
                .Select(i => new
                {
                    id = i.Id,
                    email = i.Email,
                    role = new { id = i.Role.Id, name = i.Role.Name },
                    status = i.Status.ToString(),
                    invitedBy = new { fullName = i.InvitedByUser.FullName },
                    createdAt = i.CreatedAt,
                    expiresAt = i.ExpiresAt,
                    acceptedAt = i.AcceptedAt
                })
                .ToListAsync();

            return Ok(invitations);
        }

        /// <summary>
        /// Cancel a pending invitation
        /// </summary>
        [HttpDelete("{invitationId}")]
        public async Task<IActionResult> CancelInvitation(Guid invitationId)
        {
            var clerkUserId = GetClerkUserId();
            if (clerkUserId == null)
                return Unauthorized();

            var currentUser = await _context.Users
                .FirstOrDefaultAsync(u => u.ClerkUserId == clerkUserId);

            if (currentUser?.OrganizationId == null)
                return BadRequest(new { message = "User is not associated with any organization" });

            var invitation = await _context.UserInvitations
                .FirstOrDefaultAsync(i => i.Id == invitationId && 
                                         i.OrganizationId == currentUser.OrganizationId);

            if (invitation == null)
                return NotFound(new { message = "Invitation not found" });

            if (invitation.Status != InvitationStatus.Pending)
                return BadRequest(new { message = "Only pending invitations can be cancelled" });

            if (!string.IsNullOrEmpty(invitation.ClerkInvitationId))
            {
                var revoked = await _clerkOrgService.RevokeOrganizationInvitationAsync(
                    invitation.OrganizationId, invitation.ClerkInvitationId);

                if (!revoked)
                {
                    _logger.LogError($"Failed to revoke Clerk invitation {invitation.ClerkInvitationId} for {invitation.Email}");
                    return StatusCode(500, new { message = "Failed to cancel invitation in Clerk. Please try again." });
                }
            }

            invitation.Status = InvitationStatus.Cancelled;
            invitation.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            _logger.LogInformation($"Invitation to {invitation.Email} cancelled by {currentUser.Email}");

            return Ok(new { message = "Invitation cancelled successfully" });
        }

        /// <summary>
        /// Resend invitation email
        /// </summary>
        [HttpPost("{invitationId}/resend")]
        public async Task<IActionResult> ResendInvitation(Guid invitationId)
        {
            var clerkUserId = GetClerkUserId();
            if (clerkUserId == null)
                return Unauthorized();

            var currentUser = await _context.Users
                .Include(u => u.Organization)
                .FirstOrDefaultAsync(u => u.ClerkUserId == clerkUserId);

            if (currentUser?.Organization == null)
                return BadRequest(new { message = "User is not associated with any organization" });

            var invitation = await _context.UserInvitations
                .Include(i => i.Role)
                .FirstOrDefaultAsync(i => i.Id == invitationId && 
                                        i.OrganizationId == currentUser.Organization.Id &&
                                        i.Status == InvitationStatus.Pending);

            if (invitation == null)
                return NotFound(new { message = "Invitation not found or already processed" });

            // Revoke the old Clerk invitation before issuing a new one (Clerk has no native resend)
            if (!string.IsNullOrEmpty(invitation.ClerkInvitationId))
            {
                await _clerkOrgService.RevokeOrganizationInvitationAsync(invitation.OrganizationId, invitation.ClerkInvitationId);
            }

            var clerkRole = invitation.Role.Name.ToLower() switch
            {
                "admin" => "org:admin",
                _ => "org:member"
            };

            var clerkInvitationId = await _clerkOrgService.InviteUserToOrganizationAsync(
                invitation.OrganizationId, 
                invitation.Email, 
                clerkRole);

            if (clerkInvitationId == null)
            {
                _logger.LogError($"Failed to resend Clerk invitation to {invitation.Email}");
                return StatusCode(500, new { message = "Failed to resend invitation through Clerk. Please try again." });
            }

            invitation.ClerkInvitationId = clerkInvitationId;
            invitation.ExpiresAt = DateTime.UtcNow.AddDays(7);
            invitation.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            _logger.LogInformation($"Invitation resent to {invitation.Email} for organization {currentUser.Organization.Name}");

            return Ok(new
            {
                message = "Invitation resent successfully",
                email = invitation.Email,
                expiresAt = invitation.ExpiresAt
            });
        }

        /// <summary>
        /// Bulk invite multiple users
        /// </summary>
        [HttpPost("bulk")]
        public async Task<IActionResult> BulkCreateInvitations([FromBody] BulkInvitationRequest request)
        {
            var clerkUserId = GetClerkUserId();
            if (clerkUserId == null)
                return Unauthorized();

            var currentUser = await _context.Users
                .Include(u => u.Organization)
                .Include(u => u.Role)
                .FirstOrDefaultAsync(u => u.ClerkUserId == clerkUserId);

            if (currentUser?.Organization == null)
                return BadRequest(new { message = "User is not associated with any organization" });

            var organization = currentUser.Organization;

            // Check if organization has enough slots for all invitations
            var totalNewInvites = request.Invitations.Count;
            var availableSlots = organization.MaxUsers - organization.ActiveUserCount;

            if (totalNewInvites > availableSlots)
            {
                return BadRequest(new
                {
                    message = $"Cannot invite {totalNewInvites} users. Only {availableSlots} slots available.",
                    currentUsers = organization.ActiveUserCount,
                    maxUsers = organization.MaxUsers,
                    requestedInvites = totalNewInvites,
                    availableSlots = availableSlots
                });
            }

            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                var results = new List<object>();

                foreach (var inviteRequest in request.Invitations)
                {
                    // Check if user already exists
                    var existingUser = await _context.Users
                        .FirstOrDefaultAsync(u => u.Email == inviteRequest.Email);

                    if (existingUser != null)
                    {
                        results.Add(new
                        {
                            email = inviteRequest.Email,
                            success = false,
                            message = "User already exists in the system"
                        });
                        continue;
                    }

                    // Check if invitation already exists
                    var existingInvitation = await _context.UserInvitations
                        .FirstOrDefaultAsync(i => i.Email == inviteRequest.Email && 
                                                i.OrganizationId == organization.Id &&
                                                i.Status == InvitationStatus.Pending);

                    if (existingInvitation != null)
                    {
                        results.Add(new
                        {
                            email = inviteRequest.Email,
                            success = false,
                            message = "Pending invitation already exists"
                        });
                        continue;
                    }

                    // Verify role exists
                    var role = await _context.Roles
                        .FirstOrDefaultAsync(r => r.Id == inviteRequest.RoleId);

                    if (role == null)
                    {
                        results.Add(new
                        {
                            email = inviteRequest.Email,
                            success = false,
                            message = "Invalid role specified"
                        });
                        continue;
                    }

                    // SalesLead may only invite users into the Sales role
                    if (currentUser.Role.Name != "Admin" && role.Name != "Sales")
                    {
                        results.Add(new
                        {
                            email = inviteRequest.Email,
                            success = false,
                            message = "You can only invite users with the Sales role"
                        });
                        continue;
                    }

                    // Create invitation
                    var invitation = new UserInvitation
                    {
                        Id = Guid.NewGuid(),
                        Email = inviteRequest.Email,
                        OrganizationId = organization.Id,
                        RoleId = inviteRequest.RoleId,
                        InvitedByUserId = currentUser.Id,
                        Token = GenerateInvitationToken(),
                        Status = InvitationStatus.Pending,
                        ExpiresAt = DateTime.UtcNow.AddDays(7),
                        CreatedAt = DateTime.UtcNow
                    };

                    _context.UserInvitations.Add(invitation);

                    // Send invitation via Clerk - Clerk will send the email automatically
                    var clerkRole = role.Name.ToLower() switch
                    {
                        "admin" => "org:admin",
                        _ => "org:member"
                    };

                    var clerkInvitationId = await _clerkOrgService.InviteUserToOrganizationAsync(
                        organization.Id, 
                        inviteRequest.Email, 
                        clerkRole);

                    if (clerkInvitationId == null)
                    {
                        _context.UserInvitations.Remove(invitation);
                        results.Add(new
                        {
                            email = inviteRequest.Email,
                            success = false,
                            message = "Failed to send invitation through Clerk"
                        });
                        continue;
                    }

                    invitation.ClerkInvitationId = clerkInvitationId;

                    results.Add(new
                    {
                        email = inviteRequest.Email,
                        success = true,
                        message = "Invitation created successfully",
                        role = role.Name,
                        expiresAt = invitation.ExpiresAt
                    });
                }

                await _context.SaveChangesAsync();
                await transaction.CommitAsync();

                var successCount = results.Count(r => ((dynamic)r).success);
                var failureCount = results.Count - successCount;

                return Ok(new
                {
                    message = $"Processed {results.Count} invitations: {successCount} successful, {failureCount} failed",
                    summary = new { total = results.Count, successful = successCount, failed = failureCount },
                    results
                });
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                _logger.LogError(ex, "Error during bulk invitation creation");
                return StatusCode(500, new { message = "An error occurred during bulk invitation" });
            }
        }

        private string GenerateInvitationToken()
        {
            return Guid.NewGuid().ToString("N") + Guid.NewGuid().ToString("N");
        }
    }

    // DTOs
    public class CreateInvitationRequest
    {
        public string Email { get; set; } = string.Empty;
        public Guid RoleId { get; set; }
    }

    public class BulkInvitationRequest
    {
        public List<CreateInvitationRequest> Invitations { get; set; } = new();
    }
}