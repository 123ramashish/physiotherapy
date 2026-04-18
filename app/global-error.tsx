'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Home, RefreshCw, AlertCircle, ArrowRight, WifiOff, Server, Search, Activity, Heart, Phone, Mail, MapPin, LucideIcon } from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

// Type definitions
interface MousePosition {
  x: number;
  y: number;
}

interface ErrorConfig {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  gradient: string;
  bgColor: string;
  particles: number;
  suggestion: string;
}

interface ErrorConfigs {
  [key: string]: ErrorConfig;
}

interface QuickLink {
  name: string;
  path: string;
  icon: LucideIcon;
  color: string;
}

interface GlobalErrorPageProps {
  statusCode?: number | string;
  message?: string;
}

const GlobalErrorPage: React.FC<GlobalErrorPageProps> = ({
  statusCode = 404,
  message = "Page not found"
}) => {
  const router = useRouter();
  const [countdown, setCountdown] = useState<number>(10);
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      router.push('/');
    }
  }, [countdown, router]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const errorConfigs: ErrorConfigs = {
    404: {
      icon: Search,
      title: "Lost in Space",
      description: "The page you're looking for has drifted into the unknown cosmos of our website.",
      color: "from-emerald-500 to-teal-500",
      gradient: "from-emerald-400 via-teal-400 to-cyan-400",
      bgColor: "bg-gradient-to-br from-emerald-50 via-white to-teal-50",
      particles: 15,
      suggestion: "Try checking the URL or navigate using the links below.",
    },
    500: {
      icon: Server,
      title: "Server Malfunction",
      description: "Our servers are taking a quick coffee break. They'll be back and running shortly!",
      color: "from-blue-500 to-indigo-500",
      gradient: "from-blue-400 via-indigo-400 to-purple-400",
      bgColor: "bg-gradient-to-br from-blue-50 via-white to-indigo-50",
      particles: 20,
      suggestion: "Please try again in a few moments or contact support if the issue persists.",
    },
    403: {
      icon: AlertCircle,
      title: "Access Denied",
      description: "You don't have permission to access this resource.",
      color: "from-indigo-500 to-purple-500",
      gradient: "from-indigo-400 via-purple-400 to-pink-400",
      bgColor: "bg-gradient-to-br from-indigo-50 via-white to-purple-50",
      particles: 12,
      suggestion: "Please sign in with appropriate credentials or contact your administrator.",
    },
    offline: {
      icon: WifiOff,
      title: "Connection Lost",
      description: "Your connection to our health network has been interrupted.",
      color: "from-cyan-500 to-blue-500",
      gradient: "from-cyan-400 via-blue-400 to-indigo-400",
      bgColor: "bg-gradient-to-br from-cyan-50 via-white to-blue-50",
      particles: 8,
      suggestion: "Check your internet connection and try again.",
    },
  };

  const config: ErrorConfig = errorConfigs[statusCode.toString()] || errorConfigs[404];
  const Icon: LucideIcon = config.icon;

  // Animation variants with proper typing
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const floatAnimation: Variants = {
    initial: { y: 0 },
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const pulseRing: Variants = {
    initial: { scale: 1, opacity: 0.3 },
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.3, 0.1, 0.3],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
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

  const quickLinks: QuickLink[] = [
    { name: 'Home', path: '/', icon: Home, color: 'from-emerald-500 to-teal-500' },
    { name: 'Services', path: '/services', icon: Activity, color: 'from-blue-500 to-indigo-500' },
    { name: 'Contact', path: '/contact', icon: Phone, color: 'from-teal-500 to-cyan-500' },
    { name: 'About', path: '/about', icon: Heart, color: 'from-indigo-500 to-purple-500' },
  ];

  // Helper function to get gradient color values
  const getGradientColor = (gradient: string): string => {
    const colors = gradient.split(' ');
    return colors.map(c => c.replace('from-', '').replace('to-', '')).join(', ');
  };

  return (
    <div className={`min-h-screen ${config.bgColor} overflow-hidden relative`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, #10b981 1px, transparent 1px),
                linear-gradient(to bottom, #10b981 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        {/* Floating Particles */}
        {isClient &&
          [...Array(config.particles)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 md:w-2 md:h-2 rounded-full"
              style={{
                background: `linear-gradient(135deg, ${getGradientColor(config.color)})`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, (Math.random() - 0.5) * 200],
                y: [0, (Math.random() - 0.5) * 200],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 5 + Math.random() * 3,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}

        {/* Gradient Blobs with Mouse Follow */}
        <motion.div
          className={`absolute w-64 h-64 md:w-96 md:h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-20 bg-gradient-to-r ${config.color}`}
          animate={{
            x: mousePosition.x * 80,
            y: mousePosition.y * 80,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
          style={{ left: "10%", top: "10%" }}
        />
        <motion.div
          className={`absolute w-80 h-80 md:w-[30rem] md:h-[30rem] rounded-full mix-blend-multiply filter blur-3xl opacity-20 bg-gradient-to-r ${config.gradient}`}
          animate={{
            x: -mousePosition.x * 60,
            y: -mousePosition.y * 60,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
          style={{ right: "10%", bottom: "10%" }}
        />
        <motion.div
          className={`absolute w-72 h-72 md:w-[25rem] md:h-[25rem] rounded-full mix-blend-multiply filter blur-3xl opacity-15 bg-gradient-to-r ${config.color}`}
          animate={{
            x: mousePosition.x * 40,
            y: -mousePosition.y * 40,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
          style={{ left: "30%", bottom: "20%" }}
        />
      </div>

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 py-8"
      >
        <div className="max-w-5xl w-full text-center">
          {/* Error Code with Animation */}
          <motion.div variants={itemVariants} className="mb-6 md:mb-8">
            <div className="relative inline-block">
              <motion.div
                className={`text-8xl sm:text-9xl md:text-[12rem] lg:text-[15rem] font-black bg-gradient-to-r ${config.gradient} bg-clip-text text-transparent leading-none`}
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{ backgroundSize: "200% auto" }}
              >
                {statusCode}
              </motion.div>
              <motion.div
                className={`absolute -inset-4 md:-inset-6 rounded-full bg-gradient-to-r ${config.color} opacity-20 blur-xl`}
                variants={pulseRing}
                initial="initial"
                animate="animate"
              />
            </div>
          </motion.div>

          {/* Animated Icon */}
          <motion.div variants={itemVariants} className="mb-6 md:mb-8">
            <div className="relative inline-block">
              <motion.div
                className={`p-4 md:p-6 rounded-2xl bg-gradient-to-br ${config.color} bg-opacity-10 backdrop-blur-sm border border-white/30 shadow-2xl`}
                variants={floatAnimation}
                initial="initial"
                animate="animate"
              >
                <Icon className="w-12 h-12 md:w-16 md:h-16 text-gray-800" />
              </motion.div>
              <motion.div
                className="absolute inset-0 rounded-2xl"
                animate={{
                  boxShadow: [
                    "0 0 0px rgba(16, 185, 129, 0)",
                    "0 0 30px rgba(16, 185, 129, 0.3)",
                    "0 0 0px rgba(16, 185, 129, 0)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 px-4"
          >
            {config.title}
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg md:text-xl text-gray-600 mb-4 max-w-2xl mx-auto px-4"
          >
            {message || config.description}
          </motion.p>

          {/* Suggestion */}
          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-base text-gray-500 mb-8 md:mb-10 max-w-xl mx-auto px-4"
          >
            {config.suggestion}
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-10 md:mb-12 px-4"
          >
            <motion.button
              onClick={() => router.push('/')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-xl font-semibold text-base md:text-lg overflow-hidden transition-all duration-300 hover:shadow-2xl"
            >
              <motion.div
                className={`absolute inset-0 bg-gradient-to-r ${config.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />
              <span className="relative flex items-center justify-center gap-2 md:gap-3">
                <Home className="w-4 h-4 md:w-5 md:h-5" />
                Back to Home
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 transform -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300" />
              </span>
            </motion.button>

            <motion.button
              onClick={() => router.refresh()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-6 md:px-8 py-3 md:py-4 bg-white text-gray-900 rounded-xl font-semibold text-base md:text-lg border-2 border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center justify-center gap-2 md:gap-3">
                <RefreshCw className="w-4 h-4 md:w-5 md:h-5 group-hover:rotate-180 transition-transform duration-500" />
                Try Again
              </span>
            </motion.button>
          </motion.div>

          {/* Quick Links Grid */}
          <motion.div variants={itemVariants} className="mb-10 md:mb-12">
            <p className="text-gray-600 mb-4 text-sm md:text-base">Quick Navigation</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 max-w-3xl mx-auto px-4">
              {quickLinks.map((link) => {
                const LinkIcon = link.icon;
                return (
                  <motion.button
                    key={link.name}
                    onClick={() => router.push(link.path)}
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative"
                  >
                    <div className="flex flex-col items-center justify-center p-4 md:p-5 rounded-xl bg-white border border-gray-200 hover:border-transparent transition-all duration-300 hover:shadow-lg">
                      <div className={`p-2 md:p-3 rounded-lg bg-gradient-to-br ${link.color} mb-2 md:mb-3 group-hover:scale-110 transition-transform duration-300`}>
                        <LinkIcon className="w-4 h-4 md:w-5 md:h-5 text-white" />
                      </div>
                      <span className="text-xs md:text-sm font-semibold text-gray-700 group-hover:text-gray-900">
                        {link.name}
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Countdown Timer */}
          <motion.div
            variants={itemVariants}
            className="inline-flex flex-col sm:flex-row items-center gap-3 px-5 md:px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full border border-white/20 shadow-lg"
          >
            {/* <div className="relative w-8 h-8 md:w-10 md:h-10">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 32 32">
                <circle
                  cx="16"
                  cy="16"
                  r="14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="text-gray-200"
                />
                <motion.circle
                  cx="16"
                  cy="16"
                  r="14"
                  fill="none"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: 1 }}
                  animate={{ pathLength: countdown / 10 }}
                  transition={{ duration: 1 }}
                  style={{
                    stroke: `url(#gradient-${statusCode})`,
                  }}
                />
              </svg>
              <defs>
                <linearGradient id={`gradient-${statusCode}`} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="50%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>
              </defs>
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.span
                  key={countdown}
                  initial={{ scale: 1.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-xs md:text-sm font-bold text-gray-900"
                >
                  {countdown}
                </motion.span>
              </div>
            </div> */}
            <span className="text-xs sm:text-sm text-gray-700">
              Redirecting to homepage in {countdown} seconds
            </span>
          </motion.div>

          {/* Contact Support */}
          <motion.div
            variants={itemVariants}
            className="mt-10 md:mt-12 pt-6 md:pt-8 border-t border-gray-200 border-opacity-50"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
              <motion.a
                href="tel:7982799147"
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full text-sm md:text-base shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Phone className="w-4 h-4 md:w-5 md:h-5" />
                <span>Emergency: 7982799147</span>
              </motion.a>
              <motion.a
                href="mailto:support@skmphysiotherapy.com"
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-full text-sm md:text-base shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
              >
                <Mail className="w-4 h-4 md:w-5 md:h-5" />
                <span>support@skmphysiotherapy.com</span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
        <motion.button
          onClick={() => router.push('/')}
          whileHover={{ scale: 1.1, rotate: 360 }}
          whileTap={{ scale: 0.9 }}
          className="p-3 md:p-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300"
        >
          <Home className="w-5 h-5 md:w-6 md:h-6" />
        </motion.button>
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-3 md:p-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full shadow-2xl hover:shadow-blue-500/50 transition-all duration-300"
        >
          <ArrowRight className="w-5 h-5 md:w-6 md:h-6 transform -rotate-90" />
        </motion.button>
      </div>
    </div>
  );
};

export default GlobalErrorPage;