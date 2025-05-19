"use client";

import React from "react";
import { Supervisor } from "./columns";
import { Input } from "@/components/ui/input";
import { Table } from "@tanstack/react-table";

interface TableFilterProps {
  table: Table<Supervisor>;
}

export function TableFilter({ table }: TableFilterProps) {
  return (
    <div>
      <Input
        placeholder="Tìm theo ID, tên, ..."
        className="w-[300px]"
        onChange={(e) => table.setGlobalFilter(e.target.value)}
      />
    </div>
  );
}
