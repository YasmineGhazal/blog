'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';
import Auth from '../Auth/Auth';
import { ThemeContext } from '@/context/ThemeContext';
import { useRouter } from 'next/navigation';

const Light = () => (<Image src='/light_mode.svg' alt='light_mode_icon' className='mode-ico' height='30' width='30' />);
const Dark = () => (<Image src='/dark_mode.svg' alt='dark_mode_icon' className='mode-ico' height='30' width='30' />);

const Navbar = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const router = useRouter();

    return (
        <div className='navbar'>
            <div className='navbar-content'>
                <Link href='/' className='logo' onClick={() => router.reload()}>
                    <Image src='/logo.svg' alt='dark_mode_icon' className='mode-ico' height='75' width='50' />
                    <div className='title'>Write it</div>
                </Link>
                <div className='navbar-settings'>
                    <Auth />
                    <div className='mode' onClick={toggleTheme}>
                        {theme === 'light' ? <Dark /> : <Light />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
