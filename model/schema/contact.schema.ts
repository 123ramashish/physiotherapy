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
        id: 'gurugram-14',
        name: 'Sector 14, Gurugram (Main)',
        address: '123, MG Road, Sector 14, Gurugram, Haryana',
        phone: '+91 79827 99147',
        map: 'https://maps.google.com/?q=Sector+14+Gurugram+Haryana',
        href: '/branches/gurugram-sector-14'
    },
    {
        id: 'noida-swaran',
        name: 'Swaran Nagari, Greater Noida',
        address: 'D-Block, D-3, Near Krishna Hospital, Swarn Nagari, Greater Noida, UP 201315',
        phone: '+91 79827 99147',
        map: 'https://maps.app.goo.gl/Us4jVhy8foKxxawE7',
        href: '/branches/greater-noida-swaran-nagari'
    },
    {
        id: 'noida-135',
        name: 'Sector 135, Noida',
        address: 'B-45, Sector 135, Noida, UP 201303',
        phone: '+91 98765 43210',
        map: 'https://maps.google.com/?q=Sector+135+Noida',
        href: '/branches/noida-sector-135'
    },
    {
        id: 'gurugram-45',
        name: 'Sector 45, Gurugram',
        address: 'Plot 45, Sector 45, Gurugram, Haryana',
        phone: '+91 79827 99148',
        map: 'https://maps.google.com/?q=Sector+45+Gurugram+Haryana',
        href: '/branches/gurugram-sector-45'
    },
    {
        id: 'delhi',
        name: 'Lajpat Nagar, Delhi',
        address: 'Coming Soon / जल्द आ रहा है',
        phone: '',
        map: '',
        comingSoon: true,
    }
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
