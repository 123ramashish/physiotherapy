import { NextRequest, NextResponse } from 'next/server';
import { incrementRegistration } from '@/lib/events/service';

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const result = await incrementRegistration(id);
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to register' }, { status: 500 });
    }
}