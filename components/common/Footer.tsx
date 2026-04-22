// components/Footer.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import {
  Bot, MessageCircle, Phone, Mail, MapPin, Clock,
  ChevronUp, X, Send, User, Sparkles, Heart, Star,
  Instagram, Youtube, Facebook, Linkedin, ArrowUp
} from "lucide-react";
import Image from "next/image";
import { CONTACT_BRANCHES } from "@/lib/contact";

// ─────────────────────────────────────────────
//  Types & Interfaces
// ─────────────────────────────────────────────

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface SocialLink {
  name: string;
  href: string;
  icon: React.ReactNode;
  color: string;
  label: string;
}

interface Branch {
  label: string;
  href: string;
  map: string;
  address: string;
  comingSoon?: boolean;
}

interface Service {
  label: string;
  href: string;
  icon: string;
  featured?: boolean;
}

interface QuickLink {
  label: string;
  href: string;
}

// ─────────────────────────────────────────────
//  Constants & Data
// ─────────────────────────────────────────────

const SERVICES: Service[] = [
  { label: "Cupping & Hijama / कपिंग व हिजामा", href: "/services-skm-physiotherapy/cupping-hijama", icon: "🎯" },
  { label: "Dry Needling / ड्राई निडलिंग", href: "/services-skm-physiotherapy/dry-needling", icon: "💉" },
  { label: "Taping / टेपिंग", href: "/services-skm-physiotherapy/taping", icon: "🩹" },
  { label: "Back Pain / कमर दर्द", href: "/services-skm-physiotherapy/back-pain", icon: "🔹" },
  { label: "Neck Pain / गर्दन दर्द", href: "/services-skm-physiotherapy/neck-pain", icon: "🔹" },
  { label: "Knee Pain / घुटनों का दर्द", href: "/services-skm-physiotherapy/knee-pain", icon: "🔹" },
  { label: "Sciatica / साइटिका", href: "/services-skm-physiotherapy/sciatica", icon: "🔹" },
  { label: "Arthritis / गठिया", href: "/services-skm-physiotherapy/arthritis", icon: "🦴" },
  { label: "Frozen Shoulder / कंधे की जकड़न", href: "/services-skm-physiotherapy/frozen-shoulder", icon: "🔹" },
  { label: "Bell's Palsy / चेहरे का लकवा", href: "/services-skm-physiotherapy/bells-palsy", icon: "🧠" },
  { label: "Paralysis / लकवा", href: "/services-skm-physiotherapy/paralysis", icon: "🔹" },
  { label: "Sports Injuries / खेल चोटें", href: "/services-skm-physiotherapy/sports-injuries", icon: "⚡" },
  { label: "Post COVID Rehab / पोस्ट कोविड रिहैब", href: "/services-skm-physiotherapy/post-covid", icon: "🔹" },
  { label: "Relaxation Therapy / आराम थेरेपी", href: "/services-skm-physiotherapy/relaxation", icon: "🧘" },
  { label: "🏠 Home Visit / होम विजिट", href: "/services-skm-physiotherapy/home-visit", icon: "🏠", featured: true },
  { label: "🏢 Corporate Wellness / कॉर्पोरेट वेलनेस", href: "/services-skm-physiotherapy/corporate", icon: "🏢", featured: true },
];



const QUICK_LINKS: QuickLink[] = [
  { label: "About Us / हमारे बारे में", href: "/OurStory-skm-physiotherapy" },
  { label: "Our Story / हमारी कहानी", href: "/OurStory-skm-physiotherapy" },
  { label: "Why SKM / क्यों SKM", href: "/Why-skm-physiotherapy" },
  { label: "Testimonials / प्रशंसापत्र", href: "/testimonials-skm-physiotherapy" },
  { label: "FAQs / अक्सर पूछे जाने वाले प्रश्न", href: "/FAQ-skm-physiotherapy" },
  { label: "Franchise / फ्रैंचाइज़ी", href: "/franchise-skm-physiotherapy" },
  { label: "Careers / करियर", href: "/work-with-skm-physiotherapy" },
  { label: "Blog / ब्लॉग", href: "/blog-physiotherapy" },
];

const LEGAL_LINKS: QuickLink[] = [
  { label: "Privacy Policy / गोपनीयता नीति", href: "/privacy-policy" },
  { label: "Terms & Conditions / नियम व शर्तें", href: "/terms" },
  { label: "Refund Policy / रिफंड नीति", href: "/refund-policy" },
  { label: "Sitemap / साइटमैप", href: "/sitemap" },
];

const SOCIAL_LINKS: SocialLink[] = [
  {
    name: "WhatsApp",
    href: "https://wa.me/7982799147",
    label: "Chat on WhatsApp / व्हाट्सएप पर चैट करें",
    color: "hover:bg-green-500 hover:text-white border-green-400",
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
  },
  {
    name: "Instagram",
    href: "https://instagram.com/skmphysio",
    label: "Follow on Instagram / इंस्टाग्राम पर फॉलो करें",
    color: "hover:bg-pink-500 hover:text-white border-pink-400",
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
  },
  {
    name: "YouTube",
    href: "https://youtube.com/@skmphysio",
    label: "Subscribe on YouTube / यूट्यूब पर सब्सक्राइब करें",
    color: "hover:bg-red-500 hover:text-white border-red-400",
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
  },
  {
    name: "Facebook",
    href: "https://facebook.com/skmphysio",
    label: "Like on Facebook / फेसबुक पर लाइक करें",
    color: "hover:bg-blue-600 hover:text-white border-blue-400 ",
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
  },
];



const TRUST_BADGES = ["5+ Years Experience", "20000+ Patients Healed", "Expert Physiotherapists"];

const BOT_INITIAL_MESSAGE = "👋 Hello! I'm SKM Bot. How can I help you today? / नमस्ते! मैं SKM बॉट हूँ। मैं आपकी कैसे मदद कर सकता हूँ?";

const BOT_SUGGESTIONS = [
  "📅 Book Appointment / अपॉइंटमेंट बुक करें",
  "🏥 Find Nearest Clinic / नजदीकी क्लिनिक खोजें",
  "💰 Check Prices / कीमतें देखें",
  "👨‍⚕️ Talk to Expert / विशेषज्ञ से बात करें",
];

// ─────────────────────────────────────────────
//  Animation Variants
// ─────────────────────────────────────────────

const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };
const slideInRight = { hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.3 } } };
const slideInLeft = { hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.3 } } };
const scaleIn = { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 400 } } };
const chatSlideUp = { hidden: { opacity: 0, y: 30, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", damping: 25, stiffness: 300 } }, exit: { opacity: 0, y: 30, scale: 0.95, transition: { duration: 0.2 } } };
const backdropFade = { hidden: { opacity: 0 }, visible: { opacity: 1 }, exit: { opacity: 0 } };

// ─────────────────────────────────────────────
//  Chatbot Component
// ─────────────────────────────────────────────

function Chatbot({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', text: BOT_INITIAL_MESSAGE, sender: 'bot', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const responses = [
        "Thank you for your message! Our team will get back to you within 24 hours. / आपके संदेश के लिए धन्यवाद! हमारी टीम 24 घंटे के भीतर आपसे संपर्क करेगी।",
        "For immediate assistance, please call +91 98765 43210 or WhatsApp us. / तत्काल सहायता के लिए कृपया +91 98765 43210 पर कॉल करें या व्हाट्सएप करें।",
        "You can also book an appointment directly through our website. / आप हमारी वेबसाइट के माध्यम से सीधे अपॉइंटमेंट भी बुक कर सकते हैं।",
        "Which service are you interested in? I can help you find the right specialist. / आप किस सेवा में रुचि रखते हैं? मैं आपको सही विशेषज्ञ खोजने में मदद कर सकता हूँ।"
      ];
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestion = (text: string) => {
    setInput(text.split('/')[0].trim());
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        <motion.div
          variants={backdropFade}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          aria-hidden="true"
        />
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed bottom-24 right-6 z-50 w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col"
          style={{ maxHeight: 'calc(100vh - 120px)' }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="chatbot-title"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 id="chatbot-title" className="text-sm font-semibold text-white">SKM Assistant</h3>
                <p className="text-xs text-blue-100">Online • Typically replies in minutes</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
              aria-label=""
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm ${msg.sender === 'user'
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-br-md'
                  : 'bg-white border border-gray-200 text-gray-700 rounded-bl-md shadow-sm'
                  }`}>
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                  <p className={`text-[10px] mt-1 ${msg.sender === 'user' ? 'text-blue-100' : 'text-gray-400'}`}>
                    {msg.timestamp.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </motion.div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 px-4 py-3 rounded-2xl rounded-bl-md shadow-sm">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          {messages.length <= 2 && (
            <div className="px-4 py-2 bg-white border-t border-gray-100">
              <p className="text-xs text-gray-500 mb-2">Quick options / त्वरित विकल्प:</p>
              <div className="flex flex-wrap gap-2">
                {BOT_SUGGESTIONS.map((suggestion, i) => (
                  <button
                    key={i}
                    onClick={() => handleSuggestion(suggestion)}
                    className="px-3 py-1.5 text-xs bg-gray-100 hover:bg-indigo-100 text-gray-700 hover:text-indigo-700 rounded-full transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-3 bg-white border-t border-gray-200">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message... / अपना संदेश लिखें..."
                className="flex-1 px-4 py-2.5 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                aria-label="Message input / संदेश इनपुट"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="p-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                aria-label="Send message / संदेश भेजें"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[10px] text-gray-400 mt-2 text-center">
              Responses are AI-generated. For medical advice, consult our experts. /
              प्रतिक्रियाएँ एआई-जनित हैं। चिकित्सा सलाह के लिए हमारे विशेषज्ञों से परामर्श लें।
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

// ─────────────────────────────────────────────
//  Contact FAB Component
// ─────────────────────────────────────────────

function ContactFAB() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {/* Social Links (expand upward) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 flex flex-col items-center gap-2"
          >
            {SOCIAL_LINKS.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`w-11 h-11 rounded-xl flex items-center justify-center text-black shadow-lg border-2 transition-all ${social.color}`}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label={social.label}
                title={social.label}
              >
                {social.icon}
              </motion.a>
            ))}
            {/* Tooltip arrow */}
            <div className="w-3 h-3 bg-gray-900 rotate-45 -mt-1.5" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-2xl shadow-lg flex items-center justify-center transition-all ${isOpen
          ? 'bg-gray-900 text-white rotate-45'
          : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-indigo-300 hover:text-indigo-600'
          }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? "Close contact menu / संपर्क मेनू बंद करें" : "Contact us / संपर्क करें"}
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Phone className="w-6 h-6" />}
      </motion.button>

      {/* Label */}
      {/* <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 bg-gray-900 text-white text-[10px] rounded-md"
      >
        {isOpen ? "" : ""}
      </motion.span> */}
    </div>
  );
}

// ─────────────────────────────────────────────
//  Main Footer Component
// ─────────────────────────────────────────────

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Scroll to top visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
        {/* AI Booking Banner */}
        <motion.div
          className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">

                <div>

                </div>
              </div>

            </div>
          </div>
        </motion.div>

        {/* Main Footer Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 max-h-[40vh] overflow-auto">

            {/* Brand Section */}
            <div className="lg:col-span-1 space-y-4">
              <Link href="/" className="flex items-center gap-2.5 group">

                <Image src="/logo.png" alt="Logo" width={60} height={60} />


                <div>
                  <span className="block text-[15px] font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    SKM Physiotherapy
                  </span>
                  <span className="block text-[10px] text-indigo-500 font-medium tracking-wider uppercase">
                    Say no to pain
                  </span>
                </div>
              </Link>

              <p className="text-sm text-gray-500 leading-relaxed">
                Advanced physiotherapy with AI-powered booking, WhatsApp automation, and expert care tailored for you. /
                एआई-संचालित बुकिंग, व्हाट्सएप ऑटोमेशन और विशेषज्ञ देखभाल के साथ उन्नत फिजियोथेरेपी।
              </p>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-1.5">
                {TRUST_BADGES.map((badge) => (
                  <motion.span
                    key={badge}
                    className="text-[10px] font-semibold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-1 rounded-full"
                    whileHover={{ scale: 1.05 }}
                  >
                    {badge}
                  </motion.span>
                ))}
              </div>


            </div>

            {/* Branch Locations */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                Our Branches / हमारी शाखाएँ
              </h3>
              <ul className="space-y-3">
                {CONTACT_BRANCHES.filter(b => b.id === 'noida-swaran' || b.id === 'noida-134').map((branch) => (
                  <li key={branch.id}>
                    <Link
                      href={branch.href || "#"}
                      className={`group flex items-start gap-2.5 ${branch.comingSoon ? "opacity-60 pointer-events-none" : ""
                        }`}
                    >
                      <motion.svg
                        className="w-4 h-4 mt-0.5 text-indigo-400 flex-shrink-0 group-hover:text-indigo-600 transition-colors"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                        whileHover={{ scale: 1.2 }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </motion.svg>

                      <div>
                        <span
                          className={`text-sm group-hover:text-blue-600 transition-colors leading-snug ${branch.comingSoon ? "text-gray-400" : "text-gray-600"
                            }`}
                        >
                          {branch.name}
                        </span>

                        {branch.comingSoon ? (
                          <span className="block text-[10px] text-amber-600 font-medium">
                            Coming Soon / जल्द आ रहा है
                          </span>
                        ) : (
                          <span className="block text-[10px] text-gray-400 mt-0.5">
                            {branch.address}
                          </span>
                        )}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>


            </div>

            {/* Services */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                Our Services / हमारी सेवाएँ
              </h3>
              <ul className="space-y-2">
                {SERVICES.filter(s => !s.featured).map((service) => (
                  <li key={service.href}>
                    <Link
                      href={service.href}
                      className="group flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      <span className="text-base flex-shrink-0">{service.icon}</span>
                      <span className="truncate">{service.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                Quick Links / त्वरित लिंक
              </h3>
              <ul className="space-y-2">
                {QUICK_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-2 text-sm text-gray-600 hover:text-indigo-600 transition-colors"
                    >
                      <motion.svg
                        className="w-3.5 h-3.5 text-indigo-300 group-hover:text-indigo-500 transition-colors flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        whileHover={{ x: 3 }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </motion.svg>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>


          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-xs text-gray-400 text-center sm:text-left">
                © 2026 SKM Physiotherapy. All rights reserved. / सर्वाधिकार सुरक्षित।
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                {LEGAL_LINKS.map((link, idx) => (
                  <div key={link.href} className="flex items-center gap-1">
                    <Link
                      href={link.href}
                      className="text-xs text-gray-400 hover:text-indigo-600 transition-colors"
                    >
                      {link.label}
                    </Link>
                    {idx < LEGAL_LINKS.length - 1 && <span className="text-gray-300 hidden sm:inline">|</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Buttons Container */}
      <div className="fixed bottom-6 right-0 right-0 px-4 z-50 pointer-events-none">
        <div className="max-w-7xl mx-auto flex justify-between items-end">

          {/* Left: Contact FAB */}
          <div className="pointer-events-auto">
            <ContactFAB />
          </div>

          {/* Right: Chatbot + Scroll Top */}
          <div className="pointer-events-auto flex flex-col items-end gap-3">

            {/* Scroll to Top */}
            <AnimatePresence>
              {showScrollTop && (
                <motion.button
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.8 }}
                  onClick={scrollToTop}
                  aria-label="Scroll to top / ऊपर जाएँ"
                  className="w-12 h-12 bg-white border border-gray-200 rounded-xl shadow-lg flex items-center justify-center text-gray-600 hover:text-blue-600 hover:border-blue-300 transition-colors"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowUp className="w-5 h-5" />
                </motion.button>
              )}
            </AnimatePresence>

            {/* Chatbot Toggle */}
            {/* <motion.button
              onClick={() => setIsChatOpen(!isChatOpen)}
              className={`w-14 h-14 rounded-2xl shadow-lg flex items-center justify-center transition-all ${isChatOpen
                ? 'bg-gray-900 text-white'
                : 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700'
                }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={isChatOpen ? "" : ""}
              aria-expanded={isChatOpen}
            >
              <AnimatePresence mode="wait">
                {isChatOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="chat"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <MessageCircle className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button> */}


          </div>
        </div>
      </div>

      {/* Chatbot Modal */}
      <Chatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
}