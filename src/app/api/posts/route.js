import { NextResponse } from "next/server";
import { dbConnection } from "../../mongodb";
import Post from "@/../../models/Post";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const userID = searchParams.get("userID");

    try {
        await dbConnection();
        const posts = await Post.find(userID ? { author: userID } : {}).exec();

        return NextResponse.json({ posts }, { status: 200 });
    } catch (error) {
        console.error("Error fetching posts:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        await dbConnection();

        const body = await req.json();
        const { title, content, description, author, image } = body;

        if (!title || !content || !author || !description) {
            return NextResponse.json({ error: "Title, content, description, and author are required" }, { status: 400 });
        }

        const newPost = new Post({ title, content, description, author, image });
        await newPost.save();

        return NextResponse.json(newPost, { status: 201 });
    } catch (error) {
        console.error("Error creating post:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}