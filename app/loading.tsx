'use client';
import React, { useEffect, useState, useMemo } from 'react';
import { motion, Variants } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface LoadingPageProps {
    message?: string;
    subMessage?: string;
    progress?: number;
    showProgress?: boolean;
    fullScreen?: boolean;
}

const LoadingPage: React.FC<LoadingPageProps> = ({
    message = "Loading...",
    subMessage = "Please wait while we prepare for you!",
    progress = 0,
    showProgress = false,
    fullScreen = true,
}) => {
    const [currentProgress, setCurrentProgress] = useState(progress);
    const [dots, setDots] = useState('');
    const [screen, setScreen] = useState({ width: 0, height: 0 });

    // ✅ FIX: Get window size after mount (no SSR error)
    useEffect(() => {
        setScreen({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    }, []);

    // Progress animation
    useEffect(() => {
        if (showProgress && progress === 0) {
            const interval = setInterval(() => {
                setCurrentProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        return 100;
                    }
                    return prev + 1;
                });
            }, 30);
            return () => clearInterval(interval);
        }
    }, [showProgress, progress]);

    // Loading dots animation
    useEffect(() => {
        const dotInterval = setInterval(() => {
            setDots(prev => (prev.length >= 3 ? '' : prev + '.'));
        }, 500);
        return () => clearInterval(dotInterval);
    }, []);

    // ✅ FIX: Generate particles once (optimized)
    const particles = useMemo(() => {
        if (screen.width === 0) return [];

        return [...Array(20)].map((_, i) => ({
            id: i,
            x: Math.random() * screen.width,
            y: Math.random() * screen.height,
            duration: 5 + Math.random() * 3,
        }));
    }, [screen]);

    // Animations
    const spinnerVariants: Variants = {
        animate: {
            rotate: 360,
            transition: {
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
            },
        },
    };

    return (
        <div
            className={`
                ${fullScreen ? 'fixed inset-0' : 'relative min-h-[400px]'}
                bg-gradient-to-br from-emerald-50 via-white to-indigo-50
                flex items-center justify-center overflow-hidden
                z-50
            `}
        >
            {/* Background */}
            <div className="absolute inset-0 overflow-hidden">

                {/* Gradient blobs */}
                <motion.div
                    className="absolute top-20 left-20 w-96 h-96 bg-emerald-200 rounded-full blur-3xl opacity-30"
                    animate={{ scale: [1, 1.2, 1], x: [0, 50, 0], y: [0, -50, 0] }}
                    transition={{ duration: 8, repeat: Infinity }}
                />
                <motion.div
                    className="absolute bottom-20 right-20 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-30"
                    animate={{ scale: [1.2, 1, 1.2], x: [0, -50, 0], y: [0, 50, 0] }}
                    transition={{ duration: 10, repeat: Infinity }}
                />

                {/* Grid */}
                <div className="absolute inset-0 opacity-5">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `
                                linear-gradient(to right, #10b981 1px, transparent 1px),
                                linear-gradient(to bottom, #10b981 1px, transparent 1px)
                            `,
                            backgroundSize: "50px 50px",
                        }}
                    />
                </div>

                {/* ✅ FIXED PARTICLES */}
                {particles.map((p) => (
                    <motion.div
                        key={p.id}
                        className="absolute w-1 h-1 rounded-full bg-gradient-to-r from-emerald-400 to-indigo-400"
                        initial={{ x: p.x, y: p.y, opacity: 0 }}
                        animate={{
                            x: Math.random() * screen.width,
                            y: Math.random() * screen.height,
                            opacity: [0, 0.5, 0],
                        }}
                        transition={{
                            duration: p.duration,
                            repeat: Infinity,
                            delay: p.id * 0.1,
                            ease: "linear",
                        }}
                    />
                ))}
            </div>

            {/* Content */}
            <div className="relative z-10 text-center max-w-md w-full px-6">

                {/* Text */}
                <div className="mb-6">
                    <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
                        {message}
                        <span className="inline-block w-6 text-left">{dots}</span>
                    </h2>
                    <p className="text-sm text-gray-500 mt-2">{subMessage}</p>
                </div>

                {/* Spinner */}
                <motion.div
                    variants={spinnerVariants}
                    animate="animate"
                    className="mb-6 flex justify-center"
                >
                    <Loader2 className="w-12 h-12 text-emerald-500" />
                </motion.div>

                {/* Progress */}
                {showProgress && (
                    <div className="w-full mb-4">
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-emerald-500 to-indigo-500 transition-all duration-500"
                                style={{ width: `${currentProgress}%` }}
                            />
                        </div>
                        <p className="text-sm text-gray-600 mt-2">
                            {Math.round(currentProgress)}% Complete
                        </p>
                    </div>
                )}
            </div>

            {/* Bottom bar */}
            <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-indigo-500"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1 }}
            />
        </div>
    );
};

export default LoadingPage;