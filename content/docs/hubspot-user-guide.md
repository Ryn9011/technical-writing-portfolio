# Setting Up the HubSpot Integration

Connect your HubSpot account to sync meeting and sales data with your organisation.

> **Who this guide is for:** Organisation administrators connecting or managing the HubSpot integration.
>
> **Time to complete:** About 5 minutes.

## Overview

The HubSpot integration allows your organisation to connect its HubSpot CRM account to the application. Once connected, the integration can use HubSpot data to enrich meeting records and associate sales activity with contacts and companies in your CRM.

The integration uses HubSpot's OAuth 2.0 authentication, so you can authorise access without sharing your HubSpot password with the application.

## Before you begin

Before connecting HubSpot, make sure:

- You have access to the application as an organisation administrator.
- You have permission to authorise integrations for your HubSpot account.
- You have access to the HubSpot account you want to connect.
- Your organisation has the HubSpot integration enabled.

## Connect your HubSpot account

### 1. Open integration settings

Sign in to the application and open your organisation's **Settings**.

Select **Integrations**, then locate **HubSpot**.

You should see the current connection status and an option to connect your HubSpot account.

### 2. Start the connection

Select **Connect HubSpot**.

A HubSpot authorisation window will open.

If you are already signed in to HubSpot, you may be asked to select the HubSpot account you want to connect.

### 3. Authorise the application

Review the permissions requested by the application.

These permissions allow the application to access the HubSpot data required by the integration.

Select **Connect app** or the equivalent confirmation button in HubSpot.

> **Tip:** Check that the account and permissions shown match what you expect before confirming. If anything looks unfamiliar, close the window and check with your HubSpot administrator before proceeding.

You will then be returned to the application.

### 4. Confirm the connection

Return to **Settings → Integrations → HubSpot**.

The integration status should now show as connected.

The application stores the authorisation securely and uses it when communicating with HubSpot. Your HubSpot password is never stored by the application.

## What happens after connecting?

Once the integration is connected, the application can communicate with HubSpot on behalf of your organisation.

Depending on the features enabled for your organisation, this can include:

- Looking up HubSpot contacts and companies.
- Matching meeting participants to CRM contacts.
- Enriching meeting records with HubSpot information.
- Updating supported CRM records.
- Recording the status of CRM enrichment operations.
- Retrying failed CRM operations.

> **Note:** CRM changes are only made when the application has sufficient confidence in the matched data. This safeguard helps prevent incorrect meeting information from being written to your CRM. If you notice CRM data isn't updating for a specific meeting, see [Troubleshooting](#troubleshooting).

## Checking the integration status

You can check the connection from:

**Settings → Integrations → HubSpot**

The integration status indicates whether your HubSpot account is currently connected.

If the connection has expired or requires reauthorisation, you may be prompted to connect HubSpot again.

## Troubleshooting

| Symptom | Likely cause | See |
|---|---|---|
| HubSpot won't connect at all | Wrong HubSpot account signed in, or missing authorisation permission | [HubSpot won't connect](#hubspot-wont-connect) |
| Connected, but CRM data isn't appearing | Contact couldn't be matched, or the confidence threshold wasn't met | [The integration says it is connected, but data is not appearing](#the-integration-says-it-is-connected-but-data-is-not-appearing) |
| Was working, now needs attention | HubSpot access token expired or was revoked | [My HubSpot connection has stopped working](#my-hubspot-connection-has-stopped-working) |

### HubSpot won't connect

If the connection fails:

1. Make sure you are signed in to the correct HubSpot account.
2. Confirm that you have permission to authorise the application.
3. Close the HubSpot authorisation window and try again.
4. If the problem persists, sign out of HubSpot and retry the connection.

### The integration says it is connected, but data is not appearing

A successful connection does not necessarily mean that every CRM operation will succeed.

Check the meeting or CRM record for its enrichment status.

Possible causes include:

- The HubSpot contact could not be matched.
- Required CRM information was not available.
- A HubSpot API request failed.
- The operation was rejected because the confidence threshold was not met.
- A temporary HubSpot service or connectivity issue occurred.

Failed operations can be retried where the application provides a retry option.

### My HubSpot connection has stopped working

HubSpot access tokens can expire or become invalid.

If the application reports that your HubSpot connection needs attention, open:

**Settings → Integrations → HubSpot**

and reconnect your HubSpot account.

The application also refreshes HubSpot authentication tokens automatically where possible.

## Disconnecting HubSpot

If you no longer want your organisation to use the HubSpot integration, disconnect the integration from the HubSpot settings page.

Disconnecting prevents the application from making further requests to HubSpot on behalf of your organisation.

Existing meeting and enrichment records stored by the application are not necessarily removed when the HubSpot connection is disconnected.

## Security and privacy

> **Note:** Your HubSpot password is never shared with or stored by the application. All authentication happens directly between you and HubSpot.

The integration uses OAuth 2.0 to authenticate with HubSpot.

Authentication credentials are handled server-side and are not exposed to users through the application interface.

Access to HubSpot data is scoped to the organisation that authorised the integration. One organisation cannot use another organisation's HubSpot connection.

Raw meeting transcripts are not sent to HubSpot as part of the CRM enrichment process.

## Frequently asked questions

### Do I need to give the application my HubSpot password?

No. The integration uses HubSpot OAuth 2.0. You authenticate directly with HubSpot and authorise the application.

### Can other organisations access my HubSpot account?

No. HubSpot credentials and integration data are associated with the organisation that authorised the connection.

### What happens if a CRM update fails?

Failed CRM operations are tracked so they can be investigated and, where supported, retried.

### Will every meeting automatically update HubSpot?

Not necessarily. The integration uses matching and confidence checks before making CRM changes. If the application cannot confidently identify the correct CRM record, it will avoid making the change.

### Can I reconnect a HubSpot account after disconnecting it?

Yes. Open **Settings → Integrations → HubSpot** and select **Connect HubSpot** to start the authorisation flow again. You do not lose access to the integration by disconnecting it, and no historical meeting or enrichment data needs to be recreated.

## Next steps

- Check [Checking the integration status](#checking-the-integration-status) after your first few meetings to confirm CRM enrichment is working as expected.
- Bookmark [Troubleshooting](#troubleshooting) in case a meeting's CRM data doesn't look right.
- Review [Security and privacy](#security-and-privacy) if you need to answer questions from your compliance or IT team.
