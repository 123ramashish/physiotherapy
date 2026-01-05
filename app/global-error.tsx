'use client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Home, RefreshCw, AlertCircle, ArrowRight, WifiOff, Server, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const GlobalErrorPage = ({ statusCode = 404, message = "Page not found" }) => {
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      router.push('/');
    }
  }, [countdown, router]);

  useEffect(() => {
    const handleMouseMove = (e:any) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const errorConfigs:any = {
    404: {
      icon: Search,
      title: "Lost in Space",
      description: "The page you're looking for has drifted into the unknown.",
      color: "from-blue-500 to-purple-600",
      bgColor: "bg-gradient-to-br from-blue-50 to-purple-50",
      particles: 15,
    },
    500: {
      icon: Server,
      title: "Server Malfunction",
      description: "Our servers are taking a coffee break. They'll be back soon!",
      color: "from-red-500 to-orange-600",
      bgColor: "bg-gradient-to-br from-red-50 to-orange-50",
      particles: 20,
    },
    403: {
      icon: AlertCircle,
      title: "Access Denied",
      description: "You don't have permission to access this resource.",
      color: "from-yellow-500 to-amber-600",
      bgColor: "bg-gradient-to-br from-yellow-50 to-amber-50",
      particles: 12,
    },
    offline: {
      icon: WifiOff,
      title: "Connection Lost",
      description: "Please check your internet connection and try again.",
      color: "from-gray-500 to-slate-700",
      bgColor: "bg-gradient-to-br from-gray-50 to-slate-100",
      particles: 8,
    },
  };

  const config = errorConfigs[statusCode] || errorConfigs[404];
  const Icon = config.icon;

  return (
    <div className={`min-h-screen ${config.bgColor} overflow-hidden relative`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Particles */}
        {[...Array(config.particles)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-gradient-to-r opacity-20"
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              repeatType: "reverse",
              delay: i * 0.1,
            }}
            style={{
              background: `linear-gradient(45deg, var(--tw-gradient-from), var(--tw-gradient-to))`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}

        {/* Gradient Blobs */}
        <motion.div
          className={`absolute w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-20 ${config.color}`}
          animate={{
            x: mousePosition.x * 50,
            y: mousePosition.y * 50,
          }}
          transition={{ type: "spring", stiffness: 100, damping: 10 }}
          style={{ left: '20%', top: '20%' }}
        />
        <motion.div
          className={`absolute w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-20 ${config.color}`}
          animate={{
            x: -mousePosition.x * 30,
            y: -mousePosition.y * 30,
          }}
          transition={{ type: "spring", stiffness: 100, damping: 10 }}
          style={{ right: '20%', bottom: '20%' }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full text-center">
          {/* Error Code with Animation */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="mb-8"
          >
            <div className="relative inline-block">
              <div className={`text-9xl font-black bg-gradient-to-r ${config.color} bg-clip-text text-transparent`}>
                {statusCode}
              </div>
              <motion.div
                className={`absolute -inset-4 rounded-full bg-gradient-to-r ${config.color} opacity-20 blur-xl`}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>

          {/* Animated Icon */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <div className="relative inline-block">
              <div className={`p-6 rounded-2xl bg-gradient-to-br ${config.color} bg-opacity-10 backdrop-blur-sm border border-white/20 shadow-2xl`}>
                <Icon className="w-16 h-16 text-gray-800" />
              </div>
              <motion.div
                className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r opacity-0 hover:opacity-100 transition-opacity duration-300"
                style={{
                  backgroundImage: `linear-gradient(white, white), linear-gradient(45deg, var(--tw-gradient-from), var(--tw-gradient-to))`,
                  backgroundClip: 'padding-box, border-box',
                  backgroundOrigin: 'border-box',
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4"
          >
            {config.title}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto"
          >
            {message || config.description}
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <button
              onClick={() => router.push('/')}
              className="group relative px-8 py-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-xl font-semibold text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center justify-center gap-3">
                <Home className="w-5 h-5" />
                Back to Home
                <ArrowRight className="w-5 h-5 transform -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300" />
              </span>
            </button>

            <button
              onClick={() => router.reload()}
              className="group relative px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold text-lg border-2 border-gray-200 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center justify-center gap-3">
                <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                Try Again
              </span>
            </button>
          </motion.div>

          {/* Countdown Timer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full border border-white/20 shadow-lg"
          >
            <div className="relative w-8 h-8">
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
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className={`text-gradient-to-r ${config.color.split(' ')[1]}`}
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
                  <stop offset="0%" style={{ stopColor: config.color.split(' ')[0].replace('from-', '') }} />
                  <stop offset="100%" style={{ stopColor: config.color.split(' ')[1].replace('to-', '') }} />
                </linearGradient>
              </defs>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-bold text-gray-900">{countdown}</span>
              </div>
            </div>
            <span className="text-gray-700">Redirecting to homepage in {countdown} seconds</span>
          </motion.div>

          {/* Help Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-12 pt-8 border-t border-gray-200 border-opacity-50"
          >
            <p className="text-gray-500 mb-4">Need help? Here are some helpful links:</p>
            <div className="flex flex-wrap justify-center gap-6">
              {['Home', 'Services', 'Contact', 'About'].map((link, index) => (
                <motion.a
                  key={link}
                  href={`/${link.toLowerCase()}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200 relative group"
                >
                  {link}
                  <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r ${config.color} group-hover:w-full transition-all duration-300`} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background Grid */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, #888 1px, transparent 1px),
                           linear-gradient(to bottom, #888 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }} />
      </div>
    </div>
  );
};

export default GlobalErrorPage;