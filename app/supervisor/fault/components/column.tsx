"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Trash2 } from "lucide-react";
import Link from "next/link"

export interface Fault {
  id: number;
  studentId: string;
  fullName: string;
  className: string;
  faultDetail: string;
  minusPoint: number;
}

export const columns: ColumnDef<Fault>[] = [
  {
    accessorKey: "id",
    header: () => (
      <Button className="pl-0" variant="ghost" style={{ backgroundColor: "transparent" }}>
        ID
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("id")}</div>,
  },
  {
    accessorKey: "studentId",
    header: () => (
      <Button className="pl-0" variant="ghost" style={{ backgroundColor: "transparent" }}>
        Mã học sinh
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("studentId")}</div>,
  },
  {
    accessorKey: "fullName",
    header: () => (
      <Button className="pl-0" variant="ghost" style={{ backgroundColor: "transparent" }}>
        Tên học sinh
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("fullName")}</div>,
  },
  {
    accessorKey: "className",
    header: () => (
      <Button className="pl-0" variant="ghost" style={{ backgroundColor: "transparent" }}>
        Lớp
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("className")}</div>,
  },
  {
    accessorKey: "faultDetail",
    header: () => (
      <Button className="pl-0" variant="ghost" style={{ backgroundColor: "transparent" }}>
        Lỗi vi phạm
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("faultDetail")}</div>,
  },
  {
    accessorKey: "minusPoint",
    header: () => (
      <Button className="pl-0" variant="ghost" style={{ backgroundColor: "transparent" }}>
        Điểm trừ
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("minusPoint")}</div>,
  },
  {
    id: "action",
    header: "Action",
    cell: ({ row }) => (
      <div className="flex gap-4">
        <Link href={`/supervisor/fault/detail/${row.getValue("id")}`}>
          <Eye color="#6DCFFB" className="cursor-pointer" />
        </Link>
        <Trash2 color="#E14177" className="cursor-pointer" />
      </div>
    ),
  },
];