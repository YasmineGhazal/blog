'use client'
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import CardList from '../../components/CardList/CardList';
import React from 'react';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const userID = urlParams.get("userID");

      let apiUrl = "/api/posts";
      if (userID) {
        apiUrl = `/api/posts?userID=${userID}`;
      }

      try {
        const res = await fetch(apiUrl);
        const data = await res.json();

        if (res.ok) {
          setPosts(data.posts);
        } else {
          setError(data.error);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.page}>
      <CardList posts={posts} />
    </div>
  );
}
