'use server';

import * as service from '@/lib/events/service';

export async function getEvents(filters: any) {
    return await service.getEvents(filters);
}

export async function createEvent(formData: FormData) {
    return await service.createEvent(formData);
}

export async function updateEvent(id: string, formData: FormData) {
    return await service.updateEvent(id, formData);
}

export async function deleteEvent(id: string) {
    return await service.deleteEvent(id);
}

export async function incrementRegistration(id: string) {
    return await service.incrementRegistration(id);
}
