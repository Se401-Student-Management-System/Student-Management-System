"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

export interface Category {
  id: number;
  violationName: string;
  deductedPoints: string;
}

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          className="pl-0"
          variant="ghost"
          style={{ backgroundColor: "transparent" }}
        >
          ID
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("id")}</div>,
  },
  {
    accessorKey: "violationName",
    header: ({ column }) => {
      return (
        <Button
          className="pl-0"
          variant="ghost"
          style={{ backgroundColor: "transparent" }}
        >
          Tên vi phạm
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("violationName")}</div>,
  },
  {
    accessorKey: "deductedPoints",
    header: ({ column }) => {
      return (
        <Button
          className="pl-0"
          variant="ghost"
          style={{ backgroundColor: "transparent" }}
        >
          Điểm trừ
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("deductedPoints")}</div>,
  },
  {
    id: "action",
    header: "Action",
    cell: ({ row }) => (
      <div className="flex gap-4">
        <Link href={`/supervisor/category/update/${row.getValue("id")}`}>
          <Pencil color="#6DCFFB" className="cursor-pointer" />
        </Link>
        <Trash2 color="#E14177" className="cursor-pointer" />
      </div>
    ),
  },
];
