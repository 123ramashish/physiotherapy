// model/dbconnection.ts
import { MongoClient, Db, Collection, ObjectId } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI!;
const MONGODB_DB = process.env.MONGODB_DB!;

if (!MONGODB_URI) {
    throw new Error('Please define MONGODB_URI environment variable');
}

if (!MONGODB_DB) {
    throw new Error('Please define MONGODB_DB environment variable');
}

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase() {
    if (cachedClient && cachedDb) {
        return { client: cachedClient, db: cachedDb };
    }

    const client = await MongoClient.connect(MONGODB_URI);
    const db = client.db(MONGODB_DB);

    cachedClient = client;
    cachedDb = db;

    return { client, db };
}

export async function getEventsCollection(): Promise<Collection> {
    const { db } = await connectToDatabase();
    const collection = db.collection('events');

    // Create indexes
    await collection.createIndexes([
        { key: { slug: 1 }, unique: true },
        { key: { status: 1, startDate: -1 } },
        { key: { category: 1, location: 1 } },
        { key: { branchId: 1, startDate: -1 } },
        { key: { title: 'text', description: 'text', tags: 'text' } },
        { key: { startDate: 1, endDate: 1 } },
        { key: { featured: -1, startDate: 1 } }
    ]);

    return collection;
}

export async function getRegistrationsCollection(): Promise<Collection> {
    const { db } = await connectToDatabase();
    const collection = db.collection('event_registrations');

    await collection.createIndexes([
        { key: { eventId: 1, email: 1 }, unique: true },
        { key: { eventId: 1, status: 1 } },
        { key: { registeredAt: -1 } },
        { key: { qrCode: 1 }, unique: true, sparse: true }
    ]);

    return collection;
}

export async function getBranchesCollection(): Promise<Collection> {
    const { db } = await connectToDatabase();
    const collection = db.collection('branches');

    await collection.createIndexes([
        { key: { city: 1 } },
        { key: { name: 1 }, unique: true }
    ]);

    return collection;
}

export { ObjectId };