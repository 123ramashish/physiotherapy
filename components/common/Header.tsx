"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Recursive type for navigation items with unlimited nesting
type NavItem = {
  label: string;
  href: string;
  id?: string; // Support for anchor/ID navigation
  icon?: string;
  dropdown?: NavItem[];
  comingSoon?: boolean; // Fixed: consistent casing
};

const NAV_LINKS: NavItem[] = [
  { label: "Home", href: "/", id: "home" },
  {
    label: "Services",
    href: "/services",
    id: "services",
    dropdown: [
      {
        label: "All Services / सभी सेवाएं",
        href: "/services",
        id: "all-services",
        icon: "🎯",
      },
      // Group 1: Specialized Therapies
      {
        label: "Specialized Therapies / विशेष चिकित्सा",
        href: "/services/specialized-therapies",
        id: "specialized-therapies",
        icon: "🎯",
        dropdown: [
          { label: "Cupping and Hijama / कपिंग व हिजामा", href: "/services/cupping-hijama", id: "cupping-hijama", icon: "" },
          { label: "Dry Needling / ड्राई निडलिंग", href: "/services/dry-needling", id: "dry-needling", icon: "💉" },
          { label: "Taping / टेपिंग", href: "/services/taping", id: "taping", icon: "🩹" },
        ]
      },
      // Group 2: Pain Management
      {
        label: "Pain Management / दर्द प्रबंधन",
        href: "/services/pain-management",
        id: "pain-management",
        icon: "🩺",
        dropdown: [
          { label: "Back Pain / कमर दर्द", href: "/services/back-pain", id: "back-pain", icon: "🔹" },
          { label: "Neck Pain / गर्दन दर्द", href: "/services/neck-pain", id: "neck-pain", icon: "🔹" },
          { label: "Knee Pain / घुटनों का दर्द", href: "/services/knee-pain", id: "knee-pain", icon: "🔹" },
          { label: "Heel Pain / एड़ी का दर्द", href: "/services/heel-pain", id: "heel-pain", icon: "🔹" },
          { label: "Sciatica Pain / साइटिका", href: "/services/sciatica", id: "sciatica", icon: "🔹" },
        ]
      },
      // Group 3: Joint & Bone Conditions
      {
        label: "Joint & Bone / जोड़ और हड्डी",
        href: "/services/joint-bone",
        id: "joint-bone",
        icon: "🦴",
        dropdown: [
          { label: "Arthritis / गठिया, वाय", href: "/services/arthritis", id: "arthritis", icon: "🔹" },
          { label: "Frozen Shoulder / कंधे की जकड़न", href: "/services/frozen-shoulder", id: "frozen-shoulder", icon: "🔹" },
        ]
      },
      // Group 4: Neurological Conditions
      {
        label: "Neurological / न्यूरोलॉजिकल",
        href: "/services/neurological",
        id: "neurological",
        icon: "🧠",
        dropdown: [
          { label: "Bell's Palsy / चेहरे का लकवा", href: "/services/bells-palsy", id: "bells-palsy", icon: "🔹" },
          { label: "Paralysis (Stroke) / लकवा", href: "/services/paralysis", id: "paralysis", icon: "🔹" },
        ]
      },
      // Group 5: Injury & Rehabilitation
      {
        label: "Injury & Rehab / चोट और पुनर्वास",
        href: "/services/injury-rehab",
        id: "injury-rehab",
        icon: "🏥",
        dropdown: [
          { label: "Sports Injuries / खेल कूद की चोटें", href: "/services/sports-injuries", id: "sports-injuries", icon: "⚡" },
          { label: "Post COVID Rehab / पोस्ट कोविड रिहैब", href: "/services/post-covid", id: "post-covid", icon: "🔹" },
        ]
      },
      // Group 6: Wellness
      {
        label: "Wellness / कल्याण",
        href: "/services/wellness",
        id: "wellness",
        icon: "🧘",
        dropdown: [
          { label: "Soreness Relaxation / सूजन की परेशानी", href: "/services/relaxation", id: "relaxation", icon: "🔹" },
        ]
      },
      // Quick links
      { label: "Home Visit / होम विजिट", href: "/services/home-visit", id: "home-visit", icon: "🏠" },
      { label: "Corporate Wellness / कॉर्पोरेट वेलनेस", href: "/services/corporate", id: "corporate", icon: "🏢" }
    ],
  },
  {
    label: "Branches",
    href: "/branches/noida-sector-135",
    id: "branches",
    dropdown: [
      {
        label: "Noida / नोएडा",
        href: "/branches",
        id: "noida",
        icon: "📍",
        dropdown: [
          { label: "Swaran Nagari / स्वर्ण नगरी", href: "/branches/greater-noida-swaran-nagari", id: "swaran-nagari", icon: "🏢" },
          { label: "Sector 135 / सेक्टर 135", href: "/branches/noida-sector-135", id: "sector-135", icon: "🏢" },
        ]
      },
    ],
  },
  {
    label: "About",
    href: "/TestimonialsPage",
    id: "about",
    dropdown: [
      { label: "Our Story / हमारी कहानी", href: "/story", id: "story" },
      { label: "Why SKM / क्यों SKM", href: "/WhySKM", id: "why-skm" },
      { label: "Our Partners / हमारे साझेदार", href: "/OurPartners", id: "partners" },
      { label: "Our Impact / हमारा प्रभाव", href: "/OurImpact", id: "impact" },
      { label: "Work With Us / हमारे साथ जुड़ें", href: "/work-with-us", id: "work-with-us" },
      { label: "Testimonials / प्रशंसापत्र", href: "/TestimonialsPage", id: "testimonials" },
      { label: "FAQs / अक्सर पूछे जाने वाले प्रश्न", href: "/FAQ", id: "faqs" },
      { label: "Certifications & Awards / प्रमाणन और पुरस्कार", href: "/AwardsCertifications", id: "awards" },
    ],
  },
  {
    label: "Media",
    href: "/blog",
    id: "media",
    dropdown: [
      { label: "Blog / ब्लॉग", href: "/blog", id: "blog" },
      { label: "Gallery / गैलरी", href: "/gallery", id: "gallery" },
      { label: "Events / आयोजन", href: "/events", id: "events" },
    ],
  },
  { label: "Contact", href: "/contact", id: "contact" },
];

// Helper: Check if a nav item is active
const isNavItemActive = (pathname: string, item: NavItem): boolean => {
  if (item.href === "/") return pathname === "/";
  return pathname.startsWith(item.href);
};

// Helper: Check if any child is active (for parent highlighting)
const hasActiveChild = (pathname: string, items?: NavItem[]): boolean => {
  if (!items) return false;
  return items.some(child =>
    isNavItemActive(pathname, child) || hasActiveChild(pathname, child.dropdown)
  );
};

// ============ RECURSIVE DESKTOP DROPDOWN COMPONENT ============
function DesktopNavItem({
  item,
  depth = 0,
  pathname,
  onNavigate
}: {
  item: NavItem;
  depth?: number;
  pathname: string;
  onNavigate: (href: string, id?: string) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const hasChildren = item.dropdown && item.dropdown.length > 0;
  const isActive = isNavItemActive(pathname, item) || hasActiveChild(pathname, item.dropdown);

  const baseStyles = `flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${isActive
    ? "text-blue-600 bg-blue-50 font-semibold"
    : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
    } ${item.comingSoon ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`;

  const dropdownPosition = depth === 0
    ? "top-full left-1/2 -translate-x-1/2 mt-1"
    : "top-0 left-full ml-1 mt-0";

  const handleClick = (e: React.MouseEvent) => {
    if (item.comingSoon) {
      e.preventDefault();
      return;
    }
    // Fixed: Parent items are now clickable links even if they have dropdowns
    onNavigate(item.href, item.id);
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => !item.comingSoon && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a
        href={item.href}
        className={baseStyles}
        onClick={handleClick}
        data-nav-id={item.id}
      >
        {item.icon && <motion.span
          className="text-base"
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          {item.icon}
        </motion.span>}
        <span>{item.label}</span>
        {item.comingSoon && (
          <span className="text-[10px] px-1.5 py-0.5 bg-amber-100 text-amber-700 rounded-full font-medium">
            Soon
          </span>
        )}
        {hasChildren && (
          <motion.svg
            className={`w-3.5 h-3.5 ${depth === 0 ? "" : "rotate-270"}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
            animate={{ rotate: depth === 0 && isHovered ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </motion.svg>
        )}
      </a>

      {/* Recursive Dropdown Menu with AnimatePresence */}
      <AnimatePresence>
        {hasChildren && isHovered && !item.comingSoon && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: depth === 0 ? -10 : 0 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: depth === 0 ? -10 : 0 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={`absolute ${dropdownPosition} w-56 bg-white rounded-2xl shadow-xl shadow-gray-200/80 border border-gray-100 py-2 z-50`}
          >
            {item.dropdown!.map((child) => (
              <DesktopNavItem
                key={`${child.label}-${child.href}-${child.id}`}
                item={child}
                depth={depth + 1}
                pathname={pathname}
                onNavigate={onNavigate}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============ RECURSIVE MOBILE DROPDOWN COMPONENT ============
function MobileNavItem({
  item,
  depth = 0,
  pathname,
  onNavigate,
  onClose
}: {
  item: NavItem;
  depth?: number;
  pathname: string;
  onNavigate: (href: string, id?: string) => void;
  onClose: () => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = item.dropdown && item.dropdown.length > 0;
  const isActive = isNavItemActive(pathname, item);

  const indentClass = depth > 0 ? `pl-${Math.min(depth * 4, 12)}` : "";

  const handleClick = (e: React.MouseEvent) => {
    if (item.comingSoon) return;

    if (hasChildren) {
      setIsExpanded(!isExpanded);
    } else {
      onNavigate(item.href, item.id);
      onClose();
    }
  };

  if (hasChildren) {
    return (
      <div className={indentClass}>
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleClick}
          disabled={item.comingSoon}
          className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-colors ${isActive
            ? "text-blue-600 bg-blue-50 font-semibold"
            : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
            } ${item.comingSoon ? "opacity-60 cursor-not-allowed" : ""}`}
          aria-expanded={isExpanded}
          aria-haspopup="true"
        >
          <span className="flex items-center gap-3">
            {item.icon && <span className="text-base">{item.icon}</span>}
            {item.label}
            {item.comingSoon && (
              <span className="text-[10px] px-1.5 py-0.5 bg-amber-100 text-amber-700 rounded-full font-medium">
                Soon
              </span>
            )}
          </span>
          <motion.svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </motion.svg>
        </motion.button>

        {/* Recursive nested mobile menu with AnimatePresence */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="space-y-1 pb-2">
                {item.dropdown!.map((child) => (
                  <MobileNavItem
                    key={`${child.label}-${child.href}-${child.id}`}
                    item={child}
                    depth={depth + 1}
                    pathname={pathname}
                    onNavigate={onNavigate}
                    onClose={onClose}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Leaf node - actual link
  return (
    <motion.a
      href={item.href}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      data-nav-id={item.id}
      className={`flex items-center gap-3 px-4 py-3 text-sm rounded-xl transition-colors ${isActive
        ? "text-blue-600 bg-blue-50 font-semibold"
        : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
        } ${indentClass} ${item.comingSoon ? "opacity-60 cursor-not-allowed" : ""}`}
    >
      {item.icon && <span className="text-base">{item.icon}</span>}
      <span>{item.label}</span>
      {item.comingSoon && (
        <span className="ml-auto text-[10px] px-1.5 py-0.5 bg-amber-100 text-amber-700 rounded-full font-medium">
          Soon
        </span>
      )}
    </motion.a>
  );
}

// ============ MAIN HEADER COMPONENT ============
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  // Scroll direction detection for hide/show header
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    // Show header at top always
    if (currentScrollY < 10) {
      setHeaderVisible(true);
      setScrolled(false);
      setLastScrollY(currentScrollY);
      return;
    }

    // Hide on scroll down, show on scroll up
    if (currentScrollY > lastScrollY) {
      setHeaderVisible(false);
    } else {
      setHeaderVisible(true);
    }

    setScrolled(currentScrollY > 50);
    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Close dropdowns when clicking outside on desktop
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        // Could add state to close all hovers if needed
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Handle navigation with smooth scroll for anchor links
  const handleNavigate = useCallback((href: string, id?: string) => {
    // Close mobile menu first
    setMobileOpen(false);

    // If same page with anchor ID, smooth scroll
    if (id && pathname === href) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        // Update URL hash without jump
        window.history.pushState(null, "", `#${id}`);
      }
      return;
    }

    // Normal navigation
    router.push(href);
  }, [pathname, router]);

  // Handle hash navigation on initial load
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: headerVisible ? 0 : -120 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? "bg-white/95 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.08)]"
          : "bg-white"
          }`}
      >
        {/* Top micro-bar - hidden on mobile for space */}
        <motion.div
          className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white text-xs py-1.5 px-4 text-center hidden md:flex items-center justify-center gap-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="flex items-center gap-1.5">
            <motion.span
              className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />

            Booking Available 24/7
          </span>
          <span className="opacity-40">|</span>
          <span>    <span className="text-blue-500"> 📅 </span>
            Mon–Sun: 10:00 AM – 10:00 PM</span>
          <span className="opacity-40">|</span>
          <motion.a
            href="tel:+917982799147"
            className="hover:text-green-300 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-green-500">☎️</span> +91-7982799147
          </motion.a>
        </motion.div>

        {/* Main nav */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.a
              href="/"
              className="flex items-center gap-2.5 group flex-shrink-0"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => {
                e.preventDefault();
                handleNavigate("/", "home");
              }}
            >
              <Image src="/logo.png" alt="Logo" width={60} height={60} />
              <div className="leading-tight">
                <span className="block text-[15px] font-bold text-gray-900 tracking-tight group-hover:text-blue-600 transition-colors">
                  SKM Physiotherapy
                </span>
                <span className="block text-[10px] text-indigo-500 font-medium tracking-widest uppercase">
                  Say no to pain
                </span>
              </div>
            </motion.a>

            {/* Desktop Nav - Using Recursive Component */}
            <nav ref={dropdownRef} className="hidden lg:flex items-center gap-0.5">
              {NAV_LINKS.map((link) => (
                <DesktopNavItem
                  key={`${link.label}-${link.href}-${link.id}`}
                  item={link}
                  depth={0}
                  pathname={pathname}
                  onNavigate={handleNavigate}
                />
              ))}
            </nav>

            {/* CTA Buttons - Desktop */}
            <div className="hidden lg:flex items-center gap-2">
              <motion.a
                href="tel:+917982799147"
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-blue-600 border-2 border-blue-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-150"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call Now
              </motion.a>

              <motion.a
                href="https://wa.me/917982799147"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-green-500 rounded-xl hover:bg-green-600 shadow-lg shadow-green-200 hover:shadow-green-300 transition-all duration-150"
                whileHover={{ scale: 1.03, boxShadow: "0 10px 25px -5px rgba(34,197,94,0.4)" }}
                whileTap={{ scale: 0.97 }}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </motion.a>
            </div>

            {/* Mobile hamburger */}
            <motion.button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              whileTap={{ scale: 0.9 }}
            >
              <div className="w-5 flex flex-col gap-1.5">
                <motion.span
                  className={`block h-0.5 bg-gray-700 rounded-full transition-all duration-300 origin-center ${mobileOpen ? "rotate-45 translate-y-2" : ""
                    }`}
                  animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 8 : 0 }}
                />
                <motion.span
                  className={`block h-0.5 bg-gray-700 rounded-full transition-all duration-300 ${mobileOpen ? "opacity-0" : ""
                    }`}
                  animate={{ opacity: mobileOpen ? 0 : 1, scaleX: mobileOpen ? 0 : 1 }}
                />
                <motion.span
                  className={`block h-0.5 bg-gray-700 rounded-full transition-all duration-300 origin-center ${mobileOpen ? "-rotate-45 -translate-y-2" : ""
                    }`}
                  animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -8 : 0 }}
                />
              </div>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu - Using Recursive Component with AnimatePresence */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
            >
              <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
                {NAV_LINKS.map((link) => (
                  <MobileNavItem
                    key={`${link.label}-${link.href}-${link.id}`}
                    item={link}
                    depth={0}
                    pathname={pathname}
                    onNavigate={handleNavigate}
                    onClose={() => setMobileOpen(false)}
                  />
                ))}

                {/* Mobile CTAs */}
                <div className="pt-3 pb-2 space-y-2 border-t border-gray-100 mt-2">
                  <div className="flex gap-2">
                    <motion.a
                      href="tel:+917982799147"
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-sm font-semibold text-blue-600 border-2 border-blue-200 rounded-xl hover:bg-blue-50 transition-colors"
                      whileTap={{ scale: 0.98 }}
                    >
                      📞 Call Now
                    </motion.a>
                    <motion.a
                      href="https://wa.me/917982799147"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-sm font-semibold text-white bg-green-500 rounded-xl hover:bg-green-600 transition-colors"
                      whileTap={{ scale: 0.98 }}
                    >
                      💬 WhatsApp
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Spacer for sticky header - responsive heights */}
      <div className="h-[80px] md:h-[100px] bg-gray-700 transition-all duration-300" />
    </>
  );
}
