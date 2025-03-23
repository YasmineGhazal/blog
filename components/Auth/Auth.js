'use client'
import { signOut, useSession } from 'next-auth/react';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Auth = () => {
    const router = useRouter();
    const { data, status } = useSession();

    return (status === 'authenticated' ? <>
        <Link href="/new">Write</Link>
        <Link href={`/?userID=${data.user.id}`} onClick={() => router.reload()}>My Posts</Link>
        <Link href="/" onClick={signOut}>logout</Link>
    </> :
        <Link href="/login">login</Link>);
};

export default Auth;
