'use client';
import React, { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { Activity, Heart, Zap, Sparkles, Loader2, Circle } from 'lucide-react';

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

    useEffect(() => {
        const dotInterval = setInterval(() => {
            setDots(prev => prev.length >= 3 ? '' : prev + '.');
        }, 500);
        return () => clearInterval(dotInterval);
    }, []);

    // Animation variants
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
        exit: {
            opacity: 0,
            transition: {
                duration: 0.5,
            },
        },
    };

    const logoVariants: Variants = {
        hidden: { scale: 0, rotate: -180 },
        visible: {
            scale: 1,
            rotate: 0,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 15,
                duration: 0.8,
            },
        },
    };

    const pulseVariants: Variants = {
        animate: {
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.2, 0.5],
            transition: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
            },
        },
    };

    const textVariants: Variants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12,
                delay: 0.3,
            },
        },
    };

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

    const progressVariants: Variants = {
        initial: { width: "0%" },
        animate: {
            width: `${currentProgress}%`,
            transition: {
                duration: 0.5,
                ease: "easeInOut",
            },
        },
    };

    const floatingIconVariants: Variants = {
        animate: (custom: number) => ({
            y: [0, -20, 0],
            x: [0, custom === 0 ? 10 : -10, 0],
            rotate: [0, custom === 1 ? 10 : -10, 0],
            transition: {
                duration: 3 + custom,
                repeat: Infinity,
                ease: "easeInOut",
                delay: custom * 0.5,
            },
        }),
    };

    const shimmerVariants: Variants = {
        animate: {
            x: ["0%", "100%"],
            transition: {
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
            },
        },
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`
        ${fullScreen ? 'fixed inset-0' : 'relative min-h-[400px]'}
        bg-gradient-to-br from-emerald-50 via-white to-indigo-50
        flex items-center justify-center overflow-hidden
        z-50
      `}
        >
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Animated Gradient Orbs */}
                <motion.div
                    className="absolute top-20 left-20 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
                    animate={{
                        scale: [1, 1.2, 1],
                        x: [0, 50, 0],
                        y: [0, -50, 0],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                <motion.div
                    className="absolute bottom-20 right-20 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        x: [0, -50, 0],
                        y: [0, 50, 0],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                <motion.div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
                    animate={{
                        scale: [1, 1.3, 1],
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                {/* Grid Pattern */}
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

                {/* Floating Particles */}
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 rounded-full bg-gradient-to-r from-emerald-400 to-indigo-400"
                        initial={{
                            x: Math.random() * window.innerWidth,
                            y: Math.random() * window.innerHeight,
                            opacity: 0,
                        }}
                        animate={{
                            x: Math.random() * window.innerWidth,
                            y: Math.random() * window.innerHeight,
                            opacity: [0, 0.5, 0],
                        }}
                        transition={{
                            duration: 5 + Math.random() * 3,
                            repeat: Infinity,
                            delay: i * 0.1,
                            ease: "linear",
                        }}
                    />
                ))}
            </div>



            {/* Main Content */}
            <div className="relative z-10 text-center max-w-md w-full mx-auto px-6">

                {/* Loading Message */}
                <motion.div variants={textVariants} className="mb-6">
                    <div className="relative inline-block">
                        <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
                            {message}
                            <span className="inline-block w-6 text-left">{dots}</span>
                        </h2>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">{subMessage}</p>
                </motion.div>

                {/* Animated Spinner */}
                <motion.div
                    variants={spinnerVariants}
                    animate="animate"
                    className="mb-6 flex justify-center"
                >
                    <div className="relative">
                        <Loader2 className="w-12 h-12 text-emerald-500" />
                        <motion.div
                            className="absolute inset-0 rounded-full border-2 border-emerald-300"
                            animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.6, 0, 0.6],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />
                    </div>
                </motion.div>

                {/* Progress Bar */}
                {showProgress && (
                    <motion.div variants={textVariants} className="w-full mb-4">
                        <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                            <motion.div
                                className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-500 to-indigo-500 rounded-full"
                                variants={progressVariants}
                                initial="initial"
                                animate="animate"
                            />
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                                variants={shimmerVariants}
                                animate="animate"
                                style={{ width: "50%" }}
                            />
                        </div>
                        <p className="text-sm text-gray-600 mt-2">
                            {Math.round(currentProgress)}% Complete
                        </p>
                    </motion.div>
                )}




            </div>

            {/* Decorative Bottom Bar */}
            <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-indigo-500"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
            />
        </motion.div>
    );
};

// Variant with skeleton loading
export const LoadingSkeleton: React.FC = () => {
    return (
        <div className="animate-pulse">
            <div className="space-y-4">
                <div className="h-32 bg-gray-200 rounded-2xl"></div>
                <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <div className="h-20 bg-gray-200 rounded-xl"></div>
                    <div className="h-20 bg-gray-200 rounded-xl"></div>
                    <div className="h-20 bg-gray-200 rounded-xl"></div>
                </div>
            </div>
        </div>
    );
};

// Variant with custom content
export const CustomLoadingPage: React.FC<{
    icon?: React.ReactNode;
    title?: string;
    message?: string;
}> = ({ icon, title = "Loading", message = "Please wait" }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px]">
            {icon || (
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                    <Loader2 className="w-12 h-12 text-emerald-500" />
                </motion.div>
            )}
            <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-xl font-semibold text-gray-800"
            >
                {title}
            </motion.h3>
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-2 text-gray-500"
            >
                {message}
            </motion.p>
        </div>
    );
};

export default LoadingPage;