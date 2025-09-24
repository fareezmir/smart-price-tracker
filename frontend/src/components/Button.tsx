"use client"

import * as React from "react";

type ButtonVariant = "primary" | "neutral" | "link"

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant
    appearance?: 'solid' | 'gradient'
}

const VARIANTS: Record<ButtonVariant, string> = {
    primary: "bg-primaryPurple text-onPrimaryPurple",
    neutral: "bg-surfaceSlate text-textWhite",
    link: "text-primaryPurple underline",
}

export function Button({ variant = "primary", appearance = 'solid', className, type = "button", children, ...props }: ButtonProps) {
    // Gradient appearance for primary: render layered backgrounds
    if (appearance === 'gradient' && variant === 'primary') {
        const classes = (className ? className + " " : "") + "group relative overflow-hidden"
        return (
            <button type={type} className={classes} {...props}>
                {/* Base violet gradient */}
                <span className="absolute inset-0 bg-gradient-to-b from-primaryPurpleLight to-primaryPurple" />
                {/* Subtle gloss */}
                <span className="absolute inset-0 bg-gradient-to-b from-white/24 via-white/12 to-transparent" />
                {/* Content */}
                <span className="relative z-10 flex items-center gap-3 text-onPrimaryPurple">{children}</span>
                {/* Soft outer shadow */}
                <span className="absolute inset-0 rounded-full shadow-xl shadow-primaryPurple/40 group-hover:shadow-primaryPurple/60 transition-shadow duration-300" />
            </button>
        )
    }

    // Solid appearance (default): color-only variant classes
    const classes = (VARIANTS[variant] || "") + (className ? " " + className : "")
    return (
        <button className={classes} type={type} {...props}>{children}</button>
    )

}
