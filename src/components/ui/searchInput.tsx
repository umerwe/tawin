import React from "react"
import { Search } from "lucide-react"
import { Input } from "./input"

interface SearchInputProps {
    className?: string;
    placeholder?: string;
}

const SearchInput = ({ className, placeholder }: SearchInputProps) => {
    return (
        <div className="relative w-[320px]">
            <Input
                className={className}
                placeholder={placeholder}
            />
            <Search
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                size={20}
            />
        </div>
    )
}

export default SearchInput