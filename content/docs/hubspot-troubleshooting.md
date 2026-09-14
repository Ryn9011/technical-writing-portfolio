# Troubleshooting the HubSpot Integration

Use this guide to diagnose connection, enrichment, and CRM update problems in the HubSpot integration. It is intended for organisation administrators and support engineers.

## How enrichment works

After a meeting finishes AI analysis, the application evaluates whether HubSpot enrichment should run. It then attempts each enabled feature independently:

- **Meeting notes** — Creates a HubSpot meeting engagement containing the AI summary and associates it with matched contacts.
- **Contact enrichment** — Updates configured contact properties, such as `pain_points`, `budget_discussed`, and `timeline_discussed`.
- **Deal enrichment** — Updates configured properties on an existing deal associated with a matched contact.
- **Task automation** — Creates tasks from extracted action items, subject to the configured due-date, assignment, and priority settings.

The application records each attempt in the enrichment audit history. A failure in one feature does not prevent the other enabled features from running, and a HubSpot failure does not fail the meeting's transcript or AI analysis.

## Before you begin

Collect the following information before investigating a failed enrichment:

- The meeting ID or affected meeting.
- The approximate time AI analysis completed.
- The meeting's overall enrichment status.
- The enrichment history and any error message or HTTP status.
- The HubSpot contact, deal, or task involved, if applicable.
- The organisation's selected HubSpot preset and enabled features.

Do not include HubSpot access tokens, refresh tokens, API keys, passwords, or other credentials in a support request.

## Quick diagnosis

| Symptom | Most likely cause | First action |
|---|---|---|
| The meeting was not enriched | Enrichment was disabled, no participant matched, or confidence was below the configured threshold | Check the meeting status and participant matching conditions |
| A contact was not updated | No contact matched by email or name, or contact enrichment is disabled | Verify the participant's HubSpot contact and the contact feature setting |
| A deal was not updated | No existing deal was found for the matched contact, or deal enrichment is disabled | Confirm that the contact has an associated deal |
| Tasks were not created | No action items were extracted, or task creation is disabled or filtered | Check the analysis output and task settings |
| Some CRM updates succeeded and others failed | One feature failed independently | Review the per-feature audit records |
| The connection stopped working | OAuth access is invalid, or no usable OAuth token or legacy API key is available | Check the connection status and reconnect if required |

## A meeting was not enriched

Check the meeting's overall status first. The integration uses the following statuses:

- **NotAttempted** — Enrichment was not run. This can occur when enrichment is explicitly disabled, automatic participant detection found no matching contact, or the confidence requirement was not met.
- **InProgress** — Enrichment is currently being processed.
- **Completed** — All attempted enrichment features succeeded.
- **PartiallyCompleted** — At least one feature succeeded and at least one feature failed.
- **Failed** — The enrichment attempt did not complete successfully.

If the status is **NotAttempted**, check these conditions:

1. Confirm that HubSpot enrichment is enabled for the meeting or organisation.
2. If the meeting uses automatic detection, confirm that at least one participant matches an existing HubSpot contact.
3. Check the participant's email address first, then their name. The integration attempts contact matching by email and falls back to a name search.
4. Confirm that the AI analysis completed and produced the information required for the selected features.
5. Check the configured minimum confidence score. The default is `0.8` (80%), but the value can be changed by the selected preset or organisation settings.

The integration fails closed: it does not write to HubSpot when the available information is not sufficiently reliable.

## A contact was not matched or updated

The integration does not create HubSpot contacts for unrecognised participants. Automatic contact creation is not currently shipped.

To investigate a missing contact update:

1. Confirm that the participant already exists as a HubSpot contact.
2. Verify that the participant's email address matches the contact's email in HubSpot.
3. If no email match is available, verify that the participant's name matches the HubSpot contact.
4. Confirm that **Contact enrichment** is enabled in the HubSpot settings.
5. Check the meeting's confidence score against `MinimumConfidenceScore`.
6. Review the meeting's enrichment history for a `ContactUpdate` audit record and its error details.

Correct the contact data or settings before retrying the meeting enrichment.

## A deal was not updated

Deal enrichment applies to an existing deal associated with the matched contact. The integration does not create deals, and automatic deal-stage progression is not currently shipped.

Check the following:

1. Confirm that the participant was matched to the correct HubSpot contact.
2. Confirm that the contact has an associated deal in HubSpot.
3. Confirm that **Deal enrichment** is enabled.
4. Verify that the configured deal properties are available and writable.
5. Review the `DealUpdate` audit record for the meeting.

If no associated deal exists, the absence of a deal is expected behaviour rather than a connection failure.

## Tasks were not created

Tasks are created from action items extracted during AI analysis. Check the following:

1. Confirm that the analysis produced one or more action items.
2. Confirm that **Task automation** is enabled.
3. Check whether **Only create high-priority tasks** is enabled. If it is, non-high-priority action items are intentionally filtered out.
4. Check the configured default due-date interval. Tasks use the meeting date plus the configured number of days.
5. If task assignment is enabled, confirm that the meeting host can be resolved.
6. Review the `TaskCreation` audit record for the meeting.

## The enrichment is partially complete

**PartiallyCompleted** means that the application recorded both successful and failed feature attempts. For example, a meeting note may have been created while a deal update failed.

To investigate:

1. Open the meeting's enrichment history.
2. Identify the failed feature by its enrichment type: `MeetingNote`, `ContactUpdate`, `DealUpdate`, or `TaskCreation`.
3. Review the recorded HubSpot object ID, HTTP status code, and error message.
4. Resolve the underlying problem in HubSpot or the integration settings.
5. Use the meeting retry operation to run enrichment again.

Do not assume that a partially completed meeting needs to be processed or transcribed again. The retry path reruns enrichment for the meeting.

## The connection is active, but enrichment fails

A connected account does not guarantee that every CRM operation will succeed. Enrichment can still be skipped or fail because of matching, confidence, configuration, analysis, or HubSpot API conditions.

Check the following in order:

1. Confirm the integration status in **Settings → Integrations → HubSpot**.
2. Use the connection test to verify that the current HubSpot credentials can make an API request.
3. Check the meeting's overall status and enrichment history.
4. Confirm that the required feature is enabled.
5. Verify the participant match and confidence score.
6. Check the recorded HTTP status and error message.
7. Retry only after resolving the underlying issue.

The application can use an OAuth access token when one is available. For organisations that have not migrated, it can fall back to the legacy API-key path. If neither authentication path is available, the enrichment attempt fails.

## The HubSpot connection needs attention

OAuth access tokens are refreshed proactively by the integration where possible. Reauthorisation may still be required if a token is revoked, invalid, or cannot be refreshed.

1. Open **Settings → Integrations → HubSpot**.
2. Check the connection status and connected HubSpot account.
3. Start the OAuth connection flow again.
4. Select the intended HubSpot account and approve the requested permissions.
5. Return to the application and confirm that the connection status is healthy.
6. Use the connection test before retrying a failed meeting.

If OAuth is not configured for the organisation, the settings page may provide the legacy API-key connection flow instead.

## The wrong HubSpot account is connected

The connected HubSpot account is associated with the organisation's integration. To change it:

1. Disconnect the current connection from **Settings → Integrations → HubSpot**.
2. Start the connection flow again.
3. Select the correct HubSpot account in the HubSpot authorisation window.
4. Confirm the new account with the connection test.

Disconnecting the integration prevents further requests to HubSpot. It does not necessarily remove existing meeting or enrichment records stored by the application.

## Retrying enrichment

The integration exposes a meeting-level retry operation. Use it after correcting the underlying issue:

1. Open the affected meeting's enrichment history.
2. Review the failed audit records and error details.
3. Correct the contact, deal, task configuration, credentials, or other underlying problem.
4. Run the meeting retry operation.
5. Review the new overall status and audit history.

Retrying does not reprocess the meeting transcript or repeat the complete meeting-analysis pipeline. It reruns the HubSpot enrichment path.

## Understanding audit history

Each enrichment attempt is recorded with:

- Enrichment type.
- HubSpot object ID, when one was created or updated.
- Success or failure.
- HTTP status code, when available.
- Error message, when available.
- Retry count.
- Creation timestamp.

Use the audit history rather than the overall meeting status alone. The overall status summarises the run; the audit records identify which CRM operation failed.

## When to contact support

Contact your organisation administrator or support team when:

- Reauthorisation or the connection test fails repeatedly.
- The correct contact exists but cannot be matched by email or name.
- A deal is associated with the contact but deal enrichment repeatedly fails.
- Multiple meetings fail with the same HTTP status or error.
- Retry does not recover a known, resolved failure.
- The integration reports an error that you cannot resolve.

Include the meeting ID, timestamp, overall status, affected enrichment type, HTTP status, error message, and steps already taken. Never include credentials.

## Frequently asked questions

### Why was enrichment not attempted when the contact exists?

The contact's existence alone is not sufficient. Automatic detection must match a meeting participant, and the enrichment must satisfy the configured confidence threshold. Enrichment may also be disabled for the meeting or feature.

### Why did one CRM update succeed while another failed?

The four enrichment features are tracked independently. A note, contact update, deal update, or task can fail without cancelling the other attempted features. The meeting is marked **PartiallyCompleted** when at least one feature succeeds and another fails.

### Does the integration create contacts or deals?

No. Contact creation for unrecognised participants and automatic deal-stage progression are not currently shipped. Deal enrichment applies only when an existing associated deal is found.

### Does a failed enrichment mean the meeting analysis failed?

No. HubSpot enrichment failures are isolated from transcript processing and AI analysis. Review the HubSpot audit history and retry enrichment after resolving the problem.

### Will reconnecting HubSpot delete existing enrichment data?

No. Reconnecting changes the authentication path. Existing meeting and enrichment records stored by the application are not necessarily removed.
