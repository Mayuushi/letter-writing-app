import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;
const dbName = process.env.MONGO_DB_NAME;

if (!uri || !dbName) {
  throw new Error("MongoDB environment variables not set");
}

let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri);
  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db(dbName);
    const collection = db.collection("messages");

    if (req.method === "POST") {
      const { name, message, anonymous } = req.body;

      if (!message?.trim()) {
        return res.status(400).json({ error: "Message required" });
      }

      await collection.insertOne({
        name: anonymous ? "Anonymous" : name || "Anonymous",
        message,
        createdAt: new Date()
      });

      return res.status(201).json({ success: true });
    }

    if (req.method === "GET") {
      const messages = await collection
        .find({})
        .sort({ createdAt: -1 })
        .toArray();

      return res.status(200).json(messages);
    }

    res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
}
