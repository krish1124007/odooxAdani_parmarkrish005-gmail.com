# Inngest Setup Guide

## Quick Start

### 1. Install Dependencies
Already done! ✅ Inngest has been installed.

### 2. Configure Environment Variables

Copy the `.env.example` to `.env` and fill in your email credentials:

```bash
cp .env.example .env
```

Update these values in `.env`:
```env
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=your-email@gmail.com
MAIL_PASS=your-gmail-app-password
MAIL_FROM="Odoo Maintenance <noreply@yourdomain.com>"
```

**Note for Gmail users:**
- You need to use an "App Password" instead of your regular password
- Go to: Google Account → Security → 2-Step Verification → App passwords
- Generate a new app password for "Mail"

### 3. Start Inngest Dev Server (for local development)

Open a new terminal and run:

```bash
npx inngest-cli@latest dev
```

This will start the Inngest Dev Server at `http://localhost:8288`

You'll see a UI where you can:
- Monitor function executions
- See event logs
- Debug failures
- Replay events

### 4. Start Your Application

In your main terminal:

```bash
npm run dev
```

### 5. Test the Integration

Create a maintenance request via your API:

```bash
POST http://localhost:5000/api/v1/user/create-request

{
    "subject": "Printer Not Working",
    "type": "corrective",
    "equipment": "equipment_id_here",
    "maintenanceTeam": "team_id_here",
    "assignedTechnician": "technician_id_here",
    "requestedBy": "user_id_here",
    "company": "company_id_here"
}
```

### 6. Verify Email Sent

1. Check the Inngest Dev Server UI at `http://localhost:8288`
2. You should see the `send-request-notification` function executed
3. The assigned technician should receive an email

## How It Works

```
User Creates Request
        ↓
Controller saves to DB
        ↓
Inngest event triggered: "maintenance/request.created"
        ↓
Inngest picks up event (async, in background)
        ↓
sendRequestNotification function runs
        ↓
Email sent to technician
```

## Folder Structure

```
src/
└── inngest/
    ├── client.ts                          # Inngest client
    ├── index.ts                           # Export functions
    ├── README.md                          # Documentation
    └── functions/
        └── sendRequestNotification.ts     # Email notification function
```

## Production Deployment

For production:

1. Sign up at [inngest.com](https://inngest.com)
2. Create a new app
3. Get your event key and signing key
4. Add to production environment:
   ```env
   INNGEST_EVENT_KEY=your-key
   INNGEST_SIGNING_KEY=your-signing-key
   ```
5. Deploy your app - Inngest will call your `/api/inngest` endpoint

## Troubleshooting

### Email not sending?
- Check your `.env` file has correct email credentials
- For Gmail, ensure you're using an App Password
- Check Inngest Dev Server UI for error messages

### Function not triggering?
- Ensure Inngest Dev Server is running
- Check that `assignedTechnician` is provided in the request
- Look at the Inngest Dev Server UI for event logs

### Need help?
- Check the Inngest documentation: https://www.inngest.com/docs
- Review the function code in `src/inngest/functions/sendRequestNotification.ts`
