import { MongoClient } from "mongodb";

let cachedClient = null;

export default async function handler(req, res) {
  try {
    if (!process.env.MONGO_URI) {
      return res.status(500).json({ error: "MONGO_URI missing" });
    }

    if (!cachedClient) {
      cachedClient = new MongoClient(process.env.MONGO_URI);
      await cachedClient.connect();
      console.log("✅ MongoDB connected");
    }

    const db = cachedClient.db(); // DB comes from URI
    const collection = db.collection("messages");

    if (req.method === "POST") {
      const body =
        typeof req.body === "string" ? JSON.parse(req.body) : req.body;

      const { name, message, anonymous } = body;

      if (!message || message.trim() === "") {
        return res.status(400).json({ error: "Message required" });
      }

      const result = await collection.insertOne({
        name: anonymous ? "Anonymous" : name || "Anonymous",
        message,
        createdAt: new Date()
      });

      return res.status(201).json({
        success: true,
        insertedId: result.insertedId
      });
    }

    if (req.method === "GET") {
      const messages = await collection
        .find({})
        .sort({ createdAt: -1 })
        .toArray();

      return res.status(200).json(messages);
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error("❌ MongoDB error:", err);
    return res.status(500).json({ error: err.message });
  }
}
