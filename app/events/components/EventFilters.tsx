'use client';

import React from 'react';
import { Search, Filter, ChevronDown, Grid3X3, List, CalendarDays, X, SlidersHorizontal } from 'lucide-react';
import { FilterState, EVENT_CATEGORIES, LOCATIONS, DATE_RANGES } from '@/lib/events/types';

interface EventFiltersProps {
    filters: FilterState;
    onFilterChange: (key: keyof FilterState, value: string) => void;
    onViewModeChange: (mode: 'grid' | 'list' | 'calendar') => void;
    totalResults: number;
    upcomingCount: number;
}

export default function EventFilters({
    filters,
    onFilterChange,
    onViewModeChange,
    totalResults,
    upcomingCount
}: EventFiltersProps) {
    return (
        <section className="sticky top-16 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-100 py-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-wrap items-center gap-3">
                    {/* View Mode Toggle */}
                    <div className="flex bg-gray-100 rounded-lg p-1">
                        <button
                            onClick={() => onViewModeChange('grid')}
                            className={`p-1.5 rounded-md transition-all ${filters.viewMode === 'grid' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                            title="Grid View"
                        >
                            <Grid3X3 className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => onViewModeChange('list')}
                            className={`p-1.5 rounded-md transition-all ${filters.viewMode === 'list' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                            title="List View"
                        >
                            <List className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => onViewModeChange('calendar')}
                            className={`p-1.5 rounded-md transition-all ${filters.viewMode === 'calendar' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                            title="Calendar View"
                        >
                            <CalendarDays className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="h-6 w-px bg-gray-200 mx-1" />

                    {/* Category */}
                    <div className="relative">
                        <select
                            value={filters.category}
                            onChange={(e) => onFilterChange('category', e.target.value)}
                            className="appearance-none pl-4 pr-10 py-2 rounded-lg border border-gray-200 text-sm font-medium focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none bg-white min-w-[140px]"
                        >
                            {EVENT_CATEGORIES.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>

                    {/* Location */}
                    <div className="relative">
                        <select
                            value={filters.location}
                            onChange={(e) => onFilterChange('location', e.target.value)}
                            className="appearance-none pl-4 pr-10 py-2 rounded-lg border border-gray-200 text-sm font-medium focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none bg-white min-w-[140px]"
                        >
                            {LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>

                    {/* Date Range */}
                    <div className="relative">
                        <select
                            value={filters.dateRange}
                            onChange={(e) => onFilterChange('dateRange', e.target.value)}
                            className="appearance-none pl-4 pr-10 py-2 rounded-lg border border-gray-200 text-sm font-medium focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none bg-white min-w-[140px]"
                        >
                            {DATE_RANGES.map(range => (
                                <option key={range.id} value={range.id}>{range.name}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>

                    {/* Status */}
                    <div className="relative">
                        <select
                            value={filters.status}
                            onChange={(e) => onFilterChange('status', e.target.value)}
                            className="appearance-none pl-4 pr-10 py-2 rounded-lg border border-gray-200 text-sm font-medium focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none bg-white min-w-[140px]"
                        >
                            <option value="all">All Status</option>
                            <option value="upcoming">Upcoming</option>
                            <option value="ongoing">Live Now</option>
                            <option value="past">Past Events</option>
                            <option value="full">Sold Out</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>

                    {/* Sort By */}
                    <div className="relative">
                        <select
                            value={filters.sortBy}
                            onChange={(e) => onFilterChange('sortBy', e.target.value)}
                            className="appearance-none pl-4 pr-10 py-2 rounded-lg border border-gray-200 text-sm font-medium focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none bg-white min-w-[140px]"
                        >
                            <option value="date-asc">Date (Asc)</option>
                            <option value="date-desc">Date (Desc)</option>
                            <option value="newest">Recently Added</option>
                            <option value="oldest">Oldest Added</option>
                            <option value="title-asc">Title (A-Z)</option>
                            <option value="title-desc">Title (Z-A)</option>
                        </select>
                        <SlidersHorizontal className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>

                    {/* Results Count */}
                    <div className="ml-auto flex items-center gap-4">
                        <span className="text-sm text-gray-500">
                            <span className="font-semibold text-gray-900">{totalResults}</span> events found
                        </span>
                        {upcomingCount > 0 && (
                            <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                                {upcomingCount} upcoming
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
