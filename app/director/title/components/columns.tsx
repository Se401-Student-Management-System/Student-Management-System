"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Pencil, Trash } from "lucide-react";

export interface Title {
  id: string;
  titleName: string;
  minGrade: string;
  minConduct: string;
  action: string;
}

export const columns: ColumnDef<Title>[] = [
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
    accessorKey: "titleName",
    header: ({ column }) => {
      return (
        <Button
          className="pl-0"
          variant="ghost"
          style={{ backgroundColor: "transparent" }}
        >
          Tên danh hiệu
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("titleName")}</div>,
  },
  {
    accessorKey: "minGrade",
    header: ({ column }) => {
      return (
        <Button
          className="pl-0"
          variant="ghost"
          style={{ backgroundColor: "transparent" }}
        >
          Điểm trung bình tối thiểu
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("minGrade")}</div>,
  },
  {
    accessorKey: "minConduct",
    header: ({ column }) => {
      return (
        <Button
          className="pl-0"
          variant="ghost"
          style={{ backgroundColor: "transparent" }}
        >
          Điểm hạnh kiểm tối thiểu
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("minConduct")}</div>,
  },
  {
    id: "action",
    header: "Action",
    cell: ({ row }) => (
      <div className="self-stretch self-stretch inline-flex justify-center items-center gap-2.5">
        <Trash color="red" />
        <Link href={`/director/title/update/${row.getValue("id")}`}>
          <Pencil color="#01B3EF" />
        </Link>
      </div>
    ),
  },
];
