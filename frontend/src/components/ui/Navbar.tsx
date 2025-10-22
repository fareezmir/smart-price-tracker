"use client"
import { useSession, signOut } from "next-auth/react";
import { useRouter } from 'next/navigation';

import React from "react";
import Button from "./Button";

type NavbarProps = {
    brandText: string; 
    iconSrc?: string;
    onTrackedItems?: () => void;
};

function Navbar({ brandText, onTrackedItems, iconSrc}: NavbarProps): React.JSX.Element {
    
    const { data: session, status } = useSession();
    const router = useRouter();
    const signIn = () => router.push("/auth/signin");
    
    const isAuthenticated = status === "authenticated";

    const navbarLinks = {
        authenticated: [
          { label: "Tracked Items", onClick: onTrackedItems, hoverClass: "hover:bg-white/10 transition-colors" },
          { label: "Logout", onClick: () => signOut(), hoverClass: "hover:bg-white/10 transition-colors" }
        ],
        unauthenticated: [
          { label: "Login", onClick: () => signIn(), hoverClass: "hover:bg-white/10 transition-colors" }
        ]
    };
    
    const currentLinks = isAuthenticated ? navbarLinks.authenticated : navbarLinks.unauthenticated;
    
    return (
        <div className = "sticky top-14 z-50 hw-screen flex justify-center items-center h-24">
            <div className = "flex gap-6 py-5 px-10 dark:bg-neutral-800/30 bg-white/30 backdrop-blur-md rounded-full">
                <Button variant="neutral">{brandText}</Button>
                <div className="flex gap-2">
                    {currentLinks.map((link, index) => (
                        <Button 
                            key={index}
                            variant="neutral" 
                            onClick={link.onClick}
                            className={link.hoverClass}
                        >
                            {link.label}
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Navbar;