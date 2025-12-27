import { serve } from "inngest/express";
import { inngest } from "./client.js";
import { sendRequestNotification } from "./functions/sendRequestNotification.js";

// Export all Inngest functions
export const inngestFunctions = [
    sendRequestNotification
];

// Create the Inngest serve handler for Express
export const inngestServe = serve({
    client: inngest,
    functions: inngestFunctions,
});
