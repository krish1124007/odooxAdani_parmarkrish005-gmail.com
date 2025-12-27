import nodemailer from "nodemailer";

interface SendMailOptions {
    to: string;
    subject: string;
    text?: string;
    html?: string;
}

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    secure: false, // true for 465, false for 587
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

export async function sendMail(options: SendMailOptions): Promise<void> {
    try {
        await transporter.sendMail({
            from: process.env.MAIL_FROM,
            to: options.to,
            subject: options.subject,
            text: options.text,
            html: options.html,
        });
    } catch (error) {
        console.error("Email send failed:", error);
        throw new Error("Unable to send email");
    }
}
