"use client";

import React from "react";
import { Teacher } from "./columns";
import { Input } from "@/components/ui/input";
import { Table } from "@tanstack/react-table";

interface TableFilterProps {
  table: Table<Teacher>;
}

export function TableFilter({ table }: TableFilterProps) {
  return (
    <div>
      <Input
        placeholder="Tìm theo ID, tên, môn, ..."
        className="w-[300px]"
        onChange={(e) => table.setGlobalFilter(e.target.value)}
      />
    </div>
  );
}
