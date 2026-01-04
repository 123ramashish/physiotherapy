'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { 
  FaCalendarAlt, FaUserMd, FaClock, FaArrowRight, FaTag, 
  FaSearch, FaShareAlt, FaBookOpen, FaComment, FaFilter,
  FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaYoutube
} from 'react-icons/fa';
import { MdHealthAndSafety, MdTrendingUp, MdEmail } from 'react-icons/md';
import { HiMenu, HiX } from 'react-icons/hi';

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Handle scroll to top visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  const filteredPosts = activeCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category.toLowerCase() === activeCategory);

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Health & Wellness Insights Blog",
            "description": "Expert articles, research updates, and practical tips from physiotherapy and chiropractic specialists",
            "publisher": {
              "@type": "Organization",
              "name": "Health & Wellness Clinic",
              "logo": {
                "@type": "ImageObject",
                "url": "/logo.png"
              }
            }
          })
        }}
      />

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-gradient-to-r from-rose-600 to-amber-500 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all duration-300"
          aria-label="Scroll to top"
        >
          <FaArrowRight className="rotate-270" />
        </button>
      )}

      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-rose-600 to-amber-500 rounded-lg flex items-center justify-center">
                  <MdHealthAndSafety className="text-white text-xl" />
                </div>
                <span className="text-xl font-bold text-gray-800">
                  Health<span className="text-rose-600">Blog</span>
                </span>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-8">
                <Link href="/" className="text-gray-700 hover:text-rose-600 font-medium transition-colors">
                  Home
                </Link>
                <Link href="/blog" className="text-rose-600 font-medium border-b-2 border-rose-600">
                  Blog
                </Link>
                <Link href="/therapists" className="text-gray-700 hover:text-rose-600 font-medium transition-colors">
                  Therapists
                </Link>
                <Link href="/services" className="text-gray-700 hover:text-rose-600 font-medium transition-colors">
                  Services
                </Link>
                <Link href="/contact" className="text-gray-700 hover:text-rose-600 font-medium transition-colors">
                  Contact
                </Link>
              </nav>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden text-gray-700 hover:text-rose-600"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
              </button>
            </div>

            {/* Mobile Navigation */}
            {isMobileMenuOpen && (
              <div className="md:hidden py-4 border-t border-gray-100">
                <nav className="flex flex-col space-y-4">
                  <Link href="/" className="text-gray-700 hover:text-rose-600 font-medium py-2">
                    Home
                  </Link>
                  <Link href="/blog" className="text-rose-600 font-medium py-2">
                    Blog
                  </Link>
                  <Link href="/therapists" className="text-gray-700 hover:text-rose-600 font-medium py-2">
                    Therapists
                  </Link>
                  <Link href="/services" className="text-gray-700 hover:text-rose-600 font-medium py-2">
                    Services
                  </Link>
                  <Link href="/contact" className="text-gray-700 hover:text-rose-600 font-medium py-2">
                    Contact
                  </Link>
                </nav>
              </div>
            )}
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative py-12 md:py-20 lg:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-white to-amber-50 opacity-90"></div>
          <div className="absolute -top-20 -right-20 w-64 h-64 md:w-80 md:h-80 bg-rose-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 md:w-80 md:h-80 bg-amber-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
          
          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              {/* Breadcrumb */}
              <nav className="flex justify-center mb-6" aria-label="Breadcrumb">
                <ol className="flex items-center space-x-2 text-sm text-gray-600">
                  <li>
                    <Link href="/" className="hover:text-rose-600 transition-colors">
                      Home
                    </Link>
                  </li>
                  <li className="flex items-center">
                    <span className="mx-2">/</span>
                    <span className="text-rose-600 font-medium">Blog</span>
                  </li>
                </ol>
              </nav>

              <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-rose-100 to-amber-100 rounded-full mb-6">
                <FaBookOpen className="text-3xl text-rose-600" />
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-800 mb-6 leading-tight">
                Health & Wellness <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-amber-500">Insights</span>
              </h1>
              <p className="text-base md:text-lg lg:text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
                Expert articles, research updates, and practical tips from our physiotherapy and chiropractic specialists. 
                Your guide to better health, recovery, and prevention.
              </p>
              
              {/* Search Bar */}
              <div className="max-w-2xl mx-auto mb-12">
                <form onSubmit={handleSearch} className="relative group">
                  <input 
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search articles on pain relief, exercises, wellness tips..."
                    className="w-full px-4 md:px-6 py-3 md:py-4 pl-12 md:pl-14 bg-white border-2 border-gray-200 rounded-xl md:rounded-2xl focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-200 shadow-lg transition-all duration-300 text-sm md:text-base"
                    aria-label="Search articles"
                  />
                  <FaSearch className="absolute left-4 md:left-5 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg md:text-xl" />
                  <button 
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 md:px-6 py-2 bg-gradient-to-r from-rose-600 to-amber-500 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300 text-sm md:text-base"
                  >
                    Search
                  </button>
                </form>
              </div>

              {/* Category Filters - Mobile */}
              <div className="md:hidden overflow-x-auto pb-4">
                <div className="flex space-x-2 min-w-max">
                  <button
                    onClick={() => setActiveCategory('all')}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      activeCategory === 'all'
                        ? 'bg-gradient-to-r from-rose-600 to-amber-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    All Articles
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.slug}
                      onClick={() => setActiveCategory(cat.slug)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        activeCategory === cat.slug
                          ? 'bg-gradient-to-r from-rose-600 to-amber-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Posts */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 flex items-center gap-3 mb-4 sm:mb-0">
                <MdTrendingUp className="text-rose-600" />
                Featured <span className="text-rose-600">Articles</span>
              </h2>
              <Link 
                href="/blog/category/featured"
                className="text-rose-600 hover:text-rose-700 font-medium flex items-center gap-2 group"
                aria-label="View all featured articles"
              >
                View All
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-16">
              {featuredPosts.map((post, index) => (
                <article 
                  key={index}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
                  itemScope
                  itemType="https://schema.org/BlogPosting"
                >
                  <meta itemProp="datePublished" content={post.publishedDate} />
                  <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-amber-500 opacity-60"></div>
                    <div className="absolute inset-0 flex items-center justify-center p-4">
                      <div className="text-center p-4 md:p-6 text-white">
                        <div className="inline-flex items-center gap-2 px-3 py-1 md:px-4 md:py-2 bg-white/20 backdrop-blur-sm rounded-full mb-3 md:mb-4">
                          <FaTag className="text-xs md:text-sm" />
                          <span className="font-medium text-xs md:text-sm">{post.category}</span>
                        </div>
                        <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4" itemProp="headline">
                          {post.title}
                        </h3>
                        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 text-xs md:text-sm">
                          <span className="flex items-center gap-1 md:gap-2">
                            <FaUserMd />
                            <span itemProp="author">{post.author}</span>
                          </span>
                          <span className="flex items-center gap-1 md:gap-2">
                            <FaCalendarAlt />
                            <time dateTime={post.date}>{post.date}</time>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-3 right-3 md:top-4 md:right-4 px-2 py-1 md:px-3 md:py-1 bg-gradient-to-r from-rose-600 to-amber-500 text-white text-xs md:text-sm font-bold rounded-full">
                      Featured
                    </div>
                  </div>
                  <div className="p-4 md:p-6">
                    <p className="text-gray-600 text-sm md:text-base mb-4 md:mb-6" itemProp="description">
                      {post.excerpt}
                    </p>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <span className="flex items-center gap-2 text-gray-500 text-sm">
                        <FaClock />
                        {post.readTime}
                      </span>
                      <Link 
                        href={`/blog/${post.slug}`}
                        className="group inline-flex items-center gap-2 px-4 py-2 md:px-6 md:py-2 bg-gradient-to-r from-rose-600 to-amber-500 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300 text-sm md:text-base"
                        aria-label={`Read more about ${post.title}`}
                      >
                        Read More
                        <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Main Blog Grid */}
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
              {/* Blog Posts */}
              <div className="lg:col-span-2">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 md:mb-10 gap-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                    Latest <span className="text-rose-600">Articles</span>
                  </h2>
                  <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    {/* Category Filters - Desktop */}
                    <div className="hidden md:flex items-center gap-2">
                      <FaFilter className="text-gray-500" />
                      <select 
                        value={activeCategory}
                        onChange={(e) => setActiveCategory(e.target.value)}
                        className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                      >
                        <option value="all">All Categories</option>
                        {categories.map((cat) => (
                          <option key={cat.slug} value={cat.slug}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <select className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500">
                      <option>Latest First</option>
                      <option>Most Popular</option>
                      <option>Trending</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-6 md:space-y-8">
                  {filteredPosts.map((post, index) => (
                    <article 
                      key={index}
                      className="group bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 border border-gray-100"
                      itemScope
                      itemType="https://schema.org/BlogPosting"
                    >
                      <div className="md:flex">
                        {/* Post Image */}
                        <div className="md:w-2/5 relative h-48 md:h-auto min-h-[200px]">
                          <div className="absolute inset-0 bg-gradient-to-r from-rose-100 to-amber-100 flex items-center justify-center">
                            <div className="text-center p-4">
                              <div className="text-3xl md:text-4xl font-bold text-rose-800 mb-2">{post.date.split(' ')[0]}</div>
                              <div className="text-sm text-gray-600">{post.date.split(' ')[1]}</div>
                            </div>
                          </div>
                          <div className="absolute top-3 left-3 md:top-4 md:left-4">
                            <span className="px-2 py-1 md:px-3 md:py-1 bg-gradient-to-r from-rose-600 to-amber-500 text-white text-xs font-bold rounded-full">
                              {post.category}
                            </span>
                          </div>
                        </div>
                        
                        {/* Post Content */}
                        <div className="md:w-3/5 p-4 md:p-6">
                          <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-3">
                            <div className="flex items-center gap-1 md:gap-2 text-xs md:text-sm text-gray-500">
                              <FaUserMd />
                              <span itemProp="author">{post.author}</span>
                            </div>
                            <div className="flex items-center gap-1 md:gap-2 text-xs md:text-sm text-gray-500">
                              <FaClock />
                              <span itemProp="timeRequired">{post.readTime}</span>
                            </div>
                          </div>
                          
                          <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 md:mb-3 group-hover:text-rose-600 transition-colors" itemProp="headline">
                            <Link href={`/blog/${post.slug}`} itemProp="url">
                              {post.title}
                            </Link>
                          </h3>
                          
                          <p className="text-gray-600 text-sm md:text-base mb-3 md:mb-4 line-clamp-2 md:line-clamp-3" itemProp="description">
                            {post.excerpt}
                          </p>
                          
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-3 md:gap-4">
                              <button 
                                className="flex items-center gap-1 md:gap-2 text-gray-500 hover:text-rose-600 transition-colors text-xs md:text-sm"
                                aria-label={`${post.comments} comments`}
                              >
                                <FaComment />
                                <span>{post.comments} Comments</span>
                              </button>
                              <button 
                                className="flex items-center gap-1 md:gap-2 text-gray-500 hover:text-amber-600 transition-colors text-xs md:text-sm"
                                aria-label="Share article"
                              >
                                <FaShareAlt />
                                <span>Share</span>
                              </button>
                            </div>
                            <Link 
                              href={`/blog/${post.slug}`}
                              className="flex items-center gap-1 md:gap-2 text-rose-600 hover:text-rose-700 font-medium group text-sm md:text-base"
                              aria-label={`Read article: ${post.title}`}
                            >
                              Read Article
                              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
                
                {/* Pagination */}
                <div className="mt-8 md:mt-12 flex justify-center">
                  <nav className="flex items-center gap-1 md:gap-2" aria-label="Pagination">
                    <button
                      className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-lg bg-white text-gray-700 hover:bg-rose-50 hover:text-rose-600 border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled
                      aria-label="Previous page"
                    >
                      <FaArrowRight className="rotate-180" />
                    </button>
                    {[1, 2, 3, 4, 5].map((page) => (
                      <button
                        key={page}
                        className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-lg font-medium transition-all duration-300 text-sm md:text-base ${
                          page === 1 
                            ? 'bg-gradient-to-r from-rose-600 to-amber-500 text-white shadow-lg' 
                            : 'bg-white text-gray-700 hover:bg-rose-50 hover:text-rose-600 border border-gray-200'
                        }`}
                        aria-label={`Go to page ${page}`}
                        aria-current={page === 1 ? 'page' : undefined}
                      >
                        {page}
                      </button>
                    ))}
                    <button 
                      className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-lg bg-white text-gray-700 hover:bg-rose-50 hover:text-rose-600 border border-gray-200"
                      aria-label="Next page"
                    >
                      <FaArrowRight />
                    </button>
                  </nav>
                </div>
              </div>
              
              {/* Sidebar */}
              <div className="lg:col-span-1">
                {/* Categories */}
                <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6 mb-6 md:mb-8 sticky top-6">
                  <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-6 flex items-center gap-2">
                    <FaTag className="text-rose-600" />
                    Categories
                  </h3>
                  <div className="space-y-2 md:space-y-3">
                    {categories.map((category, index) => (
                      <Link 
                        key={index}
                        href={`/blog/category/${category.slug}`}
                        className="flex items-center justify-between p-2 md:p-3 rounded-lg hover:bg-rose-50 group transition-all duration-300"
                        aria-label={`Browse ${category.name} articles`}
                      >
                        <div className="flex items-center gap-2 md:gap-3">
                          <div className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${category.color}`}></div>
                          <span className="font-medium text-gray-700 group-hover:text-rose-600 text-sm md:text-base">
                            {category.name}
                          </span>
                        </div>
                        <span className="px-1.5 py-0.5 md:px-2 md:py-1 bg-gray-100 text-gray-600 text-xs md:text-sm rounded-full group-hover:bg-rose-100 group-hover:text-rose-600">
                          {category.count}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
                
                {/* Popular Posts */}
                <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6 mb-6 md:mb-8">
                  <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-6 flex items-center gap-2">
                    <MdTrendingUp className="text-rose-600" />
                    Popular This Week
                  </h3>
                  <div className="space-y-4 md:space-y-6">
                    {popularPosts.map((post, index) => (
                      <div key={index} className="flex items-center gap-3 md:gap-4 group cursor-pointer">
                        <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-lg md:rounded-xl bg-gradient-to-r from-rose-100 to-amber-100 flex items-center justify-center text-rose-600 font-bold text-sm md:text-lg">
                          0{index + 1}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 group-hover:text-rose-600 transition-colors line-clamp-2 text-sm md:text-base">
                            <Link href={`/blog/${post.slug}`}>
                              {post.title}
                            </Link>
                          </h4>
                          <div className="flex items-center gap-2 mt-1 text-xs md:text-sm text-gray-500">
                            <time dateTime={post.date}>{post.date}</time>
                            <span>•</span>
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Newsletter */}
                <div className="bg-gradient-to-r from-rose-600 to-amber-500 rounded-xl md:rounded-2xl shadow-xl p-4 md:p-6 text-white">
                  <div className="text-center mb-4 md:mb-6">
                    <MdEmail className="text-3xl md:text-4xl mx-auto mb-3 md:mb-4" />
                    <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2">Stay Updated</h3>
                    <p className="text-rose-100 text-sm md:text-base">Get the latest health tips directly to your inbox</p>
                  </div>
                  <form className="space-y-3 md:space-y-4">
                    <input 
                      type="email"
                      placeholder="Your email address"
                      required
                      className="w-full px-3 py-2 md:px-4 md:py-3 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-rose-100 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm md:text-base"
                      aria-label="Email for newsletter subscription"
                    />
                    <button 
                      type="submit"
                      className="w-full py-2 md:py-3 bg-white text-rose-600 font-bold rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1 shadow-lg text-sm md:text-base"
                    >
                      Subscribe Now
                    </button>
                  </form>
                  <p className="text-xs text-rose-200 text-center mt-3 md:mt-4">
                    No spam. Unsubscribe anytime.
                  </p>
                </div>

                {/* Social Media */}
                <div className="mt-6 md:mt-8">
                  <h4 className="text-lg font-bold text-gray-800 mb-4">Follow Us</h4>
                  <div className="flex gap-3">
                    {[
                      { icon: FaFacebookF, label: 'Facebook' },
                      { icon: FaTwitter, label: 'Twitter' },
                      { icon: FaLinkedinIn, label: 'LinkedIn' },
                      { icon: FaInstagram, label: 'Instagram' },
                      { icon: FaYoutube, label: 'YouTube' }
                    ].map((social, index) => (
                      <a
                        key={index}
                        href="#"
                        className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-rose-100 hover:text-rose-600 transition-all duration-300"
                        aria-label={`Follow on ${social.label}`}
                      >
                        <social.icon />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-20 lg:py-24">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-gradient-to-r from-rose-50 to-amber-50 rounded-xl md:rounded-2xl p-6 md:p-8 lg:p-12 shadow-xl">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 md:mb-6">
                  Have Specific <span className="text-rose-600">Health Questions</span>?
                </h2>
                <p className="text-gray-600 text-base md:text-lg mb-6 md:mb-8 max-w-2xl mx-auto">
                  Our expert therapists are available to answer your questions and provide personalized advice.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6">
                  <Link 
                    href="/contact" 
                    className="group px-6 py-3 md:px-10 md:py-4 bg-gradient-to-r from-rose-600 to-amber-500 text-white font-bold rounded-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2 md:gap-3 text-sm md:text-base"
                    aria-label="Contact our experts"
                  >
                    Ask Our Experts
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link 
                    href="/therapists" 
                    className="px-6 py-3 md:px-10 md:py-4 bg-white border-2 border-rose-600 text-rose-600 font-bold rounded-lg hover:bg-rose-50 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2 md:gap-3 text-sm md:text-base"
                    aria-label="Meet our therapy team"
                  >
                    <FaUserMd />
                    Meet Our Team
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-8 md:py-12">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-rose-600 to-amber-500 rounded-lg flex items-center justify-center">
                    <MdHealthAndSafety className="text-white text-xl" />
                  </div>
                  <span className="text-xl font-bold">
                    Health<span className="text-rose-400">Blog</span>
                  </span>
                </div>
                <p className="text-gray-400 text-sm">
                  Expert health insights for better living. Trusted by thousands for reliable wellness information.
                </p>
              </div>
              
              <div>
                <h4 className="font-bold text-lg mb-4">Quick Links</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                  <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
                  <li><Link href="/therapists" className="hover:text-white transition-colors">Our Team</Link></li>
                  <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-bold text-lg mb-4">Resources</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                  <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
                  <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                  <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-bold text-lg mb-4">Contact Info</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>123 Health Street, Wellness City</li>
                  <li>contact@healthblog.com</li>
                  <li>+1 (555) 123-4567</li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
              <p>&copy; {new Date().getFullYear()} HealthBlog. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

// Data Arrays
const featuredPosts = [
  {
    title: "The Complete Guide to Preventing Sports Injuries",
    excerpt: "Learn essential techniques and exercises to prevent common sports injuries and maintain peak physical performance throughout your athletic journey.",
    category: "Sports Therapy",
    author: "Dr. Sarah Johnson",
    date: "Mar 15, 2024",
    publishedDate: "2024-03-15",
    readTime: "8 min read",
    slug: "sports-injuries-prevention-guide",
    comments: 24
  },
  {
    title: "Chiropractic Care for Chronic Back Pain: What You Need to Know",
    excerpt: "Discover how modern chiropractic techniques can provide lasting relief from chronic back pain without invasive procedures or medications.",
    category: "Chiropractic",
    author: "Michael Chen",
    date: "Mar 12, 2024",
    publishedDate: "2024-03-12",
    readTime: "6 min read",
    slug: "chiropractic-back-pain-relief",
    comments: 18
  }
];

const blogPosts = [
  {
    title: "Posture Correction: 5 Simple Exercises for Office Workers",
    excerpt: "Daily exercises you can do at your desk to improve posture, reduce back pain, and prevent long-term spinal issues.",
    category: "Ergonomics",
    author: "Elena Rodriguez",
    date: "Mar 10, 2024",
    publishedDate: "2024-03-10",
    readTime: "5 min read",
    slug: "posture-exercises-office-workers",
    comments: 12
  },
  {
    title: "Understanding Sciatica: Symptoms, Causes, and Treatment Options",
    excerpt: "A comprehensive look at sciatic nerve pain, including diagnosis methods and effective physiotherapy treatments for lasting relief.",
    category: "Pain Management",
    author: "Dr. Sarah Johnson",
    date: "Mar 8, 2024",
    publishedDate: "2024-03-08",
    readTime: "7 min read",
    slug: "sciatica-symptoms-treatment",
    comments: 21
  },
  {
    title: "The Role of Nutrition in Injury Recovery and Rehabilitation",
    excerpt: "How proper nutrition accelerates healing, reduces inflammation, and supports muscle repair during physiotherapy treatment.",
    category: "Wellness",
    author: "Michael Chen",
    date: "Mar 5, 2024",
    publishedDate: "2024-03-05",
    readTime: "6 min read",
    slug: "nutrition-injury-recovery",
    comments: 15
  },
  {
    title: "Winter Sports Injury Prevention: A Physiotherapist's Guide",
    excerpt: "Essential tips and pre-season conditioning exercises to stay safe and injury-free during winter sports activities.",
    category: "Sports Therapy",
    author: "Dr. Sarah Johnson",
    date: "Mar 3, 2024",
    publishedDate: "2024-03-03",
    readTime: "9 min read",
    slug: "winter-sports-injury-prevention",
    comments: 8
  },
  {
    title: "Manual Therapy vs. Instrument-Assisted Therapy: Which is Right for You?",
    excerpt: "Comparing different physiotherapy techniques to help you understand which treatment approach best suits your recovery needs.",
    category: "Treatment Methods",
    author: "Elena Rodriguez",
    date: "Feb 28, 2024",
    publishedDate: "2024-02-28",
    readTime: "7 min read",
    slug: "manual-vs-instrument-therapy",
    comments: 14
  }
];

const categories = [
  { name: "Sports Therapy", slug: "sports-therapy", count: 12, color: "bg-rose-500" },
  { name: "Chiropractic", slug: "chiropractic", count: 8, color: "bg-amber-500" },
  { name: "Pain Management", slug: "pain-management", count: 15, color: "bg-purple-500" },
  { name: "Rehabilitation", slug: "rehabilitation", count: 10, color: "bg-green-500" },
  { name: "Wellness Tips", slug: "wellness-tips", count: 18, color: "bg-blue-500" },
  { name: "Ergonomics", slug: "ergonomics", count: 6, color: "bg-red-500" },
  { name: "Treatment Methods", slug: "treatment-methods", count: 9, color: "bg-indigo-500" }
];

const popularPosts = [
  {
    title: "Top 10 Stretches for Lower Back Pain Relief",
    date: "Feb 25, 2024",
    readTime: "4 min read",
    slug: "stretches-lower-back-pain"
  },
  {
    title: "How Often Should You Visit a Chiropractor?",
    date: "Feb 20, 2024",
    readTime: "5 min read",
    slug: "chiropractor-visit-frequency"
  },
  {
    title: "The Connection Between Stress and Muscle Tension",
    date: "Feb 18, 2024",
    readTime: "6 min read",
    slug: "stress-muscle-tension-connection"
  },
  {
    title: "Choosing the Right Physiotherapist: A Step-by-Step Guide",
    date: "Feb 15, 2024",
    readTime: "7 min read",
    slug: "choosing-right-physiotherapist"
  }
];