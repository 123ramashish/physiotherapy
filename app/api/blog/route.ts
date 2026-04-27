'use server';
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import blogSchema from '@/model/schema/blog.schema';


export async function GET(request: NextRequest) {
    await connectDB();
    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const tag = searchParams.get('tag') || '';
    const category = searchParams.get('category') || '';
    const branch = searchParams.get('branch') || '';
    const status = searchParams.get('status') || '';
    const sortBy = searchParams.get('sortBy') || 'latest';

    const skip = (page - 1) * limit;
    const query: any = {};

    if (search) {
        query.$or = [
            { title: { $regex: search, $options: 'i' } },
            { content: { $regex: search, $options: 'i' } },
            { excerpt: { $regex: search, $options: 'i' } }
        ];
    }
    if (tag) {
        const tagsArray = tag.split(',').map(t => t.trim());
        query.tags = { $in: tagsArray };
    }
    if (category && category !== 'all') query.category = category;
    if (branch && branch !== 'all') query.branch = branch;
    if (status) query.status = status;

    let sort: any = { createdAt: -1 };
    switch (sortBy) {
        case 'popular':
            sort = { views: -1 };
            break;
        case 'comments':
            sort = { comments: -1 };
            break;
        case 'featured':
            sort = { featured: -1 };
            break;
        case 'latest':
        default:
            sort = { createdAt: -1 };
    }

    const [blogs, total] = await Promise.all([
        blogSchema.find(query).sort(sort).skip(skip).limit(limit).lean(),
        blogSchema.countDocuments(query)
    ]);

    return NextResponse.json({
        data: blogs,
        pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit),
            hasNext: page < Math.ceil(total / limit),
            hasPrev: page > 1
        }
    });
}

export async function POST(request: NextRequest) {
    try {
        await connectDB();
        const body = await request.json();

        // Calculate read time if not provided
        if (!body.readTime && body.content) {
            const wordsPerMinute = 200;
            const words = body.content.split(/\s+/).length;
            body.readTime = `${Math.ceil(words / wordsPerMinute)} min`;
        }

        const blog = await blogSchema.create(body);
        return NextResponse.json(blog, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}