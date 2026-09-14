# Invitation API

Manages user invitations to an organization. Invitations are created locally and dispatched through Clerk, which sends the actual email.

**Base path:** `/api/Invitation`
**Auth:** Bearer token, `TeamManagement` policy required on every endpoint.
**Roles:** `Admin` can invite any role. `SalesLead` can only invite the `Sales` role.

| Method | Path | Description |
|---|---|---|
| POST | `/api/Invitation` | Create a single invitation |
| GET | `/api/Invitation` | List invitations for the caller's organization |
| DELETE | `/api/Invitation/{invitationId}` | Cancel a pending invitation |
| POST | `/api/Invitation/{invitationId}/resend` | Resend a pending invitation |
| POST | `/api/Invitation/bulk` | Create multiple invitations at once |

---

## Create an Invitation

Creates an invitation and sends it via Clerk.

`POST /api/Invitation`

### Request

```json
{
  "email": "jane@example.com",
  "roleId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

### Response

`200 OK`

```json
{
  "message": "Invitation sent successfully",
  "invitation": {
    "id": "b1a2c3d4-e5f6-7890-abcd-ef1234567890",
    "email": "jane@example.com",
    "role": "Sales",
    "expiresAt": "2025-01-22T00:00:00Z",
    "clerkInvitationSent": true,
    "note": "User will receive an invitation email from Clerk and be automatically added to the organization when they accept"
  }
}
```

### Errors

| Status | Cause |
|---|---|
| 401 | No authenticated user |
| 400 | Organization at `MaxUsers` limit |
| 400 | User with this email already exists (in this org or another) |
| 400 | A pending invitation already exists for this email |
| 400 | `roleId` does not match a known role |
| 403 | Caller is `SalesLead` and `roleId` is not `Sales` |
| 500 | Clerk invitation failed to send (local record is rolled back) |

---

## List Invitations

Returns every invitation (any status) for the caller's organization, newest first.

`GET /api/Invitation`

### Response

`200 OK`

```json
[
  {
    "id": "b1a2c3d4-e5f6-7890-abcd-ef1234567890",
    "email": "jane@example.com",
    "role": { "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6", "name": "Sales" },
    "status": "Pending",
    "invitedBy": { "fullName": "John Smith" },
    "createdAt": "2025-01-15T00:00:00Z",
    "expiresAt": "2025-01-22T00:00:00Z",
    "acceptedAt": null
  }
]
```

### Errors

| Status | Cause |
|---|---|
| 401 | No authenticated user |
| 400 | Caller is not associated with an organization |

---

## Cancel an Invitation

Cancels a pending invitation and revokes it in Clerk.

`DELETE /api/Invitation/{invitationId}`

### Response

`200 OK`

```json
{
  "message": "Invitation cancelled successfully"
}
```

### Errors

| Status | Cause |
|---|---|
| 401 | No authenticated user |
| 400 | Caller is not associated with an organization |
| 404 | Invitation not found in the caller's organization |
| 400 | Invitation is not in `Pending` status |
| 500 | Clerk failed to revoke the invitation |

---

## Resend an Invitation

Revokes the existing Clerk invitation and issues a new one with a refreshed 7-day expiry. Clerk has no native resend, so this is implemented as revoke + re-invite.

`POST /api/Invitation/{invitationId}/resend`

### Response

`200 OK`

```json
{
  "message": "Invitation resent successfully",
  "email": "jane@example.com",
  "expiresAt": "2025-01-29T00:00:00Z"
}
```

### Errors

| Status | Cause |
|---|---|
| 401 | No authenticated user |
| 400 | Caller is not associated with an organization |
| 404 | Invitation not found, or not `Pending` |
| 500 | Clerk failed to send the new invitation |

---

## Bulk Create Invitations

Creates multiple invitations in one call. Each entry is validated and processed independently; one failure does not stop the rest. All local writes commit in a single transaction.

`POST /api/Invitation/bulk`

### Request

```json
{
  "invitations": [
    { "email": "jane@example.com", "roleId": "3fa85f64-5717-4562-b3fc-2c963f66afa6" },
    { "email": "bob@example.com", "roleId": "3fa85f64-5717-4562-b3fc-2c963f66afa6" }
  ]
}
```

### Response

`200 OK`

```json
{
  "message": "Processed 2 invitations: 1 successful, 1 failed",
  "summary": { "total": 2, "successful": 1, "failed": 1 },
  "results": [
    {
      "email": "jane@example.com",
      "success": true,
      "message": "Invitation created successfully",
      "role": "Sales",
      "expiresAt": "2025-01-22T00:00:00Z"
    },
    {
      "email": "bob@example.com",
      "success": false,
      "message": "Pending invitation already exists"
    }
  ]
}
```

Per-item `message` values on failure: `"User already exists in the system"`, `"Pending invitation already exists"`, `"Invalid role specified"`, `"You can only invite users with the Sales role"`, `"Failed to send invitation through Clerk"`.

### Errors

| Status | Cause |
|---|---|
| 401 | No authenticated user |
| 400 | Caller is not associated with an organization |
| 400 | Requested invitation count exceeds available `MaxUsers` slots |
| 500 | Unexpected error during processing (transaction rolled back) |
