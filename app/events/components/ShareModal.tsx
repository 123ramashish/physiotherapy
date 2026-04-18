'use client';

import React, { useState } from 'react';
import { Twitter, Facebook, Linkedin, Phone, Copy, Check } from 'lucide-react';

interface ShareModalProps {
    url: string;
    title: string;
}

export default function ShareModal({ url, title }: ShareModalProps) {
    const [copied, setCopied] = useState(false);

    const shareLinks = [
        { name: 'Twitter', icon: Twitter, url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, color: 'hover:bg-sky-500' },
        { name: 'Facebook', icon: Facebook, url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, color: 'hover:bg-blue-600' },
        { name: 'LinkedIn', icon: Linkedin, url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, color: 'hover:bg-blue-700' },
        { name: 'WhatsApp', icon: Phone, url: `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`, color: 'hover:bg-green-600' },
    ];

    const handleCopy = async () => {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-6">
            <div>
                <p className="text-sm font-medium text-gray-700 mb-3">Share this event:</p>
                <div className="grid grid-cols-2 gap-3">
                    {shareLinks.map((share) => (
                        <a
                            key={share.name}
                            href={share.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-medium transition-colors ${share.color} hover:text-white`}
                        >
                            <share.icon className="w-4 h-4" />
                            {share.name}
                        </a>
                    ))}
                </div>
            </div>
            <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Or copy the link:</p>
                <div className="flex gap-2">
                    <input type="text" value={url} readOnly className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm outline-none" />
                    <button onClick={handleCopy} className="px-4 py-2.5 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2">
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        {copied ? 'Copied!' : 'Copy'}
                    </button>
                </div>
            </div>
        </div>
    );
}
