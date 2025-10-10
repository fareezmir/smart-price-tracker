"use client"

import { ChangeEvent, InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { SearchIcon } from "@/components/ui/Icons";

type SearchBarProps = InputHTMLAttributes<HTMLInputElement> & {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (value: string) => void;
    inputClassName?: string;
};

function SearchBar({value, onChange, onSubmit, inputClassName, className, ...props}: SearchBarProps) {
    return (
        <div className={cn(
          "flex items-center w-full max-w-[50rem] h-[3.5rem] md:h-[4.5rem] rounded-pill px-4",
          "bg-white/5 hover:bg-white/10 backdrop-blur-md border border-borderSlate",
          "focus-within:ring-2 focus-within:ring-primaryPurpleHover/40 transition-colors shadow-soft",
          inputClassName,
          className
        )}>
          <SearchIcon size={20} className="text-textGray m-3 flex-shrink-0" />
          <input
            {...props}
            value={value}
            onChange={onChange}
            onKeyDown={(e) => e.key === 'Enter' && onSubmit(value)}
            placeholder="Paste product link to track..."
            className="flex-1 bg-transparent border-none outline-none text-textWhite placeholder:text-gray-400 text-base md:text-xl"
          />
        </div>
      );
}   

export default SearchBar;