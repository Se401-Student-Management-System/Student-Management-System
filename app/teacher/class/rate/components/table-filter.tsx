"use client";
import * as React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface TableFilterProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function TableFilter({
  value,
  onChange,
  placeholder = "Tìm kiếm...",
}: TableFilterProps) {
  return (
    <div className="relative">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-8 w-[200px]"
      />
    </div>
  );
}