import { z } from 'zod';

export interface ContactBranch {
    id: string;
    name: string;
    address: string;
    phone: string;
    map: string;
    href?: string;
    comingSoon?: boolean;
}

export const CONTACT_BRANCHES: ContactBranch[] = [
    
    {
        id: 'noida-swaran',
        name: 'Swaran Nagari, Greater Noida',
        address: 'D-Block, D-3,Ground Floor, Near Krishna Hospital, Swarn Nagari, Greater Noida, UP 201315',
        phone: '+917982799147',
        map: 'https://www.google.com/maps?vet=10CAAQoqAOahcKEwjos6jP74GUAxUAAAAAHQAAAAAQIQ..i&pvq=Cg0vZy8xMXEzY3E3dGNsIhcKEXNrbSBwaHlzaW90aGVyYXB5EAIYAw&lqi=ChFza20gcGh5c2lvdGhlcmFweUjyyo-7jbaAgAhaGxAAEAEYABgBIhFza20gcGh5c2lvdGhlcmFweZIBFHBoeXNpb3RoZXJhcHlfY2VudGVy&fvr=1&cs=1&um=1&ie=UTF-8&fb=1&gl=in&sa=X&ftid=0x390cebffc65f78b1:0x61bf3d7fe75fa157',
        href: '/branches-skm-physiotherapy/greater-noida-swaran-nagari'
    },
    {
        id: 'noida-134',
        name: 'Sector 134, Noida',
        address: 'B-45, Sector 134, Noida, UP 201303',
        phone: '+917870072822',
        map: 'https://www.google.com/maps?vet=10CAAQoqAOahcKEwjos6jP74GUAxUAAAAAHQAAAAAQDA..i&pvq=Cg0vZy8xMWtiZnExYl84IhcKEXNrbSBwaHlzaW90aGVyYXB5EAIYAw&lqi=ChFza20gcGh5c2lvdGhlcmFweUjo14LbqbGAgAhaGxAAEAEYABgBIhFza20gcGh5c2lvdGhlcmFweZIBFHBoeXNpb3RoZXJhcHlfY2VudGVy&fvr=1&cs=1&um=1&ie=UTF-8&fb=1&gl=in&sa=X&ftid=0x390ce9d917d48885:0x8667f8c063e418a8',
        href: '/branches-skm-physiotherapy/noida-sector-134'
    },
   
];

export const contactSubmissionSchema = z.object({
    name: z.string().trim().min(2, 'Please enter your full name'),
    email: z.string().trim().email('Please enter a valid email address'),
    phone: z
        .string()
        .trim()
        .regex(/^\d{10}$/, 'Please enter a valid 10-digit phone number'),
    branch: z.string().trim().min(1, 'Please select your nearest branch'),
    service: z.string().trim().min(1, 'Please select a service'),
    message: z.string().trim().min(20, 'Please describe your concern in at least 20 characters'),
    preferredDate: z.string().trim().optional().or(z.literal('')),
});

export type ContactSubmissionInput = z.infer<typeof contactSubmissionSchema>;

export type ContactApiResponse =
    | { success: true; message: string; id: string }
    | { success: false; error: string; fieldErrors?: Record<string, string[]> };

export function getBranchDetails(branchId: string) {
    return CONTACT_BRANCHES.find((branch) => branch.id === branchId);
}
