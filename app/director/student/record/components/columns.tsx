"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";

export interface StudentRecord {
  id: string;
  studentName: string;
  email: string;
  class: string;
  mathScore: string;
  physicalScore: string;
  chemistryScore: string;
  biologyScore: string;
  averageScore: string;
  grade: string;
  conduct: string;
  title: string;
}

export const columns: ColumnDef<StudentRecord>[] = [
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
    accessorKey: "studentName",
    header: ({ column }) => {
      return (
        <Button
          className="pl-0"
          variant="ghost"
          style={{ backgroundColor: "transparent" }}
        >
          Tên học sinh
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("studentName")}</div>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          className="pl-0"
          variant="ghost"
          style={{ backgroundColor: "transparent" }}
        >
          Email
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("email")}</div>,
  },
  {
    accessorKey: "class",
    header: ({ column }) => {
      return (
        <Button
          className="pl-0"
          variant="ghost"
          style={{ backgroundColor: "transparent" }}
        >
          Lớp học
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("class")}</div>,
  },
  {
    accessorKey: "mathScore",
    header: ({ column }) => {
      return (
        <Button
          className="pl-0"
          variant="ghost"
          style={{ backgroundColor: "transparent" }}
        >
          Toán học
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("mathScore")}</div>,
  },
  {
    accessorKey: "physicalScore",
    header: ({ column }) => {
      return (
        <Button
          className="pl-0"
          variant="ghost"
          style={{ backgroundColor: "transparent" }}
        >
          Vật lý
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("physicalScore")}</div>,
  },
  {
    accessorKey: "chemistryScore",
    header: ({ column }) => {
      return (
        <Button
          className="pl-0"
          variant="ghost"
          style={{ backgroundColor: "transparent" }}
        >
          Hóa học
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("chemistryScore")}</div>,
  },
  {
    accessorKey: "averageScore",
    header: ({ column }) => {
      return (
        <Button
          className="pl-0"
          variant="ghost"
          style={{ backgroundColor: "transparent" }}
        >
          Điểm trung bình
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("averageScore")}</div>,
  },
  {
    accessorKey: "grade",
    header: ({ column }) => {
      return (
        <Button
          className="pl-0"
          variant="ghost"
          style={{ backgroundColor: "transparent" }}
        >
          Học lực
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("grade")}</div>,
  },
  {
    accessorKey: "conduct",
    header: ({ column }) => {
      return (
        <Button
          className="pl-0"
          variant="ghost"
          style={{ backgroundColor: "transparent" }}
        >
          Hạnh kiểm
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("conduct")}</div>,
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          className="pl-0"
          variant="ghost"
          style={{ backgroundColor: "transparent" }}
        >
          Danh hiệu
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("title")}</div>,
  },
];
