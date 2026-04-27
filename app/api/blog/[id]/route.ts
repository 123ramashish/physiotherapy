import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import blogSchema from '@/model/schema/blog.schema';

export const maxDuration = 300; // 5 minutes

// Next.js 15+ requires params to be awaited
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    await connectDB();
    const { id } = await params;
    const blog = await blogSchema.findById(id).lean();
    if (!blog) return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    return NextResponse.json(blog);
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    await connectDB();
    const { id } = await params;
    const body = await request.json();
    const blog = await blogSchema.findByIdAndUpdate(id, body, { new: true }).lean();
    if (!blog) return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    return NextResponse.json(blog);
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    await connectDB();
    const { id } = await params;
    const blog = await blogSchema.findByIdAndDelete(id);
    if (!blog) return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    return NextResponse.json({ message: 'Blog deleted successfully' });
}