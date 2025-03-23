'use client'
import styles from './login.module.css';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import React from 'react';

const LoginPage = () => {
    const { status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === 'authenticated') {
            router.push('/');
        }
    }, [status, router]);

    if (status === 'loading') {
        return <div className={styles.loading}>Loading...</div>
    }

    return <div className={styles.container}>
        <div className={styles.button} onClick={() => signIn('google')}>Sign in with Google</div>
        <div className={styles.button}>Sign in with Github</div>
    </div>
}

export default LoginPage;
