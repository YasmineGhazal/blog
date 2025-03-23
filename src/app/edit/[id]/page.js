'use client';
import React from 'react';
import PostEdit from '../../../../components/PostEdit/PostEdit';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

const Edit = () => {
	const { data: session, status } = useSession();

	const { id } = useParams();
	const [post, setPost] = useState(null);

	useEffect(() => {
		const fetchPost = async () => {
			try {
				const res = await fetch(`/api/posts/${id}`);
				const data = await res.json();
				setPost(data);
			} catch (err) {
				console.error("Error fetching post:", err);
			}
		};

		if (id) fetchPost();
	}, [id]);

	if (status !== 'authenticated') {
		return <div>Unauthorized</div>;
	}

	if (!post) {
		return <div>Loading...</div>;
	}

	if (session.user.id !== post.author) {
		return <div>Unauthorized</div>;
	}

	return <PostEdit post={post} />;
};

export default Edit;
