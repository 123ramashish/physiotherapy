import mongoose from 'mongoose';
import { Event } from './model/schema/event.schema.ts';
import { connectDB } from './model/dbconnection.ts';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const dummyEvents = [
    {
        title: 'Mega Health Assessment Camp',
        slug: 'mega-health-camp-2026',
        description: 'Join us for a free comprehensive health screening and consultation camp.',
        fullDescription: '<h3>About the Event</h3><p>We are organizing a massive health camp to provide free consultations and basic screenings to the community.</p><ul><li>Free BMI Check</li><li>Postural Analysis</li><li>Blood Pressure Monitoring</li><li>Physiotherapy Consultation</li></ul>',
        startDate: new Date('2026-05-15T09:00:00Z'),
        endDate: new Date('2026-05-15T17:00:00Z'),
        startTime: '09:00',
        endTime: '17:00',
        location: 'Greater Noida',
        venue: 'SKM Physiotherapy Clinic, Sector 15',
        category: 'health-camp',
        capacity: 100,
        registered: 45,
        price: 'free',
        currency: 'INR',
        speaker: 'Dr. Shravan Kumar',
        speakerTitle: 'Chief Physiotherapist',
        featuredImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80',
        featuredImageId: 'dummy-1',
        gallery: [
            {
                url: 'https://images.unsplash.com/photo-1581056344408-02600c2c5029?auto=format&fit=crop&w=800&q=80',
                fileId: 'g-1',
                type: 'image',
                alt: 'Health Screening'
            },
            {
                url: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80',
                fileId: 'g-2',
                type: 'image',
                alt: 'Consultation Room'
            }
        ],
        tags: ['health camp', 'free screening', 'physiotherapy'],
        status: 'upcoming',
        featured: true,
        requirements: ['Carry previous medical reports', 'Wear comfortable clothing'],
        whatToBring: ['ID Proof', 'Previous X-ray/MRI if any']
    },
    {
        title: 'Sports Injury & Recovery Workshop',
        slug: 'sports-injury-workshop-2026',
        description: 'Learn advanced techniques for preventing and recovering from common sports injuries.',
        fullDescription: '<h3>Workshop Overview</h3><p>A hands-on workshop designed for athletes and fitness enthusiasts.</p><p>We will cover dynamic warm-ups, proper form, and recovery protocols.</p>',
        startDate: new Date('2026-06-10T10:00:00Z'),
        endDate: new Date('2026-06-10T14:00:00Z'),
        startTime: '10:00',
        endTime: '14:00',
        location: 'Delhi',
        venue: 'Indira Gandhi Indoor Stadium',
        category: 'workshop',
        capacity: 50,
        registered: 20,
        price: 'paid',
        priceAmount: '999',
        currency: 'INR',
        speaker: 'Dr. Sarah Johnson',
        speakerTitle: 'Sports Specialist',
        featuredImage: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80',
        featuredImageId: 'dummy-2',
        gallery: [
            {
                url: 'https://www.w3schools.com/html/mov_bbb.mp4',
                fileId: 'g-video-1',
                type: 'video',
                thumbnail: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=400&q=60',
                alt: 'Exercise Tutorial'
            }
        ],
        tags: ['sports', 'injury', 'recovery', 'fitness'],
        status: 'upcoming',
        featured: false
    },
    {
        title: 'Webinar: Ergonomics for IT Professionals',
        slug: 'ergonomics-webinar-2026',
        description: 'Tips and tricks to avoid back and neck pain while working from home or office.',
        fullDescription: '<h3>Remote Work Health</h3><p>Join us online for an interactive session on setting up your workspace correctly.</p>',
        startDate: new Date('2026-05-25T16:00:00Z'),
        endDate: new Date('2026-05-25T17:30:00Z'),
        startTime: '16:00',
        endTime: '17:30',
        location: 'Online',
        venue: 'Zoom Meeting',
        category: 'webinar',
        capacity: 500,
        registered: 120,
        price: 'free',
        currency: 'INR',
        registrationUrl: 'https://zoom.us/webinar/register/abc',
        featuredImage: 'https://images.unsplash.com/photo-1586762524444-8090993d052d?auto=format&fit=crop&w=800&q=80',
        featuredImageId: 'dummy-3',
        tags: ['ergonomics', 'work from home', 'back pain', 'webinar'],
        status: 'upcoming',
        featured: true
    },
    {
        title: 'Posture Screening Week',
        slug: 'posture-screening-week-2026',
        description: 'Get a professional postural assessment and personalized correction plan.',
        fullDescription: '<p>Throughout this week, we are offering specialized postural analysis at a discounted rate.</p>',
        startDate: new Date('2026-04-20T10:00:00Z'),
        endDate: new Date('2026-04-26T18:00:00Z'),
        startTime: '10:00',
        endTime: '18:00',
        location: 'Noida',
        venue: 'SKM Clinic, Sector 62',
        category: 'screening',
        capacity: 200,
        registered: 180,
        price: 'paid',
        priceAmount: '299',
        currency: 'INR',
        featuredImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80',
        featuredImageId: 'dummy-4',
        tags: ['posture', 'screening', 'alignment'],
        status: 'ongoing',
        featured: false
    }
];

async function seed() {
    try {
        await connectDB();
        console.log('Connected to DB');
        
        // Clear existing dummy data if needed, or just insert
        // await Event.deleteMany({ slug: { $in: dummyEvents.map(e => e.slug) } });
        
        const created = await Event.create(dummyEvents as any);
        console.log(`Successfully seeded ${(created as any).length} events`);
        
        process.exit(0);
    } catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
}

seed();