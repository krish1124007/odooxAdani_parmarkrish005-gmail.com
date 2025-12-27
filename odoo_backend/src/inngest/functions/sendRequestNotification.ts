import { inngest } from "../client.js";
import { sendMail } from "../../utils/sendMail.js";
import { UserModel } from "../../models/user.models.js";
import { MaintenanceRequestModel } from "../../models/request.models.js";
import { EquipmentModel } from "../../models/equipment.models.js";

interface RequestCreatedPayload {
    requestId: string;
    technicianId?: string;
    requestedById: string;
    subject: string;
    type: "corrective" | "preventive";
    equipmentId: string;
}

export const sendRequestNotification = inngest.createFunction(
    {
        id: "send-request-notification",
        name: "Send Maintenance Request Notification"
    },
    { event: "maintenance/request.created" },
    async ({ event, step }) => {
        const payload = event.data as RequestCreatedPayload;

        // Step 1: Fetch request details
        const request = await step.run("fetch-request-details", async () => {
            const requestData = await MaintenanceRequestModel.findById(payload.requestId)
                .populate("equipment")
                .populate("assignedTechnician")
                .populate("requestedBy");

            if (!requestData) {
                throw new Error(`Request ${payload.requestId} not found`);
            }

            return requestData;
        });

        // Step 2: Get technician email
        const technicianEmail = await step.run("get-technician-email", async () => {
            if (!payload.technicianId) {
                console.log("No technician assigned to this request");
                return null;
            }

            const technician = await UserModel.findById(payload.technicianId);

            if (!technician || !technician.email) {
                console.log(`Technician ${payload.technicianId} not found or has no email`);
                return null;
            }

            return technician.email;
        });

        // Step 3: Send email notification
        if (technicianEmail) {
            await step.run("send-email-notification", async () => {
                const equipment = await EquipmentModel.findById(payload.equipmentId);
                const requester = await UserModel.findById(payload.requestedById);

                const emailHtml = `
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <style>
                            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                            .header { background-color: #4CAF50; color: white; padding: 20px; text-align: center; }
                            .content { background-color: #f9f9f9; padding: 20px; margin-top: 20px; }
                            .detail-row { margin: 10px 0; }
                            .label { font-weight: bold; color: #555; }
                            .badge { display: inline-block; padding: 5px 10px; border-radius: 3px; font-size: 12px; }
                            .badge-corrective { background-color: #ff9800; color: white; }
                            .badge-preventive { background-color: #2196F3; color: white; }
                            .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #777; }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <div class="header">
                                <h1>🔧 New Maintenance Request Assigned</h1>
                            </div>
                            <div class="content">
                                <p>Hello,</p>
                                <p>A new maintenance request has been assigned to you:</p>
                                
                                <div class="detail-row">
                                    <span class="label">Subject:</span> ${payload.subject}
                                </div>
                                
                                <div class="detail-row">
                                    <span class="label">Type:</span> 
                                    <span class="badge badge-${payload.type}">${payload.type.toUpperCase()}</span>
                                </div>
                                
                                <div class="detail-row">
                                    <span class="label">Equipment:</span> ${equipment?.name || 'N/A'} (${equipment?.serialNumber || 'N/A'})
                                </div>
                                
                                <div class="detail-row">
                                    <span class="label">Location:</span> ${equipment?.location || 'N/A'}
                                </div>
                                
                                <div class="detail-row">
                                    <span class="label">Requested By:</span> ${requester?.name || 'N/A'}
                                </div>
                                
                                <div class="detail-row">
                                    <span class="label">Request ID:</span> ${payload.requestId}
                                </div>
                                
                                <p style="margin-top: 20px;">
                                    Please log in to the maintenance system to view full details and update the request status.
                                </p>
                            </div>
                            <div class="footer">
                                <p>This is an automated notification from the Odoo Maintenance System.</p>
                                <p>Please do not reply to this email.</p>
                            </div>
                        </div>
                    </body>
                    </html>
                `;

                await sendMail({
                    to: technicianEmail,
                    subject: `New Maintenance Request: ${payload.subject}`,
                    html: emailHtml,
                    text: `New maintenance request assigned to you:\n\nSubject: ${payload.subject}\nType: ${payload.type}\nEquipment: ${equipment?.name}\nRequested By: ${requester?.name}\nRequest ID: ${payload.requestId}`
                });

                return { sent: true, to: technicianEmail };
            });
        }

        return {
            success: true,
            requestId: payload.requestId,
            emailSent: !!technicianEmail
        };
    }
);
