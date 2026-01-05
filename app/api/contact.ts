'use server';
import nodemailer from 'nodemailer';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  service: string;
  message: string;
}
export async function sendContactForm(data: ContactFormData) {
  // Create a transporter using your email service credentials
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,    
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
    // Define the email options
    const mailOptions = {
      from: `"${data.name}" <${data.email}>`,
      to: 'skmphysiotherapy@gmail.com',
        subject: `New Contact Form Submission from ${data.name}`,
        text: `
        Name: ${data.name}
        Email: ${data.email}
        Phone: ${data.phone}
        Preferred Date: ${data.date || 'Not specified'}
        Service: ${data.service || 'Not specified'}
        Message: ${data.message}
        Submitted at: ${new Date().toISOString()}
        `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
}
export async function sendAppointmentForm(data: ContactFormData) {
  // Create a transporter using your email service credentials
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // Define the email options
  const mailOptions = {
    from: `"${data.name}" <${data.email}>`,
    to: 'skmphysiotherapy@gmail.com',
    subject: `New Appointment Form Submission from ${data.name}`,
    text: `
        Name: ${data.name}
        Email: ${data.email}
        Phone: ${data.phone}
        Preferred Date: ${data.date || 'Not specified'}
        Service: ${data.service || 'Not specified'}
        Message: ${data.message}
        Submitted at: ${new Date().toISOString()}
        `,
  };

  // Send the email
  await transporter.sendMail(mailOptions);
}
