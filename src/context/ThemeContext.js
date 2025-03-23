'use client';
import { createContext, useEffect, useState } from 'react';
import React from 'react';

export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
    const [theme, setTheme] = useState(typeof window !== 'undefined' ? localStorage.getItem('theme')|| 'light' : 'light');

    const toggleTheme = () => {
        setTheme((theme) => theme ==='light' ? 'dark' : 'light');
    }

    useEffect(() => {
        localStorage.setItem('theme', theme)
    }, [theme]);

    return <ThemeContext.Provider value={{theme, toggleTheme}}>{children}</ThemeContext.Provider>
};
