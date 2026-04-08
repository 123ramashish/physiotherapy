"use client";

import { useState, useEffect, useRef } from "react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "#",
    dropdown: [
      { label: "Back Pain", href: "/services/back-pain", icon: "🦴" },
      { label: "Neck Pain", href: "/services/neck-pain", icon: "🩺" },
      { label: "Sports Injury", href: "/services/sports-injury", icon: "⚡" },
      { label: "Post Surgery Rehab", href: "/services/post-surgery-rehab", icon: "🏥" },
    ],
  },
  {
    label: "Branches",
    href: "#",
    dropdown: [
      { label: "Gurgaon", href: "/branches/gurgaon", icon: "📍" },
      { label: "Delhi", href: "/branches/delhi", icon: "📍" },
      { label: "Noida", href: "/branches/noida", icon: "📍" },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Franchise", href: "/franchise" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.08)]"
            : "bg-white"
        }`}
      >
        {/* Top micro-bar */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white text-xs py-1.5 px-4 text-center hidden md:flex items-center justify-center gap-6">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse inline-block" />
            AI Booking Available 24/7
          </span>
          <span className="opacity-40">|</span>
          <span>Mon–Sat: 9:00 AM – 8:00 PM &nbsp;|&nbsp; Sun: 10:00 AM – 2:00 PM</span>
          <span className="opacity-40">|</span>
          <a href="tel:+919876543210" className="hover:text-green-300 transition-colors">
            📞 +91 98765 43210
          </a>
        </div>

        {/* Main nav */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2.5 group flex-shrink-0">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-200 group-hover:shadow-blue-300 transition-shadow">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-5 h-5 text-white"
                  stroke="currentColor"
                  strokeWidth="2.2"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                  <path d="M8 12h8M12 8v8" strokeLinecap="round" />
                </svg>
              </div>
              <div className="leading-tight">
                <span className="block text-[15px] font-bold text-gray-900 tracking-tight group-hover:text-blue-600 transition-colors">
                  SKM Physiotherapy
                </span>
                <span className="block text-[10px] text-indigo-500 font-medium tracking-widest uppercase">
                  Expert Care · Trusted Results
                </span>
              </div>
            </a>

            {/* Desktop Nav */}
            <nav
              ref={dropdownRef}
              className="hidden lg:flex items-center gap-0.5"
            >
              {NAV_LINKS.map((link) => (
                <div key={link.label} className="relative group">
                  {link.dropdown ? (
                    <button
                      onMouseEnter={() => setActiveDropdown(link.label)}
                      onMouseLeave={() => setActiveDropdown(null)}
                      className="flex items-center gap-1 px-3.5 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-150"
                    >
                      {link.label}
                      <svg
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          activeDropdown === link.label ? "rotate-180 text-blue-600" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  ) : (
                    <a
                      href={link.href}
                      className="flex items-center px-3.5 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-150"
                    >
                      {link.label}
                    </a>
                  )}

                  {/* Dropdown menu */}
                  {link.dropdown && (
                    <div
                      onMouseEnter={() => setActiveDropdown(link.label)}
                      onMouseLeave={() => setActiveDropdown(null)}
                      className={`absolute top-full left-1/2 -translate-x-1/2 mt-1 w-52 bg-white rounded-2xl shadow-xl shadow-gray-200/80 border border-gray-100 py-2 transition-all duration-200 origin-top ${
                        activeDropdown === link.label
                          ? "opacity-100 scale-100 pointer-events-auto"
                          : "opacity-0 scale-95 pointer-events-none"
                      }`}
                    >
                      {link.dropdown.map((item) => (
                        <a
                          key={item.label}
                          href={item.href}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-700 transition-all mx-1 rounded-xl group"
                        >
                          <span className="text-base">{item.icon}</span>
                          <span className="font-medium">{item.label}</span>
                          <svg
                            className="w-3.5 h-3.5 ml-auto opacity-0 group-hover:opacity-100 text-indigo-400 transition-opacity"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2.5"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-2">
              <a
                href="tel:+919876543210"
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-blue-600 border-2 border-blue-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-150"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call Now
              </a>

              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-green-500 rounded-xl hover:bg-green-600 shadow-lg shadow-green-200 hover:shadow-green-300 transition-all duration-150"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </a>

              <a
                href="/book-appointment"
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl hover:from-blue-600 hover:to-indigo-700 shadow-lg shadow-blue-200 hover:shadow-indigo-300 transition-all duration-150"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Book Appointment
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              <div className="w-5 flex flex-col gap-1.5">
                <span className={`block h-0.5 bg-gray-700 rounded-full transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
                <span className={`block h-0.5 bg-gray-700 rounded-full transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
                <span className={`block h-0.5 bg-gray-700 rounded-full transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden bg-white border-t border-gray-100 overflow-hidden transition-all duration-300 ease-in-out ${
            mobileOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {NAV_LINKS.map((link) => (
              <div key={link.label}>
                {link.dropdown ? (
                  <>
                    <button
                      onClick={() =>
                        setMobileExpanded(
                          mobileExpanded === link.label ? null : link.label
                        )
                      }
                      className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-gray-700 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      {link.label}
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${
                          mobileExpanded === link.label ? "rotate-180" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {mobileExpanded === link.label && (
                      <div className="pl-4 mt-1 space-y-1">
                        {link.dropdown.map((item) => (
                          <a
                            key={item.label}
                            href={item.href}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-colors"
                          >
                            <span>{item.icon}</span>
                            {item.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <a
                    href={link.href}
                    className="flex items-center px-4 py-3 text-sm font-semibold text-gray-700 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    {link.label}
                  </a>
                )}
              </div>
            ))}

            {/* Mobile CTAs */}
            <div className="pt-3 pb-2 space-y-2 border-t border-gray-100 mt-2">
              <div className="flex gap-2">
                <a
                  href="tel:+919876543210"
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-sm font-semibold text-blue-600 border-2 border-blue-200 rounded-xl hover:bg-blue-50 transition-colors"
                >
                  📞 Call Now
                </a>
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-sm font-semibold text-white bg-green-500 rounded-xl hover:bg-green-600 transition-colors"
                >
                  💬 WhatsApp
                </a>
              </div>
              <a
                href="/book-appointment"
                className="w-full flex items-center justify-center gap-1.5 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all"
              >
                📅 Book Appointment
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer for sticky header */}
      <div className="h-[100px] md:h-[104px]" />
    </>
  );
}