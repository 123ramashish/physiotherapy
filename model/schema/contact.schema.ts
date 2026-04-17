import { z } from 'zod';

export interface ContactBranch {
    id: string;
    name: string;
    address: string;
    phone: string;
    map: string;
    comingSoon?: boolean;
}

export const CONTACT_BRANCHES: ContactBranch[] = [
    {
        id: 'noida-swaran',
        name: 'Noida – Swaran Nagari / नोएडा – स्वर्ण नगरी',
        address: 'D-Block, D-3, Near Krishna Hospital, Swarn Nagari, Greater Noida, UP 201315',
        phone: '+91 79827 99147',
        map: 'https://maps.app.goo.gl/Us4jVhy8foKxxawE7',
    },
    {
        id: 'noida-134',
        name: 'Noida – Sector 134 / नोएडा – सेक्टर 134',
        address: 'B-45, Sector 134, Noida, UP 201303',
        phone: '+91 98765 43210',
        map: 'https://maps.google.com/?q=Sector+134+Noida',
    },
    {
        id: 'delhi',
        name: 'Delhi – Lajpat Nagar / दिल्ली – लाजपत नगर',
        address: 'Coming Soon / जल्द आ रहा है',
        phone: '',
        map: '',
        comingSoon: true,
    },
    {
        id: 'gurgaon',
        name: 'Gurgaon – Sector 56 / गुड़गांव – सेक्टर 56',
        address: 'Coming Soon / जल्द आ रहा है',
        phone: '',
        map: '',
        comingSoon: true,
    },
];

export const contactSubmissionSchema = z.object({
    name: z.string().trim().min(2, 'Please enter your full name'),
    email: z.string().trim().email('Please enter a valid email address'),
    phone: z
        .string()
        .trim()
        .regex(/^\d{5}\s?\d{5}$/, 'Please enter a valid 10-digit phone number'),
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
