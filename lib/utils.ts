// lib/utils.ts
import QRCode from 'qrcode';
import nodemailer from 'nodemailer';

export function slugify(text: string): string {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
}

export async function generateQRCode(data: string): Promise<string> {
    try {
        return await QRCode.toDataURL(data);
    } catch (error) {
        console.error('QR Code generation error:', error);
        return '';
    }
}

export async function sendEmailNotification({
    to,
    template,
    data
}: {
    to: string;
    template: string;
    data: Record<string, any>;
}) {
    // Configure your email service (SendGrid, AWS SES, etc.)
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: parseInt(process.env.EMAIL_PORT || '587'),
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    // Template mapping
    const templates: Record<string, { subject: string; html: string }> = {
        'event-registration': {
            subject: `Event Registration Confirmation: ${data.eventName}`,
            html: `
                <h1>Registration Confirmed!</h1>
                <p>Dear ${data.name},</p>
                <p>You have successfully registered for ${data.eventName}.</p>
                <p><strong>Date:</strong> ${data.eventDate}</p>
                <p><strong>Time:</strong> ${data.eventTime}</p>
                <p><strong>Location:</strong> ${data.location}</p>
                <p><strong>Venue:</strong> ${data.venue}</p>
                ${data.qrCode ? `<img src="${data.qrCode}" alt="QR Code" />` : ''}
                <p>Please present this QR code at the venue.</p>
            `
        }
    };

    const templateData = templates[template];
    if (!templateData) return;

    await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to,
        subject: templateData.subject,
        html: templateData.html,
    });
}

export function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
}

export function formatTime(timeString: string): string {
    const [hours, minutes] = timeString.split(':');
    const h = parseInt(hours);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12}:${minutes} ${ampm}`;
}