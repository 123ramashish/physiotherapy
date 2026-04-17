// app/api/blog/route.ts
'use server'
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// ─────────────────────────────────────────────
//  Types & Interfaces
// ─────────────────────────────────────────────

export interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    content?: string; // Full article content (optional for list views)
    category: string;
    branch: string;
    author: string;
    authorRole: string;
    date: string; // ISO 8601
    readTime: string;
    views: number;
    comments: number;
    featured: boolean;
    tags: string[];
    status: 'draft' | 'published' | 'archived';
    createdAt: string;
    updatedAt: string;
}

export interface BlogPostInput {
    title: string;
    excerpt: string;
    content?: string;
    category: string;
    branch: string;
    author: string;
    authorRole: string;
    tags: string[];
    featured?: boolean;
    status?: 'draft' | 'published' | 'archived';
}

export interface BlogPostUpdate {
    title?: string;
    excerpt?: string;
    content?: string;
    category?: string;
    branch?: string;
    author?: string;
    authorRole?: string;
    tags?: string[];
    featured?: boolean;
    status?: 'draft' | 'published' | 'archived';
}

// ─────────────────────────────────────────────
//  Validation Schemas (Zod)
// ─────────────────────────────────────────────

const VALID_CATEGORIES = [
    'sports-therapy',
    'chiropractic',
    'pain-management',
    'rehabilitation',
    'wellness',
    'ergonomics',
    'treatment-methods',
] as const;

const VALID_BRANCHES = [
    'delhi',
    'mumbai',
    'bengaluru',
    'hyderabad',
    'chennai',
] as const;

const createBlogSchema = z.object({
    title: z.string().min(5, 'Title must be at least 5 characters').max(200),
    excerpt: z.string().min(20, 'Excerpt must be at least 20 characters').max(500),
    content: z.string().min(100, 'Content must be at least 100 characters').optional(),
    category: z.enum(VALID_CATEGORIES, { errorMap: () => ({ message: 'Invalid category' }) }),
    branch: z.enum(VALID_BRANCHES, { errorMap: () => ({ message: 'Invalid branch' }) }),
    author: z.string().min(2, 'Author name required').max(100),
    authorRole: z.string().min(2, 'Author role required').max(100),
    tags: z.array(z.string().min(1).max(30)).max(10, 'Maximum 10 tags allowed'),
    featured: z.boolean().optional().default(false),
    status: z.enum(['draft', 'published', 'archived']).optional().default('draft'),
});

const updateBlogSchema = createBlogSchema.partial();

const querySchema = z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(10),
    sortBy: z.enum(['latest', 'popular', 'comments', 'featured']).default('latest'),
    branch: z.enum([...VALID_BRANCHES, 'all' as const]).optional(),
    category: z.enum([...VALID_CATEGORIES, 'all' as const]).optional(),
    search: z.string().max(100).optional(),
    status: z.enum(['draft', 'published', 'archived', 'all']).optional().default('published'),
});

// ─────────────────────────────────────────────
//  Mock Database (Replace with Prisma/Drizzle)
// ─────────────────────────────────────────────

// In production, replace with actual database client:
// import { prisma } from '@/lib/prisma';

let BLOG_POSTS: BlogPost[] = [
    {
        id: 1,
        title: 'Complete Guide to Preventing Sports Injuries',
        excerpt: 'Essential techniques and exercises to prevent common sports injuries and maintain peak physical performance.',
        content: 'Full article content here...',
        category: 'sports-therapy',
        branch: 'delhi',
        author: 'Dr. Sarah Johnson',
        authorRole: 'Senior Physiotherapist',
        date: '2024-03-15T10:00:00.000Z',
        readTime: '8 min',
        views: 4201,
        comments: 24,
        featured: true,
        tags: ['prevention', 'sports', 'exercises'],
        status: 'published',
        createdAt: '2024-03-15T09:00:00.000Z',
        updatedAt: '2024-03-15T09:00:00.000Z',
    },
    {
        id: 2,
        title: 'Chiropractic Care for Chronic Back Pain',
        excerpt: 'Modern chiropractic techniques that provide lasting relief from chronic back pain without invasive procedures.',
        content: 'Full article content here...',
        category: 'chiropractic',
        branch: 'mumbai',
        author: 'Dr. Michael Chen',
        authorRole: 'Chief Chiropractor',
        date: '2024-03-12T10:00:00.000Z',
        readTime: '6 min',
        views: 3850,
        comments: 18,
        featured: true,
        tags: ['back pain', 'chiropractic', 'relief'],
        status: 'published',
        createdAt: '2024-03-12T09:00:00.000Z',
        updatedAt: '2024-03-12T09:00:00.000Z',
    },
    // Add more mock posts as needed...
];

let NEXT_ID = Math.max(...BLOG_POSTS.map(p => p.id)) + 1;

// ─────────────────────────────────────────────
//  Helper Functions
// ─────────────────────────────────────────────

function calculateReadTime(content: string): string {
    const wordsPerMinute = 200;
    const wordCount = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min`;
}

function filterPosts(
    posts: BlogPost[],
    filters: z.infer<typeof querySchema>
): BlogPost[] {
    let filtered = [...posts];

    // Status filter
    if (filters.status && filters.status !== 'all') {
        filtered = filtered.filter(p => p.status === filters.status);
    }

    // Branch filter
    if (filters.branch && filters.branch !== 'all') {
        filtered = filtered.filter(p => p.branch === filters.branch);
    }

    // Category filter
    if (filters.category && filters.category !== 'all') {
        filtered = filtered.filter(p => p.category === filters.category);
    }

    // Search filter
    if (filters.search) {
        const query = filters.search.toLowerCase();
        filtered = filtered.filter(
            p =>
                p.title.toLowerCase().includes(query) ||
                p.excerpt.toLowerCase().includes(query) ||
                p.tags.some(tag => tag.toLowerCase().includes(query))
        );
    }

    // Sorting
    switch (filters.sortBy) {
        case 'popular':
            filtered.sort((a, b) => b.views - a.views);
            break;
        case 'comments':
            filtered.sort((a, b) => b.comments - a.comments);
            break;
        case 'featured':
            filtered.sort((a, b) => Number(b.featured) - Number(a.featured) || new Date(b.date).getTime() - new Date(a.date).getTime());
            break;
        case 'latest':
        default:
            filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }

    return filtered;
}

function paginatePosts(posts: BlogPost[], page: number, limit: number) {
    const total = posts.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const data = posts.slice(start, start + limit);

    return {
        data,
        pagination: {
            page,
            limit,
            total,
            totalPages,
            hasNext: page < totalPages,
            hasPrev: page > 1,
        },
    };
}

// ─────────────────────────────────────────────
//  API Route Handlers
// ─────────────────────────────────────────────

// GET /api/blog - List posts with filtering & pagination
export async function GET(request: NextRequest) {
    try {
        // Parse and validate query parameters
        const url = new URL(request.url);
        const queryParams = Object.fromEntries(url.searchParams.entries());
        const query = querySchema.safeParse(queryParams);

        if (!query.success) {
            return NextResponse.json(
                { error: 'Invalid query parameters', details: query.error.flatten().fieldErrors },
                { status: 400 }
            );
        }

        const { page, limit, ...filters } = query.data;

        // Filter and sort posts
        const filtered = filterPosts(BLOG_POSTS, { page, limit, ...filters });

        // Paginate results
        const { data, pagination } = paginatePosts(filtered, page, limit);

        // Return response (exclude full content for list views)
        const posts = data.map(({ content, ...post }) => post);

        return NextResponse.json({
            success: true,
            data: posts,
            pagination,
            filters: {
                branch: filters.branch,
                category: filters.category,
                search: filters.search,
                sortBy: filters.sortBy,
            },
        });
    } catch (error) {
        console.error('GET /api/blog error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch posts', message: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}

// POST /api/blog - Create new post
export async function POST(request: NextRequest) {
    try {
        // Parse request body
        const body = await request.json();
        const validation = createBlogSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(
                { error: 'Validation failed', details: validation.error.flatten().fieldErrors },
                { status: 400 }
            );
        }

        const data = validation.data;

        // Create new post
        const newPost: BlogPost = {
            id: NEXT_ID++,
            title: data.title,
            excerpt: data.excerpt,
            content: data.content,
            category: data.category,
            branch: data.branch,
            author: data.author,
            authorRole: data.authorRole,
            date: new Date().toISOString(),
            readTime: data.content ? calculateReadTime(data.content) : '5 min',
            views: 0,
            comments: 0,
            featured: data.featured ?? false,
            tags: data.tags,
            status: data.status ?? 'draft',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        // Save to "database"
        BLOG_POSTS.unshift(newPost); // Add to beginning for latest-first

        // Return created post (exclude content for security)
        const { content, ...publicPost } = newPost;

        return NextResponse.json(
            { success: true, message: 'Post created successfully', data: publicPost },
            { status: 201 }
        );
    } catch (error) {
        console.error('POST /api/blog error:', error);
        return NextResponse.json(
            { error: 'Failed to create post', message: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}

// PUT/PATCH /api/blog/:id - Update existing post
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const postId = parseInt(id, 10);

        if (isNaN(postId)) {
            return NextResponse.json({ error: 'Invalid post ID' }, { status: 400 });
        }

        // Parse and validate update data
        const body = await request.json();
        const validation = updateBlogSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(
                { error: 'Validation failed', details: validation.error.flatten().fieldErrors },
                { status: 400 }
            );
        }

        const updates = validation.data;

        // Find post
        const index = BLOG_POSTS.findIndex(p => p.id === postId);
        if (index === -1) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }

        // Calculate read time if content updated
        const readTime = updates.content
            ? calculateReadTime(updates.content)
            : BLOG_POSTS[index].readTime;

        // Update post
        BLOG_POSTS[index] = {
            ...BLOG_POSTS[index],
            ...updates,
            readTime,
            updatedAt: new Date().toISOString(),
        };

        // Return updated post (exclude content)
        const { content, ...publicPost } = BLOG_POSTS[index];

        return NextResponse.json({
            success: true,
            message: 'Post updated successfully',
            data: publicPost,
        });
    } catch (error) {
        console.error('PUT /api/blog error:', error);
        return NextResponse.json(
            { error: 'Failed to update post', message: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}

// DELETE /api/blog/:id - Delete post
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const postId = parseInt(id, 10);

        if (isNaN(postId)) {
            return NextResponse.json({ error: 'Invalid post ID' }, { status: 400 });
        }

        // Find and remove post
        const index = BLOG_POSTS.findIndex(p => p.id === postId);
        if (index === -1) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }

        const deleted = BLOG_POSTS.splice(index, 1)[0];

        return NextResponse.json({
            success: true,
            message: 'Post deleted successfully',
            data: { id: deleted.id, title: deleted.title },
        });
    } catch (error) {
        console.error('DELETE /api/blog error:', error);
        return NextResponse.json(
            { error: 'Failed to delete post', message: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}