import styles from './post.module.css';
import Image from 'next/image';
import React from 'react';

const Post = async ({ params }) => {
  const { id } = await params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${id}`);

   if (!res.ok) {
    return <div className={styles.error}>Post not found.</div>;
  }
  const post = await res.json();

  const authorRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users?id=${post.author}`);
  const authorData = await authorRes.json();

  return (
    <div className={styles.container}>
      <Image className={styles.blogImage} src={post.image||'/logo.svg'} alt='Post Image' width={500} height={300} />
      <div className={styles.textContainer}>
        <h1>{post.title}</h1>
        <small>
          Written by: <span>{authorData.name}</span>
        </small>
        <p>{post.content}</p>
      </div>
    </div>
  );
};

export default Post;
