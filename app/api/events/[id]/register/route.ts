// app/api/events/[id]/register/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/model/dbconnection';
import { Event } from '@/model/schema/event.schema';
import mongoose, { Schema, Document, Model } from 'mongoose';

// ─── Registration schema (inline to avoid extra file) ────────────────────────
interface IRegistration extends Document {
    eventId: mongoose.Types.ObjectId;
    name: string;
    email: string;
    phone: string;
    address: string;
    message?: string;
    registeredAt: Date;
    status: 'pending' | 'confirmed' | 'cancelled';
}

const RegistrationSchema = new Schema<IRegistration>({
    eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true, index: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    message: { type: String, trim: true },
    registeredAt: { type: Date, default: Date.now },
    status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'confirmed' },
}, { timestamps: false });

// Prevent duplicate registrations (same email + event)
RegistrationSchema.index({ eventId: 1, email: 1 }, { unique: true });

const Registration: Model<IRegistration> =
    mongoose.models.Registration ||
    mongoose.model<IRegistration>('Registration', RegistrationSchema);

// ─── POST /api/events/[id]/register ──────────────────────────────────────────
export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        // Validate MongoDB ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { success: false, error: 'Invalid event ID' },
                { status: 400 }
            );
        }

        await connectDB();

        // Parse body
        let body: {
            name?: string;
            email?: string;
            phone?: string;
            address?: string;
            message?: string;
        };
        try {
            body = await request.json();
        } catch {
            return NextResponse.json(
                { success: false, error: 'Invalid request body' },
                { status: 400 }
            );
        }

        const { name, email, phone, address, message } = body;

        // Validate required fields
        if (!name?.trim() || !email?.trim() || !phone?.trim() || !address?.trim()) {
            return NextResponse.json(
                { success: false, error: 'Name, email, phone, and address are required' },
                { status: 422 }
            );
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { success: false, error: 'Invalid email address' },
                { status: 422 }
            );
        }

        // Find event and check it exists + is upcoming
        const event = await Event.findById(id);
        if (!event) {
            return NextResponse.json(
                { success: false, error: 'Event not found' },
                { status: 404 }
            );
        }

        if (event.status === 'cancelled') {
            return NextResponse.json(
                { success: false, error: 'This event has been cancelled' },
                { status: 409 }
            );
        }

        if (event.status === 'past') {
            return NextResponse.json(
                { success: false, error: 'This event has already ended' },
                { status: 409 }
            );
        }

        // Check capacity
        if (event.capacity && event.registered >= event.capacity) {
            return NextResponse.json(
                { success: false, error: 'This event is at full capacity' },
                { status: 409 }
            );
        }

        // Check for duplicate registration
        const existingReg = await Registration.findOne({
            eventId: event._id,
            email: email.trim().toLowerCase(),
        });
        if (existingReg) {
            return NextResponse.json(
                { success: false, error: 'You have already registered for this event' },
                { status: 409 }
            );
        }

        // Save registration
        await Registration.create({
            eventId: event._id,
            name: name.trim(),
            email: email.trim().toLowerCase(),
            phone: phone.trim(),
            address: address.trim(),
            message: message?.trim() || undefined,
        });

        // Increment registered count atomically
        const updatedEvent = await Event.findByIdAndUpdate(
            id,
            { $inc: { registered: 1 } },
            { new: true }
        ).lean();

        return NextResponse.json({
            success: true,
            message: 'Registration successful',
            registered: updatedEvent?.registered,
        });

    } catch (error: unknown) {
        // Handle duplicate key (race condition)
        if ((error as { code?: number })?.code === 11000) {
            return NextResponse.json(
                { success: false, error: 'You have already registered for this event' },
                { status: 409 }
            );
        }
        console.error('Register error:', error);
        return NextResponse.json(
            { success: false, error: 'Registration failed. Please try again.' },
            { status: 500 }
        );
    }
}

// ─── GET /api/events/[id]/register — list registrations (admin use) ───────────
export async function GET(
    _request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ success: false, error: 'Invalid event ID' }, { status: 400 });
        }
        await connectDB();
        const registrations = await Registration.find({ eventId: id })
            .sort({ registeredAt: -1 })
            .lean();
        return NextResponse.json({ success: true, data: registrations, total: registrations.length });
    } catch (error) {
        console.error('Get registrations error:', error);
        return NextResponse.json({ success: false, error: 'Failed to fetch registrations' }, { status: 500 });
    }
}