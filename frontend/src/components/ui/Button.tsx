"use client";

import * as React from "react";
import { HoverBorderGradient } from "@/components/hover-border-gradient";

type ButtonVariant = "primary" | "neutral" | "link" | "primaryGradient" | "hoverOutline";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
};

const VARIANTS: Record<ButtonVariant, string> = {
    primary: "bg-primaryPurple text-onPrimaryPurple",
    neutral: "py-2 px-3 rounded-lg",
    link: "text-primaryPurple underline",
    primaryGradient: "group relative overflow-hidden",
    hoverOutline: "",
};

function Button({ variant = "primary", className, type = "button", children, ...props }: ButtonProps) {
    // hoverOutline variant: compose HoverBorderGradient
    if (variant === 'hoverOutline') {
        return (
            <HoverBorderGradient as={"button" as any} {...(props as any)} className={className}>
                {children}
            </HoverBorderGradient>
        );
    }

    // primaryGradient variant: layered gradient backgrounds
    if (variant === 'primaryGradient') {
        const classes = (className ? className + " " : "") + VARIANTS.primaryGradient;
        return (
            <button type={type} className={classes} {...props}>
                <span className="absolute inset-0 bg-gradient-to-b from-primaryPurpleLight to-primaryPurple" />
                <span className="absolute inset-0 bg-gradient-to-b from-white/24 via-white/12 to-transparent" />
                <span className="relative z-10 flex items-center gap-3 text-onPrimaryPurple">{children}</span>
                <span className="absolute inset-0 rounded-full shadow-xl shadow-primaryPurple/40 group-hover:shadow-primaryPurple/60 transition-shadow duration-300" />
            </button>
        );
    }

    // default variants
    const classes = (VARIANTS[variant] || "") + (className ? " " + className : "");
    return (
        <button className={classes} type={type} {...props}>{children}</button>
    );
}

export default Button;
