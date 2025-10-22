import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import { GeistSans } from 'geist/font/sans';
import Navbar from '@/components/ui/Navbar';
import Providers from '@/components/Providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'DealSense',
  description: 'Track prices and find the best deals with AI-powered forecasting',
};

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${GeistSans.variable}`}>
      
      <body className="font-inter min-h-screen text-textWhite bg-aurora bg-fixed">
        <Providers>
          <Navbar brandText='DealSense'/>
          {children}
        </Providers>
      </body>
    </html>
  );
}
