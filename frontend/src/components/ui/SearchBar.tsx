import { ChangeEvent, InputHTMLAttributes } from "react";

type SearchBarProps = InputHTMLAttributes<HTMLInputElement> & {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (value: string) => void;
    inputClassName?: string;
};

function SearchBar({value, onChange, onSubmit, inputClassName, ...props}: SearchBarProps) {
    return (
        <div>Hi</div>
    );
}

export default SearchBar;