import React from "react";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";

interface SearchDropdownProps {
    label: string;
    options: string[];
    onChange: (value: string) => void;
}

const SearchDropdown: React.FC<SearchDropdownProps> = ({ label, options, onChange }) => {
    return (
        <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">{label}</label>
            <Select onValueChange={onChange}>
                <SelectTrigger>
                    <span>Select {label}</span>
                </SelectTrigger>
                <SelectContent>
                    {options.map((option, index) => (
                        <SelectItem key={index} value={option}>
                            {option}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};

export default SearchDropdown;
