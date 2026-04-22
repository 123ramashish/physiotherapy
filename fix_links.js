const fs = require('fs');
const path = require('path');

const replacements = [
  // More specific ones first
  { old: /\/about\/story/g, new: '/OurStory-skm-physiotherapy' },
  { old: /\/about\/why-skm/g, new: '/Why-skm-physiotherapy' },
  { old: /\/WhySKM/g, new: '/Why-skm-physiotherapy' },
  { old: /\/about\/testimonials/g, new: '/testimonials-skm-physiotherapy' },
  { old: /\/TestimonialsPage/g, new: '/testimonials-skm-physiotherapy' },
  { old: /\/about\/faqs/g, new: '/FAQ-skm-physiotherapy' },
  { old: /\/FAQ/g, new: '/FAQ-skm-physiotherapy' },
  { old: /\/faq/g, new: '/FAQ-skm-physiotherapy' },
  { old: /\/about\/work-with-us/g, new: '/work-with-skm-physiotherapy' },
  { old: /\/work-with-us/g, new: '/work-with-skm-physiotherapy' },
  { old: /\/about(?=["']|$)/g, new: '/OurStory-skm-physiotherapy' }, 
  
  // Handling /services and /branches with or without trailing slash
  { 
    old: /(['"])\/services(?!\/skm-physiotherapy)([\/"'])/g, 
    new: (match, p1, p2) => `${p1}/services-skm-physiotherapy${p2}` 
  },
  { 
    old: /(['"])\/branches(?!\/skm-physiotherapy)([\/"'])/g, 
    new: (match, p1, p2) => `${p1}/branches-skm-physiotherapy${p2}` 
  },

  { 
    old: /(['"])\/blog(?!\/physiotherapy)([\/"'])/g, 
    new: (match, p1, p2) => `${p1}/blog-physiotherapy${p2}` 
  },
  { 
    old: /(['"])\/gallery(?!\/skm-physiotherapy)([\/"'])/g, 
    new: (match, p1, p2) => `${p1}/gallery-skm-physiotherapy${p2}` 
  },
  { 
    old: /(['"])\/events(?!\/skm-physiotherapy)([\/"'])/g, 
    new: (match, p1, p2) => `${p1}/events-skm-physiotherapy${p2}` 
  },
  { 
    old: /(['"])\/franchise(?!\/skm-physiotherapy)([\/"'])/g, 
    new: (match, p1, p2) => `${p1}/franchise-skm-physiotherapy${p2}` 
  },
  { 
    old: /(['"])\/contact(?!\/skm-physiotherapy)([\/"'])/g, 
    new: (match, p1, p2) => `${p1}/contact-skm-physiotherapy${p2}` 
  },
  { 
    old: /(['"])\/OurPartners(?!\/skm-physiotherapy)([\/"'])/g, 
    new: (match, p1, p2) => `${p1}/OurPartners-skm-physiotherapy${p2}` 
  },
  { 
    old: /(['"])\/OurImpact(?!\/skm-physiotherapy)([\/"'])/g, 
    new: (match, p1, p2) => `${p1}/OurImpact-skm-physiotherapy${p2}` 
  },
  { 
    old: /(['"])\/AwardsCertifications(?!\/skm-physiotherapy)([\/"'])/g, 
    new: (match, p1, p2) => `${p1}/AwardsCertifications-skm-physiotherapy${p2}` 
  },
  { 
    old: /(['"])\/story(?!\/skm-physiotherapy)([\/"'])/g, 
    new: (match, p1, p2) => `${p1}/OurStory-skm-physiotherapy${p2}` 
  },
];

const targetDirs = ['app', 'components', 'model'];

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.js') || file.endsWith('.jsx')) {
        results.push(file);
      }
    }
  });
  return results;
}

targetDirs.forEach(dir => {
  const fullPath = path.resolve(process.cwd(), dir);
  if (fs.existsSync(fullPath)) {
    const files = walk(fullPath);
    files.forEach(file => {
      let content = fs.readFileSync(file, 'utf8');
      let originalContent = content;
      
      replacements.forEach(r => {
        // Special handling for /api exclusion
        if (typeof r.new === 'function') {
           content = content.replace(r.old, (match, p1, p2, offset) => {
             // Check if preceded by /api
             const before = content.substring(Math.max(0, offset - 4), offset);
             if (before === '/api') return match;
             return r.new(match, p1, p2);
           });
        } else {
           content = content.replace(r.old, r.new);
        }
      });
      
      if (content !== originalContent) {
        fs.writeFileSync(file, content);
        console.log(`Updated ${file}`);
      }
    });
  }
});
