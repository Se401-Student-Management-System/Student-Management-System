"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";

export interface StudentRecord {
  stt: number;
  studentId: string;
  studentName: string;
  className: string;
  mathScore: string;
  literatureScore: string;
  englishScore: string;
  averageScore: string;
  grade: string;
  conduct: string;
  title: string;
}

export const columns: ColumnDef<StudentRecord>[] = [
  {
    accessorKey: "stt",
    header: ({ column }) => (
      <Button className="pl-0" variant="ghost" style={{ backgroundColor: "transparent" }}>
        STT
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("stt")}</div>,
  },
  {
    accessorKey: "studentId",
    header: ({ column }) => (
      <Button className="pl-0" variant="ghost" style={{ backgroundColor: "transparent" }}>
        Mã HS
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("studentId")}</div>,
  },
  {
    accessorKey: "studentName",
    header: ({ column }) => (
      <Button className="pl-0" variant="ghost" style={{ backgroundColor: "transparent" }}>
        Họ tên
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("studentName")}</div>,
  },
  {
    accessorKey: "className",
    header: ({ column }) => (
      <Button className="pl-0" variant="ghost" style={{ backgroundColor: "transparent" }}>
        Lớp
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("className")}</div>,
  },
  {
    accessorKey: "mathScore",
    header: ({ column }) => (
      <Button className="pl-0" variant="ghost" style={{ backgroundColor: "transparent" }}>
        Toán học
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("mathScore")}</div>,
  },
  {
    accessorKey: "literatureScore",
    header: ({ column }) => (
      <Button className="pl-0" variant="ghost" style={{ backgroundColor: "transparent" }}>
        Ngữ Văn
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("literatureScore")}</div>,
  },
  {
    accessorKey: "englishScore",
    header: ({ column }) => (
      <Button className="pl-0" variant="ghost" style={{ backgroundColor: "transparent" }}>
        Tiếng Anh
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("englishScore")}</div>,
  },
  {
    accessorKey: "averageScore",
    header: ({ column }) => (
      <Button className="pl-0" variant="ghost" style={{ backgroundColor: "transparent" }}>
        Điểm Trung Bình
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("averageScore")}</div>,
  },
  {
    accessorKey: "grade",
    header: ({ column }) => (
      <Button className="pl-0" variant="ghost" style={{ backgroundColor: "transparent" }}>
        Học lực
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("grade")}</div>,
  },
  {
    accessorKey: "conduct",
    header: ({ column }) => (
      <Button className="pl-0" variant="ghost" style={{ backgroundColor: "transparent" }}>
        Hạnh kiểm
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("conduct")}</div>,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <Button className="pl-0" variant="ghost" style={{ backgroundColor: "transparent" }}>
        Danh hiệu
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("title")}</div>,
  },
];