// app/api/events/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getEvents, createEvent } from '@/lib/events/service';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const filters = {
            category: searchParams.get('category') || undefined,
            location: searchParams.get('location') || undefined,
            branchId: searchParams.get('branchId') || undefined,
            dateRange: searchParams.get('dateRange') || undefined,
            price: searchParams.get('price') || undefined,
            status: searchParams.get('status') || undefined,
            search: searchParams.get('search') || undefined,
            limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined,
            page: searchParams.get('page') ? parseInt(searchParams.get('page')!) : undefined,
        };

        const result = await getEvents(filters);
        return NextResponse.json({ success: true, ...result });
    } catch (error) {
        console.error('Error fetching events:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch events' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const result = await createEvent(formData);

        if (!result.success) {
            return NextResponse.json(
                { success: false, error: result.error },
                { status: 400 }
            );
        }

        return NextResponse.json({ success: true, data: result.event });
    } catch (error) {
        console.error('Error creating event:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to create event' },
            { status: 500 }
        );
    }
}