'use client';

import React from 'react';
import { ZoomIn, PlayCircle, MapPin, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface GalleryItemProps {
    item: any;
    onClick: (item: any) => void;
    onDelete?: (id: string) => void;
}

export default function GalleryItem({ item, onClick, onDelete }: GalleryItemProps) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all bg-gray-100"
            onClick={() => onClick(item)}
        >
            {item.type === 'video' ? (
                <div className="w-full h-full relative">
                    <img 
                        src={item.thumbnail || 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=400&q=60'} 
                        alt={item.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                        <PlayCircle className="text-white w-12 h-12 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                    </div>
                </div>
            ) : (
                <img 
                    src={item.url} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
            )}

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end">
                <h3 className="text-white font-bold text-sm sm:text-base line-clamp-1">{item.title}</h3>
                <div className="flex items-center gap-2 text-white/80 text-xs mt-1">
                    <span className="bg-emerald-500 px-2 py-0.5 rounded-full capitalize">{item.category}</span>
                    <span className="flex items-center gap-0.5">
                        <MapPin size={10} />
                        {item.branch}
                    </span>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                    onClick={(e) => { e.stopPropagation(); onClick(item); }}
                    className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-all"
                >
                    <ZoomIn size={16} />
                </button>
                {onDelete && (
                    <button 
                        onClick={(e) => { e.stopPropagation(); onDelete(item._id); }}
                        className="p-2 bg-red-500/20 backdrop-blur-md rounded-full text-white hover:bg-red-500 transition-all"
                    >
                        <Trash2 size={16} />
                    </button>
                )}
            </div>
        </motion.div>
    );
}