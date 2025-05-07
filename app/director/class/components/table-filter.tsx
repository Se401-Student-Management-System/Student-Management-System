"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Table } from "@tanstack/react-table";

interface TableFilterProps<TData> {
  table: Table<TData>;
}

export function TableFilter<TData>({ table }: TableFilterProps<TData>) {
  return (
    <div>
      <Input
        placeholder="Tìm theo ID, tên, lớp,..."
        className="w-[300px]"
        onChange={(e) => table.setGlobalFilter(e.target.value)}
      />
    </div>
  );
}
