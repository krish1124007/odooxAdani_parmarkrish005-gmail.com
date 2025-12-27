# Inngest Background Tasks

This folder contains all Inngest-related code for handling background tasks in the Odoo Maintenance application.

## Structure

```
inngest/
├── client.ts                          # Inngest client configuration
├── index.ts                           # Export all functions and serve handler
└── functions/
    └── sendRequestNotification.ts     # Send email when request is created
```

## How It Works

### 1. Client Configuration (`client.ts`)
- Initializes the Inngest client with app ID and name
- Used throughout the application to send events

### 2. Functions (`functions/`)
- Each file exports an Inngest function that handles a specific background task
- Functions are triggered by events sent from your application code

### 3. Current Functions

#### `sendRequestNotification`
- **Event**: `maintenance/request.created`
- **Purpose**: Sends email notification to assigned technician when a new maintenance request is created
- **Steps**:
  1. Fetches request details from database
  2. Gets technician email
  3. Sends formatted HTML email with request details

## Usage

### Triggering an Event

In your controller or service:

```typescript
import { inngest } from "../../inngest/client.js";

// After creating a maintenance request
await inngest.send({
    name: "maintenance/request.created",
    data: {
        requestId: request._id.toString(),
        technicianId: assignedTechnician,
        requestedById: requestedBy,
        subject,
        type,
        equipmentId: equipment,
    },
});
```

### Adding New Functions

1. Create a new file in `functions/` directory:

```typescript
// functions/myNewFunction.ts
import { inngest } from "../client.js";

export const myNewFunction = inngest.createFunction(
    { 
        id: "my-new-function",
        name: "My New Function"
    },
    { event: "my/event.name" },
    async ({ event, step }) => {
        // Your background task logic here
        await step.run("step-name", async () => {
            // Do something
        });
    }
);
```

2. Export it in `index.ts`:

```typescript
import { myNewFunction } from "./functions/myNewFunction.js";

export const inngestFunctions = [
    sendRequestNotification,
    myNewFunction  // Add your new function
];
```

## Environment Variables

Make sure these are set in your `.env` file:

```env
# Email Configuration
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=your-email@gmail.com
MAIL_PASS=your-app-password
MAIL_FROM="Odoo Maintenance <noreply@maintenance.com>"
```

## Development

### Local Development with Inngest Dev Server

1. Install Inngest CLI:
```bash
npx inngest-cli@latest dev
```

2. This will start the Inngest Dev Server at `http://localhost:8288`

3. Your app will automatically connect to it when running locally

### Testing

You can test your functions by:
1. Creating a maintenance request through your API
2. Checking the Inngest Dev Server UI to see the function execution
3. Verifying the email was sent

## Production

In production, you'll need to:
1. Sign up at [inngest.com](https://inngest.com)
2. Get your production event key
3. Set it in your environment variables
4. Deploy your application

The `/api/inngest` endpoint will be called by Inngest's cloud service to execute your functions.

## Benefits

- **Reliability**: Automatic retries on failure
- **Observability**: See all function runs in the Inngest dashboard
- **Scalability**: Functions run independently and can scale
- **Development**: Easy local testing with Dev Server
- **Type Safety**: Full TypeScript support
