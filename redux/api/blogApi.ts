import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IBlog } from '@/models/Blog';

export interface PaginationMeta {
    page: number;
    limit: number;
    total: number;
    pages: number;
}

export interface BlogsResponse {
    data: IBlog[];
    pagination: PaginationMeta;
}

export interface BlogQueryParams {
    page?: number;
    limit?: number;
    search?: string;
    tag?: string;
    category?: string;
    branch?: string;
    status?: string;
    sortBy?: string;
}

export const blogApi = createApi({
    reducerPath: 'blogApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
    tagTypes: ['Blog'],
    endpoints: (builder) => ({
        getBlogs: builder.query<BlogsResponse, BlogQueryParams>({
            query: (params) => ({ url: '/blog', params }),
            providesTags: (result) =>
                result?.data
                    ? [
                        ...result.data.map(({ _id }) => ({ type: 'Blog' as const, id: _id })),
                        { type: 'Blog', id: 'LIST' }
                    ]
                    : [{ type: 'Blog', id: 'LIST' }]
        }),
        getBlogById: builder.query<IBlog, string>({
            query: (id) => `/blog/${id}`,
            providesTags: (result, error, id) => [{ type: 'Blog', id }]
        }),
        createBlog: builder.mutation<IBlog, Partial<IBlog>>({
            query: (body) => ({ url: '/blog', method: 'POST', body }),
            invalidatesTags: [{ type: 'Blog', id: 'LIST' }]
        }),
        updateBlog: builder.mutation<IBlog, { id: string; body: Partial<IBlog> }>({
            query: ({ id, body }) => ({ url: `/blog/${id}`, method: 'PUT', body }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Blog', id }, { type: 'Blog', id: 'LIST' }]
        }),
        deleteBlog: builder.mutation<{ message: string }, string>({
            query: (id) => ({ url: `/blog/${id}`, method: 'DELETE' }),
            invalidatesTags: (result, error, id) => [{ type: 'Blog', id }, { type: 'Blog', id: 'LIST' }]
        })
    })
});

export const {
    useGetBlogsQuery,
    useGetBlogByIdQuery,
    useCreateBlogMutation,
    useUpdateBlogMutation,
    useDeleteBlogMutation
} = blogApi;