'use client'

import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SelectProps {
  items: { value: string; label: string }[];
  onValueChange: (value: string) => void;
}

export function Select({ items, onValueChange }: SelectProps) {
  const [selectedValue, setSelectedValue] = React.useState("");

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    onValueChange(value);
  };

  return (
    <div className="relative inline-block w-full">
      <DropdownMenu>
        <DropdownMenuTrigger className="block w-full px-4 py-2 text-left leading-tight bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded shadow appearance-none focus:outline-none focus:shadow-outline text-gray-700 dark:text-gray-300">
          {selectedValue || "Select an option"}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Select an Option</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {items.map((item) => (
            <DropdownMenuItem key={item.value} onClick={() => handleSelect(item.value)}>
              {item.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

// Usage example
export function App() {
  const handleValueChange = (value: string) => {
    console.log("Selected value:", value);
  };

  const options = [
    { value: "profile", label: "Profile" },
    { value: "billing", label: "Billing" },
    { value: "team", label: "Team" },
    { value: "subscription", label: "Subscription" },
  ];

  return (
    <div className="p-4">
      <Select items={options} onValueChange={handleValueChange} />
    </div>
  );
}
