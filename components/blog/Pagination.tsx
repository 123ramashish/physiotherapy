'use client';
import React, { useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Pagination as PaginationType } from './types';

interface PaginationProps {
    pagination: PaginationType;
    onPageChange: (page: number) => void;
}

export function Pagination({ pagination, onPageChange }: PaginationProps) {
    const { page, totalPages, hasNext, hasPrev } = pagination;

    const pages = useMemo(() => {
        const result: (number | string)[] = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible + 2) {
            for (let i = 1; i <= totalPages; i++) result.push(i);
        } else {
            if (page <= 3) {
                for (let i = 1; i <= maxVisible; i++) result.push(i);
                result.push('...');
                result.push(totalPages);
            } else if (page >= totalPages - 2) {
                result.push(1);
                result.push('...');
                for (let i = totalPages - maxVisible + 1; i <= totalPages; i++) result.push(i);
            } else {
                result.push(1);
                result.push('...');
                for (let i = page - 1; i <= page + 1; i++) result.push(i);
                result.push('...');
                result.push(totalPages);
            }
        }
        return result;
    }, [page, totalPages]);

    if (totalPages <= 1) return null;

    return (
        <nav className="flex items-center justify-center gap-1 sm:gap-2 mt-10" aria-label="Pagination">
            <button
                onClick={() => hasPrev && onPageChange(page - 1)}
                disabled={!hasPrev}
                className="p-2 sm:p-2.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                aria-label="Previous page"
            >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {pages.map((p, i) => (
                <React.Fragment key={i}>
                    {p === '...' ? (
                        <span className="px-3 py-2 text-gray-400">...</span>
                    ) : (
                        <button
                            onClick={() => onPageChange(p as number)}
                            className={`min-w-[40px] px-3 py-2 rounded-lg font-medium transition-colors ${page === p
                                ? 'bg-gradient-to-r from-emerald-500 to-indigo-600 text-white'
                                : 'text-gray-700 hover:bg-gray-100'
                                }`}
                            aria-current={page === p ? 'page' : undefined}
                        >
                            {p}
                        </button>
                    )}
                </React.Fragment>
            ))}

            <button
                onClick={() => hasNext && onPageChange(page + 1)}
                disabled={!hasNext}
                className="p-2 sm:p-2.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                aria-label="Next page"
            >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
        </nav>
    );
}