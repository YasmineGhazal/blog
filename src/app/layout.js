import "./globals.css";
import React from 'react';
import Navbar from "../../components/navbar/Navbar";
import { ThemeContextProvider } from "../context/ThemeContext";
import ThemeProvider from "../providers/ThemeProvider";
import AuthProvider from '../providers/AuthProvider';

export const metadata = {
  title: "Blog",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.svg" sizes="any" />
      </head>
      <body>
        <ThemeContextProvider>
          <ThemeProvider>
            <AuthProvider>
              <Navbar />
              <div className='content'>
                {children}
              </div>
            </AuthProvider>
          </ThemeProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
