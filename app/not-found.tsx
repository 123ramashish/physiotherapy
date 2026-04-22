'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Activity, Home, Search, Phone, ArrowLeft, Heart, AlertCircle, ArrowRight, MapPin, Clock, Mail, LucideIcon } from 'lucide-react';
import Image from 'next/image';

// Type definitions
interface MousePosition {
  x: number;
  y: number;
}

interface QuickLink {
  icon: LucideIcon;
  label: string;
  link: string;
  color: string;
}

const PageNotFound: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animation variants with proper Variants type
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const floatAnimation: Variants = {
    initial: { y: 0 },
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const pulseRing: Variants = {
    initial: { scale: 1, opacity: 0.3 },
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.3, 0.1, 0.3],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const floatingIconVariants: Variants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (index: number) => ({
      opacity: 0.4,
      scale: 1,
      transition: { delay: index * 0.2 }
    })
  };

  const backgroundGradientVariants: Variants = {
    animate: {
      scale: [1, 1.2, 1],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const rotatingIconVariants: Variants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const errorCardIconVariants: Variants = {
    animate: {
      rotate: [0, -10, 10, 0],
      transition: {
        duration: 2,
        repeat: Infinity
      }
    }
  };

  const quickLinks: QuickLink[] = [
    { icon: Home, label: 'Home', link: '/', color: 'from-emerald-500 to-teal-500' },
    { icon: Activity, label: 'Services', link: '/services-skm-physiotherapy', color: 'from-blue-500 to-indigo-500' },
    { icon: Heart, label: 'About Us', link: '/OurStory-skm-physiotherapy', color: 'from-indigo-500 to-purple-500' },
    { icon: Phone, label: 'Contact', link: '/contact-skm-physiotherapy', color: 'from-teal-500 to-emerald-500' }
  ];

  const floatingIcons: LucideIcon[] = [Activity, Heart, Activity, Heart, MapPin, Clock];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-indigo-50 relative overflow-hidden flex items-center justify-center px-4 py-8">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          style={{
            left: `${mousePosition.x / 20}px`,
            top: `${mousePosition.y / 20}px`,
          }}
          variants={backgroundGradientVariants}
          animate="animate"
        />
        <motion.div
          className="absolute top-1/4 right-20 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 left-1/3 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          animate={{
            scale: [1, 1.3, 1],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Floating Icons */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingIcons.map((Icon, index) => (
          <motion.div
            key={index}
            custom={index}
            variants={floatingIconVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.2, opacity: 0.6 }}
            className="absolute"
            style={{
              top: `${20 + (index * 15)}%`,
              left: `${[10, 85, 20, 90, 15, 80][index]}%`,
            }}
          >
            <Icon className="w-8 h-8 md:w-12 md:h-12 text-emerald-300 animate-bounce"
              style={{ animationDelay: `${index * 0.3}s` }}
            />
          </motion.div>
        ))}
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className="relative z-10 text-center max-w-4xl w-full"
      >
        {/* Logo */}
        <motion.div variants={itemVariants} className="flex items-center justify-center space-x-3 mb-8">
          <Image src="/logo.png" alt="Logo" width={60} height={60} />

          <div className="text-left">
            <motion.h1
              className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-600 to-indigo-600 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{ backgroundSize: '200% auto' }}
            >
              SKM PHYSIOTHERAPY
            </motion.h1>
            <p className="text-sm text-gray-500">Say No To Pain</p>
          </div>
        </motion.div>

        {/* 404 Number */}
        <motion.div variants={itemVariants} className="relative mb-8">
          <motion.h2
            className="text-[120px] md:text-[180px] lg:text-[200px] font-bold bg-gradient-to-r from-emerald-500 via-blue-500 to-indigo-500 bg-clip-text text-transparent leading-none"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{ backgroundSize: '200% auto' }}
          >
            404
          </motion.h2>
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            variants={rotatingIconVariants}
            animate="animate"
          >
            <AlertCircle className="w-20 h-20 md:w-28 md:h-28 text-emerald-300 opacity-50" />
          </motion.div>
        </motion.div>

        {/* Error Message */}
        <motion.div variants={itemVariants} className="mb-8">
          <motion.h3
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4"
            variants={floatAnimation}
            initial="initial"
            animate="animate"
          >
            Oops! Page Not Found
          </motion.h3>
          <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
            The page you&apos;re looking for seems to have taken a break. Just like your body needs rest,
            sometimes pages do too! Let&apos;s get you back on track to better health.
          </p>
        </motion.div>

        {/* Error Card */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
          className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 mb-8 max-w-2xl mx-auto"
        >
          <div className="flex items-start space-x-4 text-left">
            <motion.div
              className="bg-gradient-to-br from-emerald-500 to-indigo-500 p-3 rounded-2xl flex-shrink-0"
              variants={errorCardIconVariants}
              animate="animate"
            >
              <AlertCircle className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </motion.div>
            <div>
              <h4 className="text-lg md:text-xl font-bold text-gray-800 mb-2">What happened?</h4>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                The page you requested doesn&apos;t exist or may have been moved. This could be due to a
                typo in the URL or the page has been removed.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 px-4">
          <motion.a
            href="/"
            className="relative w-full sm:w-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative px-6 md:px-8 py-3 md:py-4 font-semibold text-white overflow-hidden rounded-2xl shadow-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 transition-all duration-300">
              <span className="relative flex items-center justify-center space-x-2 z-10">
                <Home className="w-4 h-4 md:w-5 md:h-5" />
                <span>Go Home</span>
              </span>
            </div>
          </motion.a>

          <motion.button
            onClick={() => window.history.back()}
            className="relative w-full sm:w-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative px-6 md:px-8 py-3 md:py-4 font-semibold text-gray-800 overflow-hidden rounded-2xl shadow-xl bg-white border-2 border-gray-200 hover:border-emerald-300 transition-all duration-300">
              <span className="relative flex items-center justify-center space-x-2 z-10 group">
                <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-x-1 transition-transform duration-300" />
                <span>Go Back</span>
              </span>
            </div>
          </motion.button>

          <motion.a
            href="/services-skm-physiotherapy"
            className="relative w-full sm:w-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative px-6 md:px-8 py-3 md:py-4 font-semibold text-white overflow-hidden rounded-2xl shadow-xl bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 transition-all duration-300">
              <span className="relative flex items-center justify-center space-x-2 z-10">
                <Search className="w-4 h-4 md:w-5 md:h-5" />
                <span>Our Services</span>
              </span>
            </div>
          </motion.a>
        </motion.div>



        {/* Contact Section */}
        <motion.div variants={itemVariants} className="mt-8">
          <motion.div
            className="inline-flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 bg-gradient-to-r from-emerald-500 to-indigo-500 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 md:w-5 md:h-5 animate-bounce" />
              <span className="font-semibold text-sm md:text-base">Need Help? Call:</span>
            </div>
            <a href="tel:7982799147" className="font-bold text-base md:text-lg hover:text-emerald-200 transition-colors">
              7982799147
            </a>
          </motion.div>
        </motion.div>
      </motion.div>

    </div>
  );
};

export default PageNotFound;