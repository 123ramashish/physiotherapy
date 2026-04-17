// app/api/blog/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { BLOG_POSTS } from '../route'; // Import shared mock DB

// GET /api/blog/:id - Get single post
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const postId = parseInt(id, 10);

        if (isNaN(postId)) {
            return NextResponse.json({ error: 'Invalid post ID' }, { status: 400 });
        }

        const post = BLOG_POSTS.find(p => p.id === postId);
        if (!post) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }

        // Increment view count (async, non-blocking in production)
        post.views += 1;

        return NextResponse.json({
            success: true,
            data: post,
        });
    } catch (error) {
        console.error('GET /api/blog/[id] error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch post', message: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}