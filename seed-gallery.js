const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('MONGODB_URI is missing');
    process.exit(1);
}

const GallerySchema = new mongoose.Schema({
    url: { type: String, required: true },
    fileId: { type: String, required: true },
    type: { type: String, enum: ['image', 'video'], required: true },
    branch: { type: String, required: true },
    category: { 
        type: String, 
        enum: ['certificate', 'award', 'event', 'treatment', 'feedback', 'review'], 
        required: true 
    },
    title: { type: String, required: true },
    thumbnail: { type: String }
}, { timestamps: true });

const Gallery = mongoose.models.Gallery || mongoose.model('Gallery', GallerySchema);

const dummyGallery = [
    {
        title: 'B.P.T Degree Certificate',
        url: 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?auto=format&fit=crop&w=800&q=80',
        fileId: 'dg-1',
        type: 'image',
        branch: 'Noida Swaran Nagari',
        category: 'certificate'
    },
    {
        title: 'Best Physiotherapist Award 2023',
        url: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80',
        fileId: 'dg-2',
        type: 'image',
        branch: 'Noida Sector 134',
        category: 'award'
    },
    {
        title: 'Knee Replacement Rehabilitation',
        url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80',
        fileId: 'dg-3',
        type: 'image',
        branch: 'Noida Swaran Nagari',
        category: 'treatment'
    },
    {
        title: 'Patient Recovery Feedback',
        url: 'https://images.unsplash.com/photo-1581056344408-02600c2c5029?auto=format&fit=crop&w=800&q=80',
        fileId: 'dg-4',
        type: 'image',
        branch: 'Noida Sector 134',
        category: 'feedback'
    }
];

async function seed() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to DB');
        
        await Gallery.deleteMany({ fileId: { $in: dummyGallery.map(i => i.fileId) } });
        await Gallery.create(dummyGallery);
        
        console.log('Gallery seeded successfully');
        process.exit(0);
    } catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
}

seed();