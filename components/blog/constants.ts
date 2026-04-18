import { Category, Branch, BlogPost } from './types';

export const CATEGORIES: Category[] = [
    { slug: 'sports-therapy', name: 'Sports Therapy', icon: '⚡', color: '#10b981' },
    { slug: 'chiropractic', name: 'Chiropractic', icon: '🦴', color: '#3b82f6' },
    { slug: 'pain-management', name: 'Pain Management', icon: '💊', color: '#6366f1' },
    { slug: 'rehabilitation', name: 'Rehabilitation', icon: '🏃', color: '#0ea5e9' },
    { slug: 'wellness', name: 'Wellness', icon: '🌿', color: '#059669' },
    { slug: 'ergonomics', name: 'Ergonomics', icon: '💺', color: '#4f46e5' },
    { slug: 'treatment-methods', name: 'Treatment', icon: '⚕️', color: '#1d4ed8' },
];

export const BRANCHES: Branch[] = [
    { id: 'all', name: 'All Branches', city: '' },
    { id: 'Noida-swaran-nagari', name: 'Noida Swaran Nagari', city: 'Noida' },
    { id: 'Noida-sector-134', name: 'Noida Sector 134', city: 'Noida' },

];

export const TAG_SUGGESTIONS = [
    'back pain', 'knee pain', 'sports injury', 'rehabilitation', 'posture',
    'stretching', 'strength training', 'pain relief', 'recovery', 'wellness',
    'ergonomics', 'desk exercises', 'neck pain', 'sciatica', 'arthritis',
    'frozen shoulder', 'physical therapy', 'manual therapy', 'dry needling',
    'cupping', 'hijama', 'post-surgery', 'stroke recovery', 'bell palsy'
];

export const MOCK_POSTS: BlogPost[] = [
    {
        _id: "1",
        title: 'Complete Guide to Preventing Sports Injuries',
        excerpt: 'Essential techniques and exercises to prevent common sports injuries and maintain peak physical performance.',
        content: `<h2>Understanding Sports Injuries</h2><p>Sports injuries can happen to anyone, from weekend warriors to professional athletes. Understanding the common types and how to prevent them is crucial for maintaining an active lifestyle.</p><h3>Common Sports Injuries</h3><ul><li><strong>Sprains and Strains:</strong> Overstretching or tearing of ligaments and muscles</li><li><strong>Fractures:</strong> Broken bones from impact or overuse</li><li><strong>Dislocations:</strong> When bones are forced out of their normal positions</li><li><strong>Tendonitis:</strong> Inflammation of tendons from repetitive motion</li></ul><h3>Prevention Strategies</h3><p>1. <strong>Proper Warm-up:</strong> Always spend 10-15 minutes warming up before intense activity. Dynamic stretches prepare your muscles and joints for movement.</p><p>2. <strong>Strength Training:</strong> Building muscle strength around joints provides better support and reduces injury risk. Focus on core stability, leg strength, and balanced muscle development.</p><p>3. <strong>Proper Technique:</strong> Learn and maintain correct form for your sport. Work with a coach or physiotherapist to ensure you're moving safely.</p><p>4. <strong>Rest and Recovery:</strong> Allow adequate time between intense sessions. Overtraining is a leading cause of injuries.</p><p>5. <strong>Proper Equipment:</strong> Use sport-appropriate footwear, protective gear, and well-maintained equipment.</p><h3>When to Seek Help</h3><p>If you experience persistent pain, swelling, limited range of motion, or instability in a joint, consult a physiotherapist promptly. Early intervention can prevent minor issues from becoming major problems.</p>`,
        category: 'sports-therapy',
        branch: 'delhi',
        author: 'Dr. Sarah Johnson',
        authorRole: 'Senior Physiotherapist',
        date: '2024-03-15T10:00:00.000Z',
        readTime: '8 min',
        views: 4201,
        comments: 24,
        featured: true,
        tags: ['prevention', 'sports', 'exercises', 'warm-up', 'strength training'],
        status: 'published',
        createdAt: '2024-03-15T09:00:00.000Z',
        updatedAt: '2024-03-15T09:00:00.000Z',
    },
    {
        _id: "2",
        title: 'Chiropractic Care for Chronic Back Pain',
        excerpt: 'Modern chiropractic techniques that provide lasting relief from chronic back pain without invasive procedures.',
        content: `<h2>The Science of Chiropractic Care</h2><p>Chiropractic care focuses on the relationship between the spine and nervous system. When spinal joints become misaligned (subluxated), they can interfere with nerve function and cause pain, stiffness, and reduced mobility.</p><h3>How Chiropractic Helps Back Pain</h3><p>1. <strong>Spinal Adjustments:</strong> Gentle, precise movements restore proper joint alignment and motion, reducing nerve irritation.</p><p>2. <strong>Soft Tissue Therapy:</strong> Techniques like massage and trigger point therapy release muscle tension that contributes to pain.</p><p>3. <strong>Rehabilitative Exercises:</strong> Customized exercises strengthen supporting muscles and improve posture for long-term relief.</p><p>4. <strong>Lifestyle Guidance:</strong> Advice on ergonomics, sleeping positions, and daily habits that support spinal health.</p><h3>What to Expect</h3><p>Your first visit includes a thorough assessment: medical history, physical examination, and possibly imaging. Your chiropractor will then create a personalized treatment plan with clear goals and timelines.</p><p>Most patients experience improvement within 2-4 weeks of consistent care. Maintenance visits help prevent recurrence and support overall wellness.</p>`,
        category: 'chiropractic',
        branch: 'mumbai',
        author: 'Dr. Michael Chen',
        authorRole: 'Chief Chiropractor',
        date: '2024-03-12T10:00:00.000Z',
        readTime: '6 min',
        views: 3850,
        comments: 18,
        featured: true,
        tags: ['back pain', 'chiropractic', 'relief', 'spine', 'adjustment'],
        status: 'published',
        createdAt: '2024-03-12T09:00:00.000Z',
        updatedAt: '2024-03-12T09:00:00.000Z',
    },
    {
        _id: "3",
        title: '5 Desk Exercises for Better Posture',
        excerpt: 'Simple, effective exercises you can do at your desk to improve posture, reduce back pain, and prevent long-term spinal issues.',
        content: `<h2>Why Posture Matters</h2><p>Poor posture from prolonged sitting can lead to chronic pain, reduced lung capacity, digestive issues, and decreased confidence. The good news: small, consistent changes make a big difference.</p><h3>Exercise 1: Chin Tucks</h3><p><strong>How:</strong> Sit tall, gently draw your chin straight back (like making a double chin). Hold 3 seconds, release. Repeat 10x.</p><p><strong>Benefits:</strong> Strengthens deep neck flexors, reduces forward head posture, alleviates neck tension.</p><h3>Exercise 2: Shoulder Blade Squeezes</h3><p><strong>How:</strong> Sit or stand tall. Squeeze shoulder blades together, hold 5 seconds, release. Repeat 15x.</p><p><strong>Benefits:</strong> Counters rounded shoulders, strengthens upper back, improves breathing.</p><h3>Exercise 3: Seated Cat-Cow</h3><p><strong>How:</strong> Sit on edge of chair. Inhale, arch back, look up (cow). Exhale, round spine, tuck chin (cat). Repeat 10x.</p><p><strong>Benefits:</strong> Mobilizes spine, reduces stiffness, improves flexibility.</p><h3>Exercise 4: Hip Flexor Stretch</h3><p><strong>How:</strong> Stand, step one foot back into lunge. Tuck pelvis, gently push hips forward. Hold 30s each side.</p><p><strong>Benefits:</strong> Releases tight hip flexors from sitting, reduces lower back strain.</p><h3>Exercise 5: Thoracic Extension</h3><p><strong>How:</strong> Clasp hands behind head. Gently arch upper back over chair back. Hold 15s, repeat 3x.</p><p><strong>Benefits:</strong> Opens chest, counters hunching, improves breathing.</p><p><strong>Pro Tip:</strong> Set hourly reminders to do one exercise. Consistency beats intensity!</p>`,
        category: 'ergonomics',
        branch: 'bengaluru',
        author: 'Elena Rodriguez',
        authorRole: 'Ergonomics Specialist',
        date: '2024-03-10T10:00:00.000Z',
        readTime: '5 min',
        views: 2980,
        comments: 12,
        featured: false,
        tags: ['posture', 'office', 'desk', 'exercises', 'stretching'],
        status: 'published',
        createdAt: '2024-03-10T09:00:00.000Z',
        updatedAt: '2024-03-10T09:00:00.000Z',
    },
];