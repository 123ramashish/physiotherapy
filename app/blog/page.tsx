'use client';
import Link from 'next/link';
import Image from 'next/image';
import { FaCalendarAlt, FaUserMd, FaClock, FaArrowRight, FaTag, FaSearch, FaShareAlt, FaBookOpen, FaComment } from 'react-icons/fa';
import { MdHealthAndSafety, MdTrendingUp } from 'react-icons/md';


export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-teal-50 opacity-90"></div>
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-blue-100 to-teal-100 rounded-full mb-6">
              <FaBookOpen className="text-3xl text-blue-600" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight">
              Health & Wellness <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">Insights</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Expert articles, research updates, and practical tips from our physiotherapy and chiropractic specialists. 
              Your guide to better health, recovery, and prevention.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="relative group">
                <input 
                  type="text" 
                  placeholder="Search articles on pain relief, exercises, wellness tips..."
                  className="w-full px-6 py-4 pl-14 bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 shadow-lg transition-all duration-300"
                />
                <FaSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-gradient-to-r from-blue-600 to-teal-500 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 flex items-center gap-3">
              <MdTrendingUp className="text-blue-600" />
              Featured <span className="text-blue-600">Articles</span>
            </h2>
            <Link 
              href="/blog/category/featured"
              className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2 group"
            >
              View All
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {featuredPosts.map((post, index) => (
              <article 
                key={index}
                className="group bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className="relative h-64 md:h-72 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-teal-500 opacity-60"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-6 text-white">
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-4">
                        <FaTag />
                        <span className="font-medium">{post.category}</span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold mb-4">{post.title}</h3>
                      <div className="flex items-center justify-center gap-4 text-sm">
                        <span className="flex items-center gap-2">
                          <FaUserMd />
                          {post.author}
                        </span>
                        <span className="flex items-center gap-2">
                          <FaCalendarAlt />
                          {post.date}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-blue-600 to-teal-500 text-white text-sm font-bold rounded-full">
                    Featured
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-6">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-gray-500">
                      <FaClock />
                      {post.readTime}
                    </span>
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="group inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-teal-500 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300"
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Blog Posts */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-3xl font-bold text-gray-800">Latest <span className="text-blue-600">Articles</span></h2>
                <div className="flex gap-4">
                  <select className="px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option>Latest First</option>
                    <option>Most Popular</option>
                    <option>Trending</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-8">
                {blogPosts.map((post, index) => (
                  <article 
                    key={index}
                    className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 border border-gray-100"
                  >
                    <div className="md:flex">
                      {/* Post Image */}
                      <div className="md:w-2/5 relative h-48 md:h-auto">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-teal-100 flex items-center justify-center">
                          <div className="text-center p-4">
                            <div className="text-4xl font-bold text-blue-800 mb-2">{post.date.split(' ')[0]}</div>
                            <div className="text-sm text-gray-600">{post.date.split(' ')[1]}</div>
                          </div>
                        </div>
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-gradient-to-r from-blue-600 to-teal-500 text-white text-xs font-bold rounded-full">
                            {post.category}
                          </span>
                        </div>
                      </div>
                      
                      {/* Post Content */}
                      <div className="md:w-3/5 p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <FaUserMd />
                            <span>{post.author}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <FaClock />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                        
                        <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                          <Link href={`/blog/${post.slug}`}>
                            {post.title}
                          </Link>
                        </h3>
                        
                        <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <button className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors">
                              <FaComment />
                              <span>{post.comments} Comments</span>
                            </button>
                            <button className="flex items-center gap-2 text-gray-500 hover:text-teal-600 transition-colors">
                              <FaShareAlt />
                              <span>Share</span>
                            </button>
                          </div>
                          <Link 
                            href={`/blog/${post.slug}`}
                            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium group"
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
              <div className="mt-12 flex justify-center">
                <nav className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((page) => (
                    <button
                      key={page}
                      className={`w-10 h-10 flex items-center justify-center rounded-lg font-medium transition-all duration-300 ${
                        page === 1 
                          ? 'bg-gradient-to-r from-blue-600 to-teal-500 text-white shadow-lg' 
                          : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 border border-gray-200'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 border border-gray-200">
                    <FaArrowRight />
                  </button>
                </nav>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Categories */}
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 sticky top-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <FaTag className="text-blue-600" />
                  Categories
                </h3>
                <div className="space-y-3">
                  {categories.map((category, index) => (
                    <Link 
                      key={index}
                      href={`/blog/category/${category.slug}`}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-blue-50 group transition-all duration-300"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                        <span className="font-medium text-gray-700 group-hover:text-blue-600">
                          {category.name}
                        </span>
                      </div>
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded-full group-hover:bg-blue-100 group-hover:text-blue-600">
                        {category.count}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
              
              {/* Popular Posts */}
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <MdTrendingUp className="text-blue-600" />
                  Popular This Week
                </h3>
                <div className="space-y-6">
                  {popularPosts.map((post, index) => (
                    <div key={index} className="flex items-center gap-4 group cursor-pointer">
                      <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-r from-blue-100 to-teal-100 flex items-center justify-center text-blue-600 font-bold text-lg">
                        0{index + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                          <Link href={`/blog/${post.slug}`}>
                            {post.title}
                          </Link>
                        </h4>
                        <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
                          <span>{post.date}</span>
                          <span>•</span>
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Newsletter */}
              <div className="bg-gradient-to-r from-blue-600 to-teal-500 rounded-2xl shadow-xl p-6 text-white">
                <div className="text-center mb-6">
                  <MdHealthAndSafety className="text-4xl mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Stay Updated</h3>
                  <p className="text-blue-100">Get the latest health tips directly to your inbox</p>
                </div>
                <form className="space-y-4">
                  <input 
                    type="email" 
                    placeholder="Your email address"
                    className="w-full px-4 py-3 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-blue-100 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                  <button 
                    type="submit"
                    className="w-full py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
                  >
                    Subscribe Now
                  </button>
                </form>
                <p className="text-xs text-blue-200 text-center mt-4">
                  No spam. Unsubscribe anytime.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-2xl p-8 md:p-12 shadow-xl">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Have Specific <span className="text-blue-600">Health Questions</span>?
              </h2>
              <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
                Our expert therapists are available to answer your questions and provide personalized advice.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <Link 
                  href="/contact" 
                  className="group px-10 py-4 bg-gradient-to-r from-blue-600 to-teal-500 text-white font-bold rounded-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-3"
                >
                  Ask Our Experts
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  href="/therapists" 
                  className="px-10 py-4 bg-white border-2 border-blue-600 text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-3"
                >
                  <FaUserMd />
                  Meet Our Team
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
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
    readTime: "7 min read",
    slug: "manual-vs-instrument-therapy",
    comments: 14
  }
];

const categories = [
  { name: "Sports Therapy", slug: "sports-therapy", count: 12, color: "bg-blue-500" },
  { name: "Chiropractic", slug: "chiropractic", count: 8, color: "bg-teal-500" },
  { name: "Pain Management", slug: "pain-management", count: 15, color: "bg-purple-500" },
  { name: "Rehabilitation", slug: "rehabilitation", count: 10, color: "bg-green-500" },
  { name: "Wellness Tips", slug: "wellness-tips", count: 18, color: "bg-yellow-500" },
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