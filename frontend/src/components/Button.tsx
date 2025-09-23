"use client"

import * as React from "react";

type ButtonVariant = "primary" | "ghost" | "link"
type ButtonSize = "sm" | "md" | "lg"

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant
    size?: ButtonSize
    loading?: boolean
}

return (
    <button
)