"use client"

import { ChangeEvent, InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";


type SearchBarProps = InputHTMLAttributes<HTMLInputElement> & {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (value: string) => void;
    inputClassName?: string;
};

function SearchBar({value, onChange, onSubmit, inputClassName, className, ...props}: SearchBarProps) {
    return (
        <input
            value={value}
            onChange={onChange}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    onSubmit(value);
                }
            }}
            placeholder="Paste product link to track..."
            className={cn(
                "h-[4.5rem] w-[50rem] text-lg rounded-pill px-5 py-3 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-borderSlate text-textWhite placeholder:textGray focus:outline-none focus:ring-2 focus:ring-primaryPurpleHover/40 transition-colors shadow-soft",
                inputClassName,
            )}
            {...props}
        />
    );
}   

export default SearchBar;