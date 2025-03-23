"use client";
import styles from './post.module.css';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import React from 'react';

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/posts/${id}`);
        if (!res.ok) {
          setError(true);
          return;
        }
        const postData = await res.json();
        setPost(postData);

        const authorRes = await fetch(`/api/users?id=${postData.author}`);
        const authorData = await authorRes.json();
        setAuthor(authorData);
      } catch (err) {
        console.error("Failed to fetch post:", err);
        setError(true);
      }
    };

    id &&fetchPost();
  }, [id]);

  if (error) return <div className={styles.error}>Post not found.</div>;
  if (!post) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.container}>
      <Image className={styles.blogImage} src={post.image || '/logo.svg'} alt='Post Image' width={500} height={300} />
      <div className={styles.textContainer}>
        <h1>{post.title}</h1>
        <small>
          Written by: <span>{author?.name || "Unknown"}</span>
        </small>
        <p>{post.content}</p>
      </div>
    </div>
  );
};

export default Post;
