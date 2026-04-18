import { Category, Branch } from './types';
import { CATEGORIES, BRANCHES } from './constants';

export const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
};

export const getInitials = (name: string): string => {
    return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
};

export const getCategoryColor = (slug: string): string => {
    const cat = CATEGORIES.find(c => c.slug === slug);
    return cat?.color || '#6366f1';
};

export const getCategoryInfo = (slug: string): Category => {
    return CATEGORIES.find(c => c.slug === slug) || {
        slug,
        name: slug,
        icon: '📄',
        color: '#6366f1'
    };
};

export const getBranchInfo = (id: string): Branch => {
    return BRANCHES.find(b => b.id === id) || {
        id,
        name: id,
        city: ''
    };
};