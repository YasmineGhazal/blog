import { dbConnection } from "../../../mongodb";
import Post from "../../../../../models/Post";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = await params;

  try {
    await dbConnection();
    const post = await Post.findById(id);

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  const { id } = await params;
  const body = await req.json();
  const { title, content, description, image } = body;

  if (!title || !content || !description) {
    return NextResponse.json({ error: "Title, content, description are required" }, { status: 400 });
  }

  try {
    await dbConnection();
    const post = await Post.findOneAndUpdate({ _id: id }, { title, content, description, image }, { new: true });

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json({ post }, { status: 202 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;
  try {
    await dbConnection();

    const result = await Post.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Post deleted successfully" }, { status: 202 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
