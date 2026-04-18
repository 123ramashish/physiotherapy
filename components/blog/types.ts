import { LucideIcon } from 'lucide-react';

export interface BlogPost {
    _id: string;
    title: string;
    excerpt: string;
    content: string;
    category: string;
    branch: string;
    author: string;
    authorRole: string;
    date: string;
    readTime: string;
    views: number;
    comments: number;
    featured: boolean;
    tags: string[];
    status: 'draft' | 'published' | 'archived';
    createdAt: string;
    updatedAt: string;
}

export interface Pagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
}

export interface FilterState {
    branch: string;
    category: string;
    tags: string[];
    search: string;
    sortBy: 'latest' | 'popular' | 'comments' | 'featured';
}

export interface ModalState {
    type: 'read' | 'submit' | 'edit' | null;
    data?: BlogPost | null;
    isOpen: boolean;
}

export interface FormState {
    title: string;
    excerpt: string;
    content: string;
    category: string;
    branch: string;
    author: string;
    authorRole: string;
    tags: string[];
    featured: boolean;
    status: string;
}

export interface FormErrors {
    [key: string]: string;
}

export interface Category {
    slug: string;
    name: string;
    icon: string;
    color: string;
}

export interface Branch {
    id: string;
    name: string;
    city: string;
}