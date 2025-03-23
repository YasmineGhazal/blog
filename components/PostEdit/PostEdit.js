'use client';

import styles from './postEdit.module.css';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import React from 'react';


const PostEdit = ({ post }) => {
  const [image, setImage] = useState(post?.image || '');
  const [title, setTitle] = useState(post?.title || '');
  const [description, setDescription] = useState(post?.description || '');
  const [content, setContent] = useState(post?.content || '');
  const { data: session } = useSession();
  const textareaRef = useRef(null);


  const router = useRouter();

  useEffect(() => {
    const textarea = textareaRef.current;

    const adjustHeight = () => {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    };

    if (textarea) {
      textarea.addEventListener("input", adjustHeight);
      return () => textarea.removeEventListener("input", adjustHeight);
    }
  }, []);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'flashcard');
      formData.append('cloud_name', process.env.NEXT_PUBLIC_CLOUDINARY_NAME);

      try {
        const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`, {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();
        if (data.secure_url) {
          setImage(data.secure_url);
        } else {
          console.error('Error uploading image:', data);
        }
      } catch (error) {
        console.error('Error uploading image to Cloudinary:', error);
      }
    }
  };

  const handlePublish = async (title, description, content, image) => {
    if (!image) {
      console.error('No image selected!');
      return;
    }

    const postData = {
      title,
      description,
      content,
      image,
      author: session.user.id,
    };

    try {
      const res = await fetch(`/api/posts/${post?._id || ''}`, {
        method: post?._id ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (res.ok) {
        const data = await res.json();
        router.push(`/posts/${data._id || post?._id}`);
      } else {
        console.error('Failed to save post');
      }
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  const handleDiscard = () => {
    router.push(`/posts/${post?._id || ''}`);
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/posts/${post?._id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        router.push('/');
      } else {
        console.error('Failed to delete post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const buttonsConfig = [
    { value: 'Publish', class: 'publish', onClickHandler: handlePublish },
    { value: 'Discard', class: 'discard', onClickHandler: handleDiscard },
    { value: 'Delete', class: 'delete', onClickHandler: handleDelete },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.buttons}>
        {buttonsConfig.map((button) => (
          <input
            key={button.value}
            className={`${styles[button.class]} ${styles.button}`}
            type="button"
            value={button.value}
            onClick={() => button.onClickHandler(title, description, content, image)}
          />
        ))}
      </div>

      <div className={styles.postContainer}>
        <div className={styles.imageContainer}>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          {image && (
            <Image
              src={image}
              alt="Image"
              width={500}
              height={300}
              className={styles.image}
            />
          )}
          {/* {uploadProgress > 0 && uploadProgress < 100 && (
            <div className={styles.progressContainer}>
              <div
                className={styles.progressBar}
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          )} */}
        </div>

        <div className={styles.textContainer}>
          <input
            className={`${styles.input} ${styles.title}`}
            placeholder="Title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
          <input
            className={`${styles.input} ${styles.description}`}
            placeholder="Description"
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          />
          <textarea
            ref={textareaRef}
            className={`${styles.input} ${styles.content}`}
            placeholder="Write here..."
            value={content}
            onChange={({ target }) => setContent(target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default PostEdit;
