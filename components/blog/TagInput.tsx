'use client';
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, X, AlertCircle } from 'lucide-react';
import { TAG_SUGGESTIONS } from './constants';

interface TagInputProps {
    value: string[];
    onChange: (tags: string[]) => void;
    suggestions?: string[];
    placeholder?: string;
    maxTags?: number;
}

export function TagInput({
    value,
    onChange,
    suggestions = TAG_SUGGESTIONS,
    placeholder = 'Add tags...',
    maxTags = 10
}: TagInputProps) {
    const [input, setInput] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const filteredSuggestions = useMemo(() => {
        if (!input.trim()) return [];
        return suggestions
            .filter(tag =>
                tag.toLowerCase().includes(input.toLowerCase()) &&
                !value.includes(tag)
            )
            .slice(0, 5);
    }, [input, suggestions, value]);

    const addTag = (tag: string) => {
        const normalized = tag.trim().toLowerCase();
        if (normalized && !value.includes(normalized) && value.length < maxTags) {
            onChange([...value, normalized]);
            setInput('');
            setShowSuggestions(false);
        }
    };

    const removeTag = (tagToRemove: string) => {
        onChange(value.filter(tag => tag !== tagToRemove));
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && input.trim()) {
            e.preventDefault();
            addTag(input);
        } else if (e.key === 'Backspace' && !input && value.length > 0) {
            removeTag(value[value.length - 1]);
        }
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div ref={containerRef} className="relative text-black">
            <div className="flex flex-wrap gap-2 p-3 min-h-[48px] bg-white border-2 border-gray-200 rounded-xl focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-100 transition-all">
                {value.map(tag => (
                    <motion.span
                        key={tag}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium"
                    >
                        <Tag className="w-3 h-3" />
                        {tag}
                        <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="ml-1 hover:text-indigo-900 transition-colors"
                            aria-label={`Remove tag ${tag}`}
                        >
                            <X className="w-3 h-3" />
                        </button>
                    </motion.span>
                ))}
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => {
                        setInput(e.target.value);
                        setShowSuggestions(true);
                    }}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setShowSuggestions(true)}
                    placeholder={value.length >= maxTags ? 'Max tags reached' : placeholder}
                    disabled={value.length >= maxTags}
                    className="flex-1 min-w-[120px] outline-none text-sm bg-transparent"
                    aria-label="Add tags"
                />
            </div>

            <AnimatePresence>
                {showSuggestions && filteredSuggestions.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute z-20 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
                    >
                        {filteredSuggestions.map(suggestion => (
                            <button
                                key={suggestion}
                                type="button"
                                onClick={() => addTag(suggestion)}
                                className="w-full px-4 py-2 text-left text-sm hover:bg-indigo-50 hover:text-indigo-700 transition-colors flex items-center gap-2"
                            >
                                <Tag className="w-4 h-4 text-gray-400" />
                                {suggestion}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {value.length >= maxTags && (
                <p className="mt-2 text-xs text-amber-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    Maximum {maxTags} tags allowed
                </p>
            )}
        </div>
    );
}