'use client'
import PostEdit from '../../../components/PostEdit/PostEdit';
import { useSession } from 'next-auth/react';
import React from 'react';

const New = () => {
	const { status } = useSession();
	if (status !== 'authenticated') {
		return <div>Unauthorized</div>
	}

	return <PostEdit />;
}

export default New;
