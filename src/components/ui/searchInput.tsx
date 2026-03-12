"use client";

import { Search } from "lucide-react";
import { Input, InputProps } from "./input";
import { cn } from "@/lib/utils";

interface SearchInputProps extends InputProps {
    containerClassName?: string;
}

const SearchInput = ({ className, containerClassName, placeholder, ...props }: SearchInputProps) => {
    return (
        <div className={cn("relative w-full", containerClassName)}>
            <Input
                placeholder={placeholder}
                className={cn(
                    "pr-12",
                    className
                )}
                {...props}
            />
            <Search
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
            />
        </div>
    );
};

export default SearchInput;