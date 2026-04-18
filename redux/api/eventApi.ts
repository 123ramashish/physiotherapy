import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { EventItem, FilterState } from '@/lib/events/types';

export interface EventsResponse {
    success: boolean;
    events: EventItem[];
    total: number;
    page: number;
    totalPages: number;
}

export interface EventQueryParams extends Partial<FilterState> {
    page?: number;
    limit?: number;
}

export const eventApi = createApi({
    reducerPath: 'eventApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
    tagTypes: ['Event'],
    endpoints: (builder) => ({
        getEvents: builder.query<EventsResponse, EventQueryParams>({
            query: (params) => ({ url: '/events', params }),
            providesTags: (result) =>
                result?.events
                    ? [
                        ...result.events.map(({ _id }) => ({ type: 'Event' as const, id: _id })),
                        { type: 'Event', id: 'LIST' }
                    ]
                    : [{ type: 'Event', id: 'LIST' }]
        }),
        getEventById: builder.query<EventItem, string>({
            query: (id) => `/events/${id}`,
            providesTags: (result, error, id) => [{ type: 'Event', id }]
        }),
        createEvent: builder.mutation<{ success: boolean; data?: EventItem; error?: string }, FormData>({
            query: (body) => ({ 
                url: '/events', 
                method: 'POST', 
                body 
            }),
            invalidatesTags: [{ type: 'Event', id: 'LIST' }]
        }),
        updateEvent: builder.mutation<{ success: boolean; error?: string }, { id: string; body: FormData }>({
            query: ({ id, body }) => ({ 
                url: `/events/${id}`, 
                method: 'PUT', 
                body 
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Event', id }, { type: 'Event', id: 'LIST' }]
        }),
        deleteEvent: builder.mutation<{ success: boolean; error?: string }, string>({
            query: (id) => ({ url: `/events/${id}`, method: 'DELETE' }),
            invalidatesTags: (result, error, id) => [{ type: 'Event', id }, { type: 'Event', id: 'LIST' }]
        }),
        registerForEvent: builder.mutation<{ success: boolean; registered?: number; error?: string }, string>({
            query: (id) => ({ url: `/events/${id}/register`, method: 'POST' }),
            invalidatesTags: (result, error, id) => [{ type: 'Event', id }, { type: 'Event', id: 'LIST' }]
        })
    })
});

export const {
    useGetEventsQuery,
    useCreateEventMutation,
    useUpdateEventMutation,
    useDeleteEventMutation,
    useRegisterForEventMutation
} = eventApi;