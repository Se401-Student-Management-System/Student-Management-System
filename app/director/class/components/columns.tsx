"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Layers, Pencil, Trash } from "lucide-react";

export interface Class {
  id: string;
  className: string;
  action: string;
}

export const columns: ColumnDef<Class>[] = [
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
    accessorKey: "className",
    header: ({ column }) => {
      return (
        <Button
          className="pl-0"
          variant="ghost"
          style={{ backgroundColor: "transparent" }}
        >
          Tên lớp
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("className")}</div>,
  },
  {
    id: "action",
    header: "Action",
    cell: ({ row }) => (
      <div className="self-stretch self-stretch inline-flex justify-center items-center gap-2.5">
        <Link href={`/director/class/arrange/${row.getValue("id")}/student`}>
          <Layers color="red" />
        </Link>
        <Trash color="#01B3EF" />
        <Link href={`/director/class/update/${row.getValue("id")}`}>
          <Pencil color="red" />
        </Link>
      </div>
    ),
  },
];
