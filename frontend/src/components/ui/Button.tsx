"use client";

import * as React from "react";
import { HoverBorderGradient } from "@/components/hover-border-gradient";
import { cn } from "@/lib/utils";

type ButtonVariant = "neutral" | "unstyled" | "primaryGradient" | "hoverOutline";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
};

const VARIANTS: Record<ButtonVariant, string> = {
    neutral: "py-2 px-3 rounded-lg",
    unstyled: "",
    primaryGradient: "group relative overflow-hidden",
    hoverOutline: "",
};

function Button({ variant = "unstyled", className, type = "button", children, ...props }: ButtonProps) {
    // hoverOutline variant: compose HoverBorderGradient
    if (variant === 'hoverOutline') {
        return (
            <HoverBorderGradient 
                {...props}
                className={`active:scale-95 active:opacity-80 transition-transform ${className || ''}`}
            >
                {children}
            </HoverBorderGradient>
        );
    }

    // primaryGradient variant: layered gradient backgrounds
    if (variant === 'primaryGradient') {
        return (
            <button type={type} className={cn(VARIANTS.primaryGradient, className)} {...props}>
                <span className="absolute inset-0 bg-gradient-to-b from-primaryPurpleLight to-primaryPurple" />
                <span className="absolute inset-0 bg-gradient-to-b from-white/24 via-white/12 to-transparent" />
                <span className="relative z-10 flex items-center gap-3 text-onPrimaryPurple">{children}</span>
                <span className="absolute inset-0 rounded-full shadow-xl shadow-primaryPurple/40 group-hover:shadow-primaryPurple/60 transition-shadow duration-300" />
            </button>
        );
    }

    // default variants
    return (
        <button className={cn(VARIANTS[variant], className)} type={type} {...props}>{children}</button>
    );
}

export default Button;
