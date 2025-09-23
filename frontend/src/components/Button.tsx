"use client"

import * as React from "react";

type ButtonVariant = "primary" | "neutral" | "link"

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant
}

const VARIANTS: Record<ButtonVariant, string> = {
    primary: "bg-primaryPurple text-onPrimaryPurple",
    neutral: "bg-surfaceSlate text-textWhite",
    link: "text-primaryPurple underline",
}

export function Button({ variant = "primary", className, type = "button", children, ...props }: ButtonProps) {
    const classes = (VARIANTS[variant] || "") + (className ? " " + className : "")
    return (
        <button className = {classes} type = {type} {...props} >{children}</button>
    )

}
