'use client'
import React, { useEffect, useState } from 'react';
import styles from './card.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Card = ({ cardInfo }) => {
    const { _id, title, description, image, author } = cardInfo || {};
    const { data, status } = useSession();
    const [isOwner, setIsOwner] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (status === 'authenticated' && data.user.id === author) {
            setIsOwner(true);
        }
    }, [status, data, author]);

    const handleEdit = () => {
        router.push(`/edit/${_id}`);
    };

    const handleDelete = async () => {
        const res = await fetch(`/api/posts/${_id}`, {
            method: 'DELETE',
        });

        if (res.ok) {
            window.location.reload();
        } else {
            console.error('Failed to delete post');
        }
    };

    return (
        <div className={styles.container}>
            <Link className={styles.details} href={`/posts/${_id}`}>
                <Image
                    className={styles.blogImage}
                    src={image || './logo.svg'}
                    alt={title}
                    width={250}
                    height={300}
                />
                <p className={styles.title}>{title}</p>
                <p className={styles.description}>{description}</p>
            </Link>

            {isOwner && (
                <div className={styles.buttons}>
                    <button className={styles.editButton} onClick={handleEdit}>
                        <Image src='./edit.svg' height={20} width={20} alt='edit'></Image>
                    </button>
                    <button className={styles.deleteButton} onClick={handleDelete}>
                        <Image src='./delete.svg' height={20} width={20} alt='delete'></Image>
                    </button>
                </div>
            )}
        </div>
    );
};

export default Card;
