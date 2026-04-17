// 'use client';
// import { useState, useEffect, useCallback } from "react";

// // ─────────────────────────────────────────────
// //  Types & Interfaces
// // ─────────────────────────────────────────────

// interface Branch {
//   id: string;
//   label: string;
//   city: string;
// }

// interface Category {
//   slug: string;
//   name: string;
//   icon: string;
// }

// interface Post {
//   id: number;
//   title: string;
//   excerpt: string;
//   category: string;
//   branch: string;
//   author: string;
//   authorRole: string;
//   date: string;
//   readTime: string;
//   views: number;
//   comments: number;
//   featured: boolean;
//   tags: string[];
// }

// interface FormState {
//   title: string;
//   category: string;
//   branch: string;
//   tags: string;
//   excerpt: string;
// }

// // ─────────────────────────────────────────────
// //  Mock Data (replace with real API)
// // ─────────────────────────────────────────────

// const API_BASE = "https://api.yourdomain.com/v1";

// const BRANCHES: Branch[] = [
//   { id: "all", label: "All Branches", city: "" },
//   { id: "delhi", label: "Delhi HQ", city: "New Delhi" },
//   { id: "mumbai", label: "Mumbai Centre", city: "Mumbai" },
//   { id: "bengaluru", label: "Bengaluru Hub", city: "Bengaluru" },
//   { id: "hyderabad", label: "Hyderabad", city: "Hyderabad" },
//   { id: "chennai", label: "Chennai", city: "Chennai" },
// ];

// const CATEGORIES: Category[] = [
//   { slug: "all", name: "All Topics", icon: "✦" },
//   { slug: "sports-therapy", name: "Sports Therapy", icon: "⚡" },
//   { slug: "chiropractic", name: "Chiropractic", icon: "🦴" },
//   { slug: "pain-management", name: "Pain Management", icon: "💊" },
//   { slug: "rehabilitation", name: "Rehabilitation", icon: "🏃" },
//   { slug: "wellness", name: "Wellness", icon: "🌿" },
//   { slug: "ergonomics", name: "Ergonomics", icon: "💺" },
//   { slug: "treatment-methods", name: "Treatment", icon: "⚕" },
// ];

// const MOCK_POSTS: Post[] = [
//   { id:1, title:"Complete Guide to Preventing Sports Injuries", excerpt:"Essential techniques and exercises to prevent common sports injuries and maintain peak physical performance.", category:"sports-therapy", branch:"delhi", author:"Dr. Sarah Johnson", authorRole:"Senior Physiotherapist", date:"2024-03-15", readTime:"8 min", views:4201, comments:24, featured:true, tags:["prevention","sports","exercises"] },
//   { id:2, title:"Chiropractic Care for Chronic Back Pain", excerpt:"Modern chiropractic techniques that provide lasting relief from chronic back pain without invasive procedures.", category:"chiropractic", branch:"mumbai", author:"Dr. Michael Chen", authorRole:"Chief Chiropractor", date:"2024-03-12", readTime:"6 min", views:3850, comments:18, featured:true, tags:["back pain","chiropractic","relief"] },
//   { id:3, title:"Posture Correction: 5 Desk Exercises", excerpt:"Daily exercises at your desk to improve posture, reduce back pain, and prevent long-term spinal issues.", category:"ergonomics", branch:"bengaluru", author:"Elena Rodriguez", authorRole:"Ergonomics Specialist", date:"2024-03-10", readTime:"5 min", views:2980, comments:12, featured:false, tags:["posture","office","desk"] },
//   { id:4, title:"Understanding Sciatica: Symptoms & Treatment", excerpt:"A comprehensive look at sciatic nerve pain including diagnosis and physiotherapy treatments for lasting relief.", category:"pain-management", branch:"delhi", author:"Dr. Sarah Johnson", authorRole:"Senior Physiotherapist", date:"2024-03-08", readTime:"7 min", views:5100, comments:21, featured:false, tags:["sciatica","nerve pain","diagnosis"] },
//   { id:5, title:"Nutrition's Role in Injury Recovery", excerpt:"How proper nutrition accelerates healing, reduces inflammation, and supports muscle repair during rehabilitation.", category:"wellness", branch:"hyderabad", author:"Dr. Michael Chen", authorRole:"Chief Chiropractor", date:"2024-03-05", readTime:"6 min", views:2750, comments:15, featured:false, tags:["nutrition","healing","recovery"] },
//   { id:6, title:"Winter Sports Injury Prevention Guide", excerpt:"Pre-season conditioning exercises to stay safe and injury-free during winter sports and outdoor activities.", category:"sports-therapy", branch:"chennai", author:"Dr. Sarah Johnson", authorRole:"Senior Physiotherapist", date:"2024-03-03", readTime:"9 min", views:1890, comments:8, featured:false, tags:["winter sports","prevention","conditioning"] },
//   { id:7, title:"Manual vs. Instrument-Assisted Therapy", excerpt:"Comparing physiotherapy techniques to help you understand which approach best suits your recovery needs.", category:"treatment-methods", branch:"mumbai", author:"Elena Rodriguez", authorRole:"Ergonomics Specialist", date:"2024-02-28", readTime:"7 min", views:3200, comments:14, featured:false, tags:["manual therapy","treatment","comparison"] },
//   { id:8, title:"Rehabilitation After ACL Surgery", excerpt:"A structured step-by-step rehabilitation programme designed for safe and effective recovery after ACL reconstruction.", category:"rehabilitation", branch:"bengaluru", author:"Dr. Michael Chen", authorRole:"Chief Chiropractor", date:"2024-02-25", readTime:"10 min", views:4600, comments:31, featured:false, tags:["ACL","surgery","rehabilitation"] },
// ];

// // ─── Utilities ────────────────────────────────

// const fmt = (d: string): string => new Date(d).toLocaleDateString("en-IN", { day:"numeric", month:"short", year:"numeric" });
// const initials = (name: string): string => name.split(" ").map(n => n[0]).join("").slice(0,2);

// const colorFor = (slug: string): string => {
//   const colors: Record<string, string> = {
//     "sports-therapy": "#10b981",
//     "chiropractic": "#3b82f6",
//     "pain-management": "#6366f1",
//     "rehabilitation": "#0ea5e9",
//     "wellness": "#059669",
//     "ergonomics": "#4f46e5",
//     "treatment-methods": "#1d4ed8"
//   };
//   return colors[slug] ?? "#6366f1";
// };

// // ─── Theme Constants ─────────────────────────

// const G = {
//   primary: "linear-gradient(135deg,#1e3a5f 0%,#1a4731 100%)",
//   accent: "linear-gradient(135deg,#10b981 0%,#3b82f6 50%,#6366f1 100%)",
//   card: "rgba(255,255,255,0.97)",
//   glass: "rgba(255,255,255,0.12)",
//   darkBg: "#0d1f2d",
//   midBg: "#f0f7f4",
//   textDark: "#0d1f2d",
//   textMid: "#4a5568",
//   green: "#10b981",
//   blue: "#3b82f6",
//   indigo: "#6366f1",
// };

// // ─── Global CSS ──────────────────────────────

// const css = `
//   @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
//   * { box-sizing: border-box; margin: 0; padding: 0; }
//   body { font-family: 'Plus Jakarta Sans', sans-serif; background: ${G.midBg}; color: ${G.textDark}; -webkit-font-smoothing: antialiased; }
  
//   /* Scrollbar */
//   ::-webkit-scrollbar { width: 6px; height: 6px; }
//   ::-webkit-scrollbar-track { background: #e2e8f0; }
//   ::-webkit-scrollbar-thumb { background: ${G.indigo}; border-radius: 3px; }
//   ::-webkit-scrollbar-thumb:hover { background: #4f46e5; }
  
//   /* Typography */
//   .serif { font-family: 'DM Serif Display', serif; }
//   .gradient-text { 
//     background: ${G.accent}; 
//     -webkit-background-clip: text; 
//     -webkit-text-fill-color: transparent; 
//     background-clip: text; 
//   }
  
//   /* Cards & Hover Effects */
//   .card-hover { 
//     transition: transform 0.25s ease, box-shadow 0.25s ease; 
//     will-change: transform;
//   }
//   .card-hover:hover { 
//     transform: translateY(-4px); 
//     box-shadow: 0 20px 48px rgba(99,102,241,0.15) !important; 
//   }
  
//   /* Tags & Pills */
//   .tag-pill { 
//     display:inline-flex; align-items:center; gap:4px; 
//     padding:3px 10px; border-radius:99px; 
//     font-size:11px; font-weight:600; letter-spacing:0.04em; 
//     text-transform:uppercase; white-space: nowrap;
//   }
  
//   /* Buttons */
//   .btn-primary { 
//     background:${G.accent}; color:#fff; border:none; cursor:pointer; 
//     border-radius:10px; font-family:inherit; font-weight:700; 
//     transition: opacity 0.2s, transform 0.2s; 
//   }
//   .btn-primary:hover { opacity:0.9; transform:translateY(-1px); }
//   .btn-primary:disabled { opacity:0.6; cursor:not-allowed; transform:none; }
  
//   .btn-ghost { 
//     background:transparent; border:2px solid ${G.indigo}; color:${G.indigo}; 
//     cursor:pointer; border-radius:10px; font-family:inherit; font-weight:600; 
//     transition: background 0.2s, color 0.2s; 
//   }
//   .btn-ghost:hover { background:${G.indigo}; color:#fff; }
//   .btn-ghost:disabled { opacity:0.5; cursor:not-allowed; }
  
//   /* Form Fields */
//   .input-field, .textarea-field, .select-field { 
//     width:100%; padding:12px 16px; border:2px solid #e2e8f0; 
//     border-radius:10px; font-family:inherit; font-size:14px; 
//     transition:border-color 0.2s, box-shadow 0.2s; outline:none; background:#fff; 
//   }
//   .input-field:focus, .textarea-field:focus, .select-field:focus { 
//     border-color:${G.indigo}; box-shadow: 0 0 0 3px rgba(99,102,241,0.1); 
//   }
//   .textarea-field { min-height:120px; resize:vertical; }
  
//   /* Modal */
//   .modal-backdrop { 
//     position:fixed; inset:0; background:rgba(13,31,45,0.7); 
//     backdrop-filter:blur(4px); z-index:1000; 
//     display:flex; align-items:center; justify-content:center; 
//     padding:16px; animation: fadeIn 0.2s ease;
//   }
//   .modal-box { 
//     background:#fff; border-radius:20px; padding:32px; 
//     width:100%; max-width:640px; max-height:90vh; 
//     overflow-y:auto; animation: slideUp 0.3s ease;
//   }
  
//   /* Branch Chips */
//   .branch-chip { 
//     display:inline-flex; align-items:center; gap:6px; 
//     padding:7px 16px; border-radius:99px; font-size:13px; 
//     font-weight:600; cursor:pointer; border:2px solid transparent; 
//     transition: all 0.2s; white-space:nowrap;
//   }
//   .chip-active { background:${G.indigo}; color:#fff; border-color:${G.indigo}; }
//   .chip-inactive { background:#fff; color:${G.textMid}; border-color:#e2e8f0; }
//   .chip-inactive:hover { border-color:${G.indigo}; color:${G.indigo}; }
  
//   /* Skeleton Loading */
//   .skeleton { 
//     background: linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%); 
//     background-size:200% 100%; animation: shimmer 1.4s infinite; 
//     border-radius:8px;
//   }
//   @keyframes shimmer { 
//     0%{background-position:200% 0} 100%{background-position:-200% 0} 
//   }
  
//   /* Animations */
//   .fade-in { animation: fadeIn 0.4s ease forwards; }
//   @keyframes fadeIn { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
//   @keyframes slideUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
  
//   /* Text Clamping */
//   .line-clamp-2 { display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
//   .line-clamp-3 { display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden; }
  
//   /* Labels */
//   .prose-label { font-size:11px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; color:${G.indigo}; }
  
//   /* Avatars */
//   .author-ring { 
//     width:38px; height:38px; border-radius:50%; 
//     display:flex; align-items:center; justify-content:center; 
//     font-weight:800; font-size:13px; color:#fff; flex-shrink:0; 
//   }
//   .avatar-lg { 
//     width:52px; height:52px; border-radius:50%; 
//     display:flex; align-items:center; justify-content:center; 
//     font-weight:800; font-size:16px; color:#fff; flex-shrink:0; 
//   }
  
//   /* Responsive Utilities */
//   @media(max-width: 1024px) {
//     .sidebar-first { order: -1; }
//   }
//   @media(max-width: 768px) {
//     .desktop-only { display: none !important; }
//     .mobile-full { width: 100% !important; }
//     .mobile-stack { flex-direction: column !important; }
//     .mobile-center { text-align: center !important; }
//     .modal-box { padding: 24px 20px; margin: 8px; }
//   }
//   @media(min-width: 769px) {
//     .mobile-only { display: none !important; }
//   }
  
//   /* Touch Targets */
//   @media (hover: none) and (pointer: coarse) {
//     .btn-primary, .btn-ghost, .branch-chip, .tag-pill {
//       min-height: 44px;
//       min-width: 44px;
//       padding: 12px 16px;
//     }
//     .input-field, .select-field {
//       min-height: 48px;
//       font-size: 16px; /* Prevents iOS zoom */
//     }
//   }
// `;

// // ─────────────────────────────────────────────
// //  Sub-components (with proper TypeScript)
// // ─────────────────────────────────────────────

// interface HeroBannerProps {
//   totalPosts: number;
//   onSubmitClick: () => void;
// }

// function HeroBanner({ totalPosts, onSubmitClick }: HeroBannerProps) {
//   return (
//     <div style={{ background: G.darkBg, position:"relative", overflow:"hidden", padding:"64px 0 72px" }}>
//       {/* Decorative blobs */}
//       {[
//         { top:"-60px", left:"-60px", color:"rgba(16,185,129,.18)", size:"320px" },
//         { bottom:"-40px", right:"-40px", color:"rgba(99,102,241,.2)", size:"280px" },
//         { top:"30%", left:"40%", color:"rgba(59,130,246,.12)", size:"200px" },
//       ].map((b,i)=>(
//         <div key={i} style={{ 
//           position:"absolute" as const, borderRadius:"50%", 
//           background:b.color, width:b.size, height:b.size, 
//           top:b.top, bottom:b.bottom, left:b.left, right:b.right, 
//           filter:"blur(60px)", pointerEvents:"none" as const 
//         }} />
//       ))}
//       <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 24px", position:"relative", zIndex:1 }}>
//         {/* Breadcrumb */}
//         <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:28, fontSize:13, color:"rgba(255,255,255,.5)", flexWrap:"wrap" }}>
//           <span>Home</span>
//           <span>/</span>
//           <span style={{ color:G.green, fontWeight:600 }}>Health Insights Blog</span>
//         </div>

//         <div style={{ display:"flex", flexWrap:"wrap", alignItems:"flex-end", justifyContent:"space-between", gap:24 }}>
//           <div style={{ maxWidth:680, minWidth:0 }}>
//             <div className="prose-label" style={{ color:G.green, marginBottom:14 }}>
//               ✦ Multi-Branch Wellness Network
//             </div>
//             <h1 className="serif gradient-text" style={{ fontSize:"clamp(32px,5vw,58px)", lineHeight:1.1, marginBottom:20, wordBreak:"break-word" }}>
//               Health & Wellness<br />Insights
//             </h1>
//             <p style={{ color:"rgba(255,255,255,.65)", fontSize:17, lineHeight:1.7, maxWidth:520 }}>
//               Expert articles, research, and practical tips from physiotherapy and chiropractic specialists across all our branches.
//             </p>
//             <div style={{ display:"flex", gap:32, marginTop:28, flexWrap:"wrap" }}>
//               {[
//                 { n: totalPosts, l: "Articles" },
//                 { n: "6", l: "Branch Cities" },
//                 { n: "12", l: "Specialists" },
//               ].map((s,i)=>(
//                 <div key={i}>
//                   <div style={{ fontSize:28, fontWeight:800, color:"#fff", lineHeight:1 }}>{s.n}</div>
//                   <div style={{ fontSize:12, color:"rgba(255,255,255,.45)", marginTop:4, fontWeight:500 }}>{s.l}</div>
//                 </div>
//               ))}
//             </div>
//           </div>
//           <button className="btn-primary" onClick={onSubmitClick}
//             style={{ padding:"14px 28px", fontSize:15, display:"flex", alignItems:"center", gap:10, whiteSpace:"nowrap" }}>
//             <span>✏</span> <span className="desktop-only">Submit Article</span><span className="mobile-only">Submit</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// interface SearchBarProps {
//   query: string;
//   setQuery: (q: string) => void;
//   onSearch: () => void;
// }

// function SearchBar({ query, setQuery, onSearch }: SearchBarProps) {
//   return (
//     <div style={{ maxWidth:620, width:"100%", position:"relative" }}>
//       <span style={{ position:"absolute", left:16, top:"50%", transform:"translateY(-50%)", fontSize:18, color:G.indigo, pointerEvents:"none" as const }}>⌕</span>
//       <input className="input-field" style={{ paddingLeft:46, paddingRight:100, fontSize:14, height:50 }}
//         value={query} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
//         placeholder="Search articles, conditions, treatments…"
//         onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key==="Enter" && onSearch()}
//       />
//       <button className="btn-primary" onClick={onSearch}
//         style={{ position:"absolute", right:6, top:6, padding:"8px 18px", fontSize:13 }}>
//         Search
//       </button>
//     </div>
//   );
// }

// interface BranchSelectorProps {
//   active: string;
//   setActive: (id: string) => void;
// }

// function BranchSelector({ active, setActive }: BranchSelectorProps) {
//   return (
//     <div style={{ display:"flex", gap:8, overflowX:"auto", paddingBottom:4, scrollbarWidth:"none" as const, msOverflowStyle:"none" as const }} 
//          className="hide-scrollbar">
//       {BRANCHES.map(b=>(
//         <button key={b.id} className={`branch-chip ${active===b.id?"chip-active":"chip-inactive"}`}
//           onClick={()=>setActive(b.id)} style={{ flexShrink: 0 }}>
//           {b.id!=="all" && <span style={{ fontSize:10 }}>📍</span>}
//           {b.label}
//         </button>
//       ))}
//     </div>
//   );
// }

// interface CategoryTabsProps {
//   active: string;
//   setActive: (slug: string) => void;
// }

// function CategoryTabs({ active, setActive }: CategoryTabsProps) {
//   return (
//     <div style={{ display:"flex", gap:8, overflowX:"auto", paddingBottom:4, scrollbarWidth:"none" as const, msOverflowStyle:"none" as const }}>
//       {CATEGORIES.map(c=>{
//         const isActive = active === c.slug;
//         const color = colorFor(c.slug);
//         return (
//           <button key={c.slug}
//             onClick={()=>setActive(c.slug)}
//             style={{
//               display:"flex", alignItems:"center", gap:6, padding:"8px 16px",
//               borderRadius:99, fontSize:13, fontWeight:600, cursor:"pointer",
//               whiteSpace:"nowrap" as const, border:"2px solid",
//               background: isActive ? color : "#fff",
//               borderColor: isActive ? color : "#e2e8f0",
//               color: isActive ? "#fff" : G.textMid,
//               transition:"all .2s",
//               flexShrink: 0
//             }}>
//             <span>{c.icon}</span><span className="desktop-only">{c.name}</span>
//           </button>
//         );
//       })}
//     </div>
//   );
// }

// interface FeaturedCardProps {
//   post: Post;
// }

// function FeaturedCard({ post }: FeaturedCardProps) {
//   const col = colorFor(post.category);
//   const cat = CATEGORIES.find(c=>c.slug===post.category);
//   const branch = BRANCHES.find(b=>b.id===post.branch);
  
//   return (
//     <article className="card-hover fade-in" style={{
//       borderRadius:20, overflow:"hidden", background:G.card,
//       boxShadow:"0 4px 24px rgba(0,0,0,.08)", height:"100%",
//       display:"flex", flexDirection:"column",
//     }}>
//       <div style={{ height:8, background:`linear-gradient(90deg,${col},${G.indigo})` }} />
//       <div style={{ padding:"28px 28px 0" }}>
//         <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16, flexWrap:"wrap", gap:8 }}>
//           <span className="tag-pill" style={{ background:`${col}18`, color:col }}>
//             {cat?.icon} <span className="desktop-only">{cat?.name}</span>
//           </span>
//           <span className="tag-pill" style={{ background:"#fef3c7", color:"#d97706" }}>★ Featured</span>
//         </div>
//         <h2 className="serif" style={{ fontSize:22, lineHeight:1.3, marginBottom:12, color:G.textDark, wordBreak:"break-word" }}>{post.title}</h2>
//         <p className="line-clamp-3" style={{ color:G.textMid, fontSize:14, lineHeight:1.7 }}>{post.excerpt}</p>
//       </div>
//       <div style={{ padding:"20px 28px 28px", marginTop:"auto" }}>
//         <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20, flexWrap:"wrap" }}>
//           <div className="author-ring" style={{ background:`linear-gradient(135deg,${col},${G.indigo})` }}>
//             {initials(post.author)}
//           </div>
//           <div style={{ minWidth: 0 }}>
//             <div style={{ fontSize:13, fontWeight:700, color:G.textDark }}>{post.author}</div>
//             <div style={{ fontSize:11, color:G.textMid }}>{post.authorRole} · {branch?.city}</div>
//           </div>
//         </div>
//         <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
//           <div style={{ display:"flex", gap:16, fontSize:12, color:G.textMid, flexWrap:"wrap" }}>
//             <span>📅 {fmt(post.date)}</span>
//             <span>⏱ {post.readTime}</span>
//             <span>👁 {post.views.toLocaleString()}</span>
//           </div>
//           <button className="btn-primary" style={{ padding:"8px 18px", fontSize:13 }}>Read →</button>
//         </div>
//       </div>
//     </article>
//   );
// }

// interface BlogCardProps {
//   post: Post;
// }

// function BlogCard({ post }: BlogCardProps) {
//   const col = colorFor(post.category);
//   const cat = CATEGORIES.find(c=>c.slug===post.category);
//   const branch = BRANCHES.find(b=>b.id===post.branch);
  
//   return (
//     <article className="card-hover fade-in" style={{
//       borderRadius:16, overflow:"hidden", background:G.card,
//       boxShadow:"0 2px 16px rgba(0,0,0,.06)",
//       display:"flex", flexDirection:"column",
//     }}>
//       <div style={{ height:5, background:`linear-gradient(90deg,${col},${G.indigo})` }} />
//       <div style={{ padding:"22px 24px 20px", flex:1, display:"flex", flexDirection:"column" }}>
//         <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:14, gap:8, flexWrap:"wrap" }}>
//           <span className="tag-pill" style={{ background:`${col}18`, color:col }}>
//             {cat?.icon} <span className="desktop-only">{cat?.name}</span>
//           </span>
//           {branch && (
//             <span style={{ fontSize:11, color:G.textMid, fontWeight:600, whiteSpace:"nowrap" as const }}>📍 {branch.city}</span>
//           )}
//         </div>
//         <h3 className="serif line-clamp-2" style={{ fontSize:18, lineHeight:1.35, marginBottom:10, color:G.textDark, wordBreak:"break-word" }}>
//           {post.title}
//         </h3>
//         <p className="line-clamp-2" style={{ color:G.textMid, fontSize:13, lineHeight:1.65, flex:1 }}>{post.excerpt}</p>
//         <div style={{ marginTop:16, paddingTop:16, borderTop:"1px solid #f1f5f9", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:8 }}>
//           <div style={{ display:"flex", alignItems:"center", gap:8 }}>
//             <div className="author-ring" style={{ background:`linear-gradient(135deg,${col},${G.indigo})`, width:30, height:30, fontSize:11 }}>
//               {initials(post.author)}
//             </div>
//             <div>
//               <div style={{ fontSize:12, fontWeight:600, color:G.textDark }}>{post.author}</div>
//               <div style={{ fontSize:11, color:G.textMid }}>{post.readTime} · {fmt(post.date)}</div>
//             </div>
//           </div>
//           <div style={{ display:"flex", gap:12, fontSize:12, color:G.textMid, alignItems:"center" }}>
//             <span>💬 {post.comments}</span>
//             <span>👁 {post.views.toLocaleString()}</span>
//           </div>
//         </div>
//       </div>
//     </article>
//   );
// }

// function Skeleton() {
//   return (
//     <div style={{ borderRadius:16, overflow:"hidden", background:"#fff", padding:24 }}>
//       <div className="skeleton" style={{ height:12, width:"60%", marginBottom:16 }} />
//       <div className="skeleton" style={{ height:20, marginBottom:10 }} />
//       <div className="skeleton" style={{ height:20, width:"80%", marginBottom:10 }} />
//       <div className="skeleton" style={{ height:14, marginBottom:6 }} />
//       <div className="skeleton" style={{ height:14, width:"70%", marginBottom:24 }} />
//       <div style={{ display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:8 }}>
//         <div className="skeleton" style={{ height:32, width:"40%", borderRadius:99 }} />
//         <div className="skeleton" style={{ height:32, width:"25%" }} />
//       </div>
//     </div>
//   );
// }

// interface PaginationProps {
//   page: number;
//   total: number;
//   limit: number;
//   onChange: (page: number) => void;
// }

// function Pagination({ page, total, limit, onChange }: PaginationProps) {
//   const totalPages = Math.ceil(total / limit);
//   if (totalPages <= 1) return null;
  
//   const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  
//   return (
//     <div style={{ display:"flex", justifyContent:"center", gap:8, marginTop:40, flexWrap:"wrap" }}>
//       <button onClick={()=>onChange(page-1)} disabled={page===1}
//         style={{ 
//           width:38, height:38, borderRadius:8, border:"2px solid #e2e8f0", 
//           background:"#fff", cursor: page===1 ? "not-allowed" : "pointer", 
//           color:G.textMid, display:"flex", alignItems:"center", justifyContent:"center", 
//           opacity: page===1 ? 0.4 : 1 
//         }}>
//         ‹
//       </button>
//       {pages.map(p=>(
//         <button key={p} onClick={()=>onChange(p)}
//           style={{ 
//             width:38, height:38, borderRadius:8, border:"2px solid", 
//             borderColor: p===page ? G.indigo : "#e2e8f0", 
//             background: p===page ? G.indigo : "#fff", 
//             color: p===page ? "#fff" : G.textMid, 
//             fontWeight:700, fontSize:14, cursor:"pointer" 
//           }}>
//           {p}
//         </button>
//       ))}
//       <button onClick={()=>onChange(page+1)} disabled={page===totalPages}
//         style={{ 
//           width:38, height:38, borderRadius:8, border:"2px solid #e2e8f0", 
//           background:"#fff", cursor: page===totalPages ? "not-allowed" : "pointer", 
//           color:G.textMid, display:"flex", alignItems:"center", justifyContent:"center", 
//           opacity: page===totalPages ? 0.4 : 1 
//         }}>
//         ›
//       </button>
//     </div>
//   );
// }

// // ─── Submit Modal ────────────────────────────

// interface SubmitModalProps {
//   onClose: () => void;
//   onSuccess: (form: FormState) => void;
// }

// function SubmitModal({ onClose, onSuccess }: SubmitModalProps) {
//   const [form, setForm] = useState<FormState>({ 
//     title:"", category:"sports-therapy", branch:"delhi", tags:"", excerpt:"" 
//   });
//   const [loading, setLoading] = useState(false);
//   const [aiLoading, setAiLoading] = useState(false);
//   const [success, setSuccess] = useState(false);

//   const setField = (key: keyof FormState, value: string) => 
//     setForm(prev => ({ ...prev, [key]: value }));

//   const generateExcerpt = async () => {
//     if (!form.title) return;
//     setAiLoading(true);
//     try {
//       // Mock AI response - replace with real API call
//       await new Promise(res => setTimeout(res, 800));
//       const mockExcerpt = `Discover expert insights on ${form.title.toLowerCase()} with practical tips from our wellness specialists.`;
//       setField("excerpt", mockExcerpt);
//     } catch {
//       setField("excerpt", "Could not generate – please write manually.");
//     }
//     setAiLoading(false);
//   };

//   const handleSubmit = async () => {
//     if (!form.title || !form.excerpt) return;
//     setLoading(true);
//     // Simulate API call
//     await new Promise(r => setTimeout(r, 900));
//     setLoading(false);
//     setSuccess(true);
//     setTimeout(() => { 
//       onSuccess(form); 
//       onClose(); 
//     }, 1600);
//   };

//   return (
//     <div className="modal-backdrop" onClick={(e: React.MouseEvent) => e.target === e.currentTarget && onClose()}>
//       <div className="modal-box fade-in">
//         {success ? (
//           <div style={{ textAlign:"center", padding:"32px 0" }}>
//             <div style={{ fontSize:52, marginBottom:16 }}>✅</div>
//             <h3 className="serif" style={{ fontSize:26, marginBottom:8 }}>Article Submitted!</h3>
//             <p style={{ color:G.textMid }}>Your article has been submitted for review.</p>
//           </div>
//         ) : (
//           <>
//             <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24, flexWrap:"wrap", gap:12 }}>
//               <h2 className="serif" style={{ fontSize:24 }}>Submit an Article</h2>
//               <button onClick={onClose} style={{ background:"none", border:"none", fontSize:22, cursor:"pointer", color:G.textMid, padding:4 }}>✕</button>
//             </div>

//             <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
//               <div>
//                 <label className="prose-label" style={{ display:"block", marginBottom:6 }}>Article Title *</label>
//                 <input className="input-field" value={form.title} onChange={(e) => setField("title", e.target.value)} placeholder="Enter a compelling title…" />
//               </div>

//               <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(140px, 1fr))", gap:12 }}>
//                 <div>
//                   <label className="prose-label" style={{ display:"block", marginBottom:6 }}>Category</label>
//                   <select className="select-field" value={form.category} onChange={(e) => setField("category", e.target.value)}>
//                     {CATEGORIES.filter(c => c.slug !== "all").map(c => (
//                       <option key={c.slug} value={c.slug}>{c.name}</option>
//                     ))}
//                   </select>
//                 </div>
//                 <div>
//                   <label className="prose-label" style={{ display:"block", marginBottom:6 }}>Branch</label>
//                   <select className="select-field" value={form.branch} onChange={(e) => setField("branch", e.target.value)}>
//                     {BRANCHES.filter(b => b.id !== "all").map(b => (
//                       <option key={b.id} value={b.id}>{b.label}</option>
//                     ))}
//                   </select>
//                 </div>
//               </div>

//               <div>
//                 <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:6, flexWrap:"wrap", gap:8 }}>
//                   <label className="prose-label">Excerpt / Summary *</label>
//                   <button onClick={generateExcerpt} disabled={!form.title || aiLoading}
//                     style={{ 
//                       background: aiLoading ? "#e2e8f0" : `linear-gradient(135deg,${G.green},${G.indigo})`, 
//                       color: aiLoading ? G.textMid : "#fff", border:"none", borderRadius:8, 
//                       padding:"5px 12px", fontSize:12, fontWeight:700, 
//                       cursor: (!form.title || aiLoading) ? "not-allowed" : "pointer" 
//                     }}>
//                     {aiLoading ? "⏳ Generating…" : "✨ AI Generate"}
//                   </button>
//                 </div>
//                 <textarea className="textarea-field" value={form.excerpt} onChange={(e) => setField("excerpt", e.target.value)} placeholder="Write a short compelling excerpt…" />
//               </div>

//               <div>
//                 <label className="prose-label" style={{ display:"block", marginBottom:6 }}>Tags (comma-separated)</label>
//                 <input className="input-field" value={form.tags} onChange={(e) => setField("tags", e.target.value)} placeholder="e.g. back pain, exercises, posture" />
//               </div>

//               <div style={{ display:"flex", gap:12, marginTop:8, flexWrap:"wrap" }}>
//                 <button className="btn-ghost" onClick={onClose} style={{ padding:"12px 24px", fontSize:14, flex:1 }}>Cancel</button>
//                 <button className="btn-primary" onClick={handleSubmit} disabled={loading || !form.title || !form.excerpt}
//                   style={{ 
//                     padding:"12px 24px", fontSize:14, flex:2, 
//                     opacity: (loading || !form.title || !form.excerpt) ? 0.6 : 1 
//                   }}>
//                   {loading ? "Submitting…" : "Submit Article"}
//                 </button>
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// // ─── AI Ask Panel ────────────────────────────

// function AskAI() {
//   const [q, setQ] = useState("");
//   const [ans, setAns] = useState("");
//   const [loading, setLoading] = useState(false);

//   const ask = async () => {
//     if (!q.trim()) return;
//     setLoading(true); 
//     setAns("");
//     try {
//       // Mock AI response - replace with real API
//       await new Promise(res => setTimeout(res, 1000));
//       const mockAnswer = `Based on current wellness research: ${q.includes("pain") ? "For pain management, consider gentle stretching, proper posture, and consulting a specialist for personalized care." : "Maintaining regular movement, proper hydration, and adequate rest are foundational to wellness. For specific concerns, please consult our specialists."}`;
//       setAns(mockAnswer);
//     } catch { 
//       setAns("Unable to fetch answer. Please try again."); 
//     }
//     setLoading(false);
//   };

//   return (
//     <div style={{ background:`linear-gradient(135deg,${G.darkBg},#1a2744)`, borderRadius:20, padding:28, color:"#fff" }}>
//       <div className="prose-label" style={{ color:G.green, marginBottom:10 }}>✦ AI Health Assistant</div>
//       <h3 className="serif" style={{ fontSize:20, marginBottom:8 }}>Ask Our AI Expert</h3>
//       <p style={{ fontSize:13, color:"rgba(255,255,255,.55)", marginBottom:20, lineHeight:1.6 }}>
//         Get instant answers to your health and wellness questions.
//       </p>
//       <div style={{ position:"relative", marginBottom:12 }}>
//         <input
//           style={{ 
//             width:"100%", padding:"11px 14px", borderRadius:10, 
//             border:"1.5px solid rgba(255,255,255,.15)", 
//             background:"rgba(255,255,255,.08)", color:"#fff", 
//             fontFamily:"inherit", fontSize:13, outline:"none" 
//           }}
//           placeholder="e.g. How to relieve lower back pain?"
//           value={q} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQ(e.target.value)}
//           onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && ask()}
//         />
//       </div>
//       <button className="btn-primary" onClick={ask} disabled={loading || !q.trim()} 
//         style={{ 
//           width:"100%", padding:"11px", fontSize:14, 
//           opacity: (loading || !q.trim()) ? 0.6 : 1 
//         }}>
//         {loading ? "Thinking…" : "Ask Now →"}
//       </button>
//       {ans && (
//         <div style={{ 
//           marginTop:16, padding:"14px 16px", background:"rgba(16,185,129,.12)", 
//           borderRadius:10, borderLeft:`3px solid ${G.green}`, 
//           fontSize:13, lineHeight:1.7, color:"rgba(255,255,255,.85)" 
//         }}>
//           {ans}
//         </div>
//       )}
//     </div>
//   );
// }

// // ─── Newsletter ──────────────────────────────

// function Newsletter() {
//   const [email, setEmail] = useState(""); 
//   const [done, setDone] = useState(false);
  
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (email) setDone(true);
//   };
  
//   return (
//     <div style={{ background:`linear-gradient(135deg,${G.indigo},${G.blue})`, borderRadius:20, padding:28, color:"#fff" }}>
//       <div style={{ fontSize:28, marginBottom:10 }}>📧</div>
//       <h3 className="serif" style={{ fontSize:20, marginBottom:6 }}>Stay Updated</h3>
//       <p style={{ fontSize:13, color:"rgba(255,255,255,.7)", marginBottom:18, lineHeight:1.6 }}>Get the latest wellness insights delivered to your inbox.</p>
//       {done ? (
//         <div style={{ textAlign:"center", padding:"12px", background:"rgba(255,255,255,.15)", borderRadius:10, fontWeight:700 }}>✅ Subscribed!</div>
//       ) : (
//         <form onSubmit={handleSubmit}>
//           <input style={{ 
//             width:"100%", padding:"11px 14px", borderRadius:10, border:"none", 
//             fontFamily:"inherit", fontSize:13, marginBottom:10, outline:"none" 
//           }}
//             type="email" placeholder="your@email.com" 
//             value={email} onChange={(e) => setEmail(e.target.value)} 
//             required
//           />
//           <button type="submit"
//             style={{ 
//               width:"100%", padding:"11px", background:"#fff", color:G.indigo, 
//               border:"none", borderRadius:10, fontWeight:800, fontSize:14, cursor:"pointer" 
//             }}>
//             Subscribe Now
//           </button>
//           <p style={{ fontSize:11, color:"rgba(255,255,255,.45)", textAlign:"center", marginTop:10 }}>No spam · Unsubscribe anytime</p>
//         </form>
//       )}
//     </div>
//   );
// }

// // ─────────────────────────────────────────────
// //  Main Page Component
// // ─────────────────────────────────────────────

// export default function BlogPage() {
//   // State
//   const [posts, setPosts] = useState<Post[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [totalPosts, setTotal] = useState(MOCK_POSTS.length);
//   const [page, setPage] = useState(1);
//   const [limit, setLimit] = useState(6);
//   const [sortBy, setSortBy] = useState<"latest" | "popular" | "comments">("latest");
//   const [branch, setBranch] = useState("all");
//   const [category, setCategory] = useState("all");
//   const [query, setQuery] = useState("");
//   const [searchInput, setSearchInput] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

//   // Fetch posts (simulated)
//   const fetchPosts = useCallback(async () => {
//     setLoading(true);
//     // Simulate API latency
//     await new Promise(r => setTimeout(r, 500));
    
//     let data = [...MOCK_POSTS];
    
//     // Apply filters
//     if (branch !== "all") data = data.filter(p => p.branch === branch);
//     if (category !== "all") data = data.filter(p => p.category === category);
//     if (query) {
//       const q = query.toLowerCase();
//       data = data.filter(p => 
//         p.title.toLowerCase().includes(q) || 
//         p.excerpt.toLowerCase().includes(q)
//       );
//     }
    
//     // Apply sorting
//     if (sortBy === "popular") data.sort((a,b) => b.views - a.views);
//     else if (sortBy === "comments") data.sort((a,b) => b.comments - a.comments);
//     else data.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
//     setTotal(data.length);
    
//     // Pagination
//     const start = (page - 1) * limit;
//     const paginated = data.slice(start, start + limit);
    
//     setPosts(paginated);
//     setLoading(false);
//   }, [page, limit, sortBy, branch, category, query]);

//   useEffect(() => { 
//     fetchPosts(); 
//   }, [fetchPosts]);

//   const handleSearch = () => { 
//     setQuery(searchInput); 
//     setPage(1); 
//   };

//   const featured = MOCK_POSTS.filter(p => p.featured);
//   const popularPosts = [...MOCK_POSTS].sort((a,b) => b.views - a.views).slice(0,4);
//   const categories = CATEGORIES
//     .filter(c => c.slug !== "all")
//     .map(c => ({ 
//       ...c, 
//       count: MOCK_POSTS.filter(p => p.category === c.slug).length 
//     }));

//   return (
//     <>
//       <style>{css}</style>

//       {/* SEO JSON-LD */}
//       <script type="application/ld+json" dangerouslySetInnerHTML={{ 
//         __html: JSON.stringify({
//           "@context": "https://schema.org", 
//           "@type": "Blog",
//           "name": "Health & Wellness Insights", 
//           "description": "Expert physiotherapy and chiropractic articles across our multi-branch network",
//           "publisher": { 
//             "@type": "Organization",
//             "name": "HealthBlog",
//             "logo": { "@type": "ImageObject", "url": "/logo.png" } 
//           },
//           "url": "https://healthblog.com/blog"
//         })
//       }} />

//       {showModal && (
//         <SubmitModal 
//           onClose={() => setShowModal(false)} 
//           onSuccess={(p) => { 
//             const newPost: Post = {
//               ...p,
//               id: Date.now(),
//               date: new Date().toISOString(),
//               views: 0,
//               comments: 0,
//               featured: false,
//               readTime: "5 min",
//               authorRole: "Contributor",
//               author: "You",
//               tags: p.tags.split(",").map(t => t.trim()).filter(Boolean)
//             };
//             setPosts(prev => [newPost, ...prev]); 
//           }} 
//         />
//       )}

//       <div style={{ minHeight: "100vh", background: G.midBg }}>
//         {/* Hero */}
//         <HeroBanner totalPosts={MOCK_POSTS.length} onSubmitClick={() => setShowModal(true)} />

//         {/* Filter Toolbar - Sticky */}
//         <div style={{ 
//           background: "#fff", borderBottom: "1px solid #e2e8f0", 
//           position: "sticky" as const, top: 0, zIndex: 40,
//           boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
//         }}>
//           <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
//             {/* Row 1 – search + sort + limit */}
//             <div style={{ 
//               display: "flex", flexWrap: "wrap", gap: 12, 
//               padding: "14px 0 10px", alignItems: "center" 
//             }}>
//               <SearchBar query={searchInput} setQuery={setSearchInput} onSearch={handleSearch} />
//               <div style={{ display: "flex", gap: 10, marginLeft: "auto", flexWrap: "wrap", alignItems: "center" }}>
//                 <select className="select-field" style={{ width: "auto", minWidth: 130 }} 
//                   value={sortBy} onChange={(e) => { 
//                     setSortBy(e.target.value as "latest" | "popular" | "comments"); 
//                     setPage(1); 
//                   }}>
//                   <option value="latest">↓ Latest</option>
//                   <option value="popular">↓ Most Viewed</option>
//                   <option value="comments">↓ Most Discussed</option>
//                 </select>
//                 <select className="select-field" style={{ width: "auto", minWidth: 110 }} 
//                   value={limit} onChange={(e) => { 
//                     setLimit(Number(e.target.value)); 
//                     setPage(1); 
//                   }}>
//                   {[4, 6, 8, 12].map(n => (
//                     <option key={n} value={n}>{n} / page</option>
//                   ))}
//                 </select>
//                 <div style={{ display: "flex", borderRadius: 10, overflow: "hidden", border: "2px solid #e2e8f0" }} className="desktop-only">
//                   {(["grid", "list"] as const).map(m => (
//                     <button key={m} onClick={() => setViewMode(m)}
//                       style={{ 
//                         padding: "8px 14px", border: "none", cursor: "pointer", 
//                         fontFamily: "inherit", fontSize: 13, fontWeight: 700,
//                         background: viewMode === m ? G.indigo : "#fff", 
//                         color: viewMode === m ? "#fff" : G.textMid 
//                       }}>
//                       {m === "grid" ? "⊞" : "☰"}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>
//             {/* Row 2 – branches */}
//             <div style={{ paddingBottom: 10 }}>
//               <BranchSelector active={branch} setActive={(b) => { setBranch(b); setPage(1); }} />
//             </div>
//             {/* Row 3 – categories */}
//             <div style={{ paddingBottom: 12 }}>
//               <CategoryTabs active={category} setActive={(c) => { setCategory(c); setPage(1); }} />
//             </div>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 24px" }}>
//           <div style={{ 
//             display: "grid", 
//             gridTemplateColumns: "1fr", 
//             gap: 32 
//           }}>
            
//             {/* Mobile: Sidebar first, then main content */}
//             <div className="sidebar-first" style={{ 
//               display: "grid", 
//               gridTemplateColumns: "1fr", 
//               gap: 24 
//             }}>
//               {/* Sidebar */}
//               <aside style={{ 
//                 display: "flex", flexDirection: "column", gap: 24,
//                 order: 1
//               }}>
//                 <AskAI />
//                 <Newsletter />
                
//                 {/* Categories */}
//                 <div style={{ background: "#fff", borderRadius: 20, padding: 24, boxShadow: "0 2px 12px rgba(0,0,0,.06)" }}>
//                   <div className="prose-label" style={{ marginBottom: 16 }}>Browse by Category</div>
//                   {categories.map(c => (
//                     <button key={c.slug} 
//                       onClick={() => { setCategory(c.slug); setPage(1); window.scrollTo({ top: 0, behavior: "smooth" }); }}
//                       style={{ 
//                         display: "flex", justifyContent: "space-between", alignItems: "center", 
//                         padding: "10px 12px", borderRadius: 10, width: "100%", 
//                         background: category === c.slug ? `${colorFor(c.slug)}10` : "transparent", 
//                         border: "none", cursor: "pointer", marginBottom: 4, 
//                         transition: "background .2s", textAlign: "left" as const
//                       }}>
//                       <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//                         <div style={{ 
//                           width: 8, height: 8, borderRadius: "50%", 
//                           background: colorFor(c.slug), flexShrink: 0 
//                         }} />
//                         <span style={{ 
//                           fontSize: 13, fontWeight: 600, 
//                           color: category === c.slug ? colorFor(c.slug) : G.textDark 
//                         }}>{c.name}</span>
//                       </div>
//                       <span style={{ 
//                         fontSize: 12, fontWeight: 700, color: colorFor(c.slug), 
//                         background: `${colorFor(c.slug)}15`, padding: "2px 8px", borderRadius: 99 
//                       }}>{c.count}</span>
//                     </button>
//                   ))}
//                 </div>

//                 {/* Popular Posts */}
//                 <div style={{ background: "#fff", borderRadius: 20, padding: 24, boxShadow: "0 2px 12px rgba(0,0,0,.06)" }}>
//                   <div className="prose-label" style={{ marginBottom: 16 }}>🔥 Trending</div>
//                   <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
//                     {popularPosts.map((p, i) => (
//                       <div key={p.id} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
//                         <div style={{ 
//                           width: 32, height: 32, borderRadius: 8, 
//                           background: `linear-gradient(135deg,${colorFor(p.category)},${G.indigo})`, 
//                           display: "flex", alignItems: "center", justifyContent: "center", 
//                           color: "#fff", fontWeight: 800, fontSize: 13, flexShrink: 0 
//                         }}>
//                           {String(i + 1).padStart(2, "0")}
//                         </div>
//                         <div style={{ minWidth: 0 }}>
//                           <div style={{ 
//                             fontSize: 13, fontWeight: 600, color: G.textDark, 
//                             lineHeight: 1.4, marginBottom: 4, wordBreak: "break-word" as const 
//                           }}>{p.title}</div>
//                           <div style={{ fontSize: 11, color: G.textMid }}>
//                             {p.readTime} · 👁 {p.views.toLocaleString()}
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Branches */}
//                 <div style={{ 
//                   background: `linear-gradient(135deg,${G.green}18,${G.blue}18)`, 
//                   borderRadius: 20, padding: 24, 
//                   border: `1px solid ${G.green}30` 
//                 }}>
//                   <div className="prose-label" style={{ marginBottom: 16, color: G.green }}>📍 Our Branches</div>
//                   {BRANCHES.filter(b => b.id !== "all").map(b => (
//                     <button key={b.id} 
//                       onClick={() => { setBranch(b.id); setPage(1); }}
//                       style={{ 
//                         display: "flex", justifyContent: "space-between", alignItems: "center", 
//                         padding: "9px 12px", borderRadius: 10, width: "100%", 
//                         background: branch === b.id ? G.green : "transparent", 
//                         border: "none", cursor: "pointer", marginBottom: 4, 
//                         transition: "background .2s", textAlign: "left" as const
//                       }}>
//                       <span style={{ 
//                         fontSize: 13, fontWeight: 600, 
//                         color: branch === b.id ? "#fff" : G.textDark 
//                       }}>📍 {b.label}</span>
//                       <span style={{ 
//                         fontSize: 11, 
//                         color: branch === b.id ? "rgba(255,255,255,.7)" : G.textMid 
//                       }}>{b.city}</span>
//                     </button>
//                   ))}
//                 </div>

//                 {/* CTA */}
//                 <div style={{ 
//                   background: G.darkBg, borderRadius: 20, padding: 24, 
//                   textAlign: "center" as const 
//                 }}>
//                   <div style={{ fontSize: 36, marginBottom: 12 }}>💬</div>
//                   <h3 className="serif" style={{ fontSize: 20, color: "#fff", marginBottom: 8 }}>Have Questions?</h3>
//                   <p style={{ fontSize: 13, color: "rgba(255,255,255,.55)", marginBottom: 20, lineHeight: 1.6 }}>
//                     Our experts across all branches are ready to help.
//                   </p>
//                   <button className="btn-primary" style={{ width: "100%", padding: "12px", fontSize: 14 }}>
//                     Book Consultation
//                   </button>
//                   <button className="btn-ghost" style={{ 
//                     width: "100%", padding: "11px", fontSize: 14, marginTop: 10, 
//                     borderColor: "rgba(255,255,255,.3)", color: "rgba(255,255,255,.7)" 
//                   }}>
//                     Meet Our Team
//                   </button>
//                 </div>
//               </aside>

//               {/* Main Column */}
//               <main style={{ order: 2, minWidth: 0 }}>
//                 {/* Featured Section */}
//                 {branch === "all" && category === "all" && !query && page === 1 && (
//                   <div style={{ marginBottom: 48 }}>
//                     <div style={{ 
//                       display: "flex", alignItems: "center", justifyContent: "space-between", 
//                       marginBottom: 20, flexWrap: "wrap", gap: 12 
//                     }}>
//                       <div>
//                         <div className="prose-label" style={{ marginBottom: 4 }}>Highlighted Stories</div>
//                         <h2 className="serif" style={{ fontSize: 26 }}>
//                           Featured <span style={{ color: G.green }}>Articles</span>
//                         </h2>
//                       </div>
//                       <button className="btn-ghost" style={{ padding: "8px 18px", fontSize: 13 }}>
//                         View All →
//                       </button>
//                     </div>
//                     <div style={{ 
//                       display: "grid", 
//                       gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 360px), 1fr))", 
//                       gap: 24 
//                     }}>
//                       {featured.map(p => <FeaturedCard key={p.id} post={p} />)}
//                     </div>
//                   </div>
//                 )}

//                 {/* Posts Header */}
//                 <div style={{ 
//                   display: "flex", alignItems: "center", justifyContent: "space-between", 
//                   marginBottom: 20, flexWrap: "wrap", gap: 12 
//                 }}>
//                   <div>
//                     <div className="prose-label" style={{ marginBottom: 4 }}>
//                       {branch !== "all" ? `📍 ${BRANCHES.find(b => b.id === branch)?.label}` : "All Locations"}
//                       {category !== "all" && ` · ${CATEGORIES.find(c => c.slug === category)?.name}`}
//                       {query && ` · Search: "${query}"`}
//                     </div>
//                     <h2 className="serif" style={{ fontSize: 24 }}>
//                       Latest <span style={{ color: G.indigo }}>Articles</span>
//                       <span style={{ 
//                         fontSize: 14, fontFamily: "'Plus Jakarta Sans', sans-serif", 
//                         fontWeight: 400, color: G.textMid, marginLeft: 10 
//                       }}>
//                         ({totalPosts} found)
//                       </span>
//                     </h2>
//                   </div>
//                   {query && (
//                     <button onClick={() => { setQuery(""); setSearchInput(""); setPage(1); }}
//                       style={{ 
//                         background: "#fee2e2", color: "#dc2626", border: "none", 
//                         borderRadius: 8, padding: "6px 12px", fontSize: 12, 
//                         fontWeight: 700, cursor: "pointer" 
//                       }}>
//                       ✕ Clear
//                     </button>
//                   )}
//                 </div>

//                 {/* Post Grid / List */}
//                 {loading ? (
//                   <div style={{ 
//                     display: "grid", 
//                     gridTemplateColumns: viewMode === "grid" 
//                       ? "repeat(auto-fill, minmax(min(100%, 320px), 1fr))" 
//                       : "1fr", 
//                     gap: 20 
//                   }}>
//                     {Array(limit).fill(0).map((_, i) => <Skeleton key={i} />)}
//                   </div>
//                 ) : posts.length === 0 ? (
//                   <div style={{ 
//                     textAlign: "center", padding: "64px 24px", 
//                     background: "#fff", borderRadius: 20 
//                   }}>
//                     <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
//                     <h3 className="serif" style={{ fontSize: 22, marginBottom: 8 }}>No Articles Found</h3>
//                     <p style={{ color: G.textMid }}>Try different filters or search terms.</p>
//                   </div>
//                 ) : viewMode === "grid" ? (
//                   <div style={{ 
//                     display: "grid", 
//                     gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))", 
//                     gap: 20 
//                   }}>
//                     {posts.map(p => <BlogCard key={p.id} post={p} />)}
//                   </div>
//                 ) : (
//                   <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
//                     {posts.map(p => (
//                       <article key={p.id} className="card-hover fade-in" style={{ 
//                         background: "#fff", borderRadius: 16, padding: "20px 24px", 
//                         boxShadow: "0 2px 12px rgba(0,0,0,.05)", 
//                         display: "flex", gap: 20, alignItems: "flex-start",
//                         flexDirection: "column" as const
//                       }}>
//                         <div style={{ 
//                           width: "100%", display: "flex", gap: 10, marginBottom: 10, flexWrap: "wrap" 
//                         }}>
//                           <span className="tag-pill" style={{ 
//                             background: `${colorFor(p.category)}18`, color: colorFor(p.category) 
//                           }}>
//                             {CATEGORIES.find(c => c.slug === p.category)?.name}
//                           </span>
//                           <span style={{ fontSize: 11, color: G.textMid, fontWeight: 600 }}>
//                             📍 {BRANCHES.find(b => b.id === p.branch)?.city}
//                           </span>
//                         </div>
//                         <h3 className="serif" style={{ 
//                           fontSize: 18, marginBottom: 6, color: G.textDark, wordBreak: "break-word" as const 
//                         }}>{p.title}</h3>
//                         <p className="line-clamp-2" style={{ 
//                           fontSize: 13, color: G.textMid, lineHeight: 1.65, marginBottom: 12 
//                         }}>{p.excerpt}</p>
//                         <div style={{ 
//                           display: "flex", justifyContent: "space-between", alignItems: "center", 
//                           flexWrap: "wrap", gap: 8, width: "100%" 
//                         }}>
//                           <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//                             <div className="author-ring" style={{ 
//                               background: `linear-gradient(135deg,${colorFor(p.category)},${G.indigo})`, 
//                               width: 28, height: 28, fontSize: 10 
//                             }}>{initials(p.author)}</div>
//                             <span style={{ fontSize: 12, fontWeight: 600, color: G.textDark }}>{p.author}</span>
//                             <span style={{ fontSize: 12, color: G.textMid }}>· {p.readTime} · {fmt(p.date)}</span>
//                           </div>
//                           <div style={{ display: "flex", gap: 14, fontSize: 12, color: G.textMid, alignItems: "center" }}>
//                             <span>👁 {p.views.toLocaleString()}</span>
//                             <span>💬 {p.comments}</span>
//                             <button className="btn-primary" style={{ padding: "5px 14px", fontSize: 12 }}>Read →</button>
//                           </div>
//                         </div>
//                       </article>
//                     ))}
//                   </div>
//                 )}

//                 <Pagination 
//                   page={page} 
//                   total={totalPosts} 
//                   limit={limit} 
//                   onChange={(p) => { 
//                     setPage(p); 
//                     window.scrollTo({ top: 0, behavior: "smooth" }); 
//                   }} 
//                 />
//               </main>
//             </div>
//           </div>
//         </div>

//         {/* Bottom accent bar */}
//         <div style={{ height: 6, background: G.accent }} />
//       </div>
//     </>
//   );
// }

'use client'
import React from 'react'

export default function page() {
  return (
    <div>page</div>
  )
}
