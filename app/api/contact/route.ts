import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

import {
  contactSubmissionSchema,
  getBranchDetails,
  type ContactApiResponse,
} from '@/lib/contact';
import { getMongoDb } from '@/lib/mongodb';

function createTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error('Missing SMTP configuration. Set SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS.');
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  });
}

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const parsed = contactSubmissionSchema.safeParse(body);

    if (!parsed.success) {
      const response: ContactApiResponse = {
        success: false,
        error: 'Please review the highlighted fields and try again.',
        fieldErrors: parsed.error.flatten().fieldErrors,
      };

      return NextResponse.json(response, { status: 400 });
    }

    const submission = parsed.data;
    const branchDetails = getBranchDetails(submission.branch);
    const submittedAt = new Date();

    const db = await getMongoDb();
    const insertResult = await db.collection('contact_submissions').insertOne({
      ...submission,
      branchName: branchDetails?.name ?? submission.branch,
      submittedAt,
      createdAt: submittedAt,
      updatedAt: submittedAt,
      source: 'website-contact-form',
    });

    const transporter = createTransporter();
    const formattedSubmittedAt = submittedAt.toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'short',
    });

    await transporter.sendMail({
      from: `"SKM Contact Form" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_RECEIVER_EMAIL ?? process.env.SMTP_USER,
      replyTo: submission.email,
      subject: `New Contact Request: ${submission.service} - ${branchDetails?.name ?? submission.branch}`,
      text: [
        'NEW CONTACT FORM SUBMISSION',
        '',
        `Submitted: ${formattedSubmittedAt}`,
        `Name: ${submission.name}`,
        `Email: ${submission.email}`,
        `Phone: ${submission.phone}`,
        `Branch: ${branchDetails?.name ?? submission.branch}`,
        `Service: ${submission.service}`,
        `Preferred Date: ${submission.preferredDate || 'Not specified'}`,
        '',
        'Message:',
        submission.message,
        '',
        `MongoDB ID: ${insertResult.insertedId.toString()}`,
      ].join('\n'),
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#1f2937;max-width:640px;margin:0 auto">
          <h2 style="margin-bottom:8px">New Contact Request</h2>
          <p style="margin-top:0;color:#4b5563">Submitted on ${formattedSubmittedAt}</p>
          <table style="width:100%;border-collapse:collapse;margin:24px 0">
            <tbody>
              <tr><td style="padding:8px 0;font-weight:700">Name</td><td style="padding:8px 0">${submission.name}</td></tr>
              <tr><td style="padding:8px 0;font-weight:700">Email</td><td style="padding:8px 0">${submission.email}</td></tr>
              <tr><td style="padding:8px 0;font-weight:700">Phone</td><td style="padding:8px 0">${submission.phone}</td></tr>
              <tr><td style="padding:8px 0;font-weight:700">Branch</td><td style="padding:8px 0">${branchDetails?.name ?? submission.branch}</td></tr>
              <tr><td style="padding:8px 0;font-weight:700">Service</td><td style="padding:8px 0">${submission.service}</td></tr>
              <tr><td style="padding:8px 0;font-weight:700">Preferred Date</td><td style="padding:8px 0">${submission.preferredDate || 'Not specified'}</td></tr>
            </tbody>
          </table>
          <div style="padding:16px;background:#f3f4f6;border-radius:12px">
            <p style="margin:0 0 8px;font-weight:700">Message</p>
            <p style="margin:0;white-space:pre-wrap">${submission.message}</p>
          </div>
          <p style="margin-top:24px;color:#6b7280;font-size:12px">MongoDB ID: ${insertResult.insertedId.toString()}</p>
        </div>
      `,
    });

    const response: ContactApiResponse = {
      success: true,
      message: 'Form submitted successfully.',
      id: insertResult.insertedId.toString(),
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error('Contact form submission failed:', error);

    const response: ContactApiResponse = {
      success: false,
      error: 'Failed to submit the contact form. Please try again or call us directly.',
    };

    return NextResponse.json(response, { status: 500 });
  }
}
