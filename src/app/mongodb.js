import mongoose from "mongoose";
import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

let cached = global._mongo || { mongoose: null, mongoClient: null };

export async function dbConnection() {
  if (cached.mongoose) {
    console.log("Using existing Mongoose connection");
    return { mongoose: cached.mongoose, mongoClient: cached.mongoClient };
  }

  try {
    if (!cached.mongoClient) {
      console.log("Creating new MongoClient connection...");
      cached.mongoClient = new MongoClient(MONGODB_URI);
      await cached.mongoClient.connect();
    }

    if (!cached.mongoose) {
      console.log("Connecting Mongoose...");
      cached.mongoose = await mongoose.connect(MONGODB_URI);
    }

    if (process.env.NODE_ENV !== "production") {
      global._mongo = cached;
    }

    return { mongoose: cached.mongoose, mongoClient: cached.mongoClient };
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("Failed to connect to database");
  }
}
