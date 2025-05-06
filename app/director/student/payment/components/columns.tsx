"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";

export interface StudentPayment {
  id: string;
  studentName: string;
  email: string;
  class: string;
  status: string;
  debt: string;
}

export const columns: ColumnDef<StudentPayment>[] = [
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
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          className="pl-0"
          variant="ghost"
          style={{ backgroundColor: "transparent" }}
        >
          Hoạt động
        </Button>
      );
    },
    cell: ({ row }) => {
      const status = row.getValue("status");

      return (
        <Badge status={status as "pending" | "paid" | undefined}>
          {status === "pending" ? "Đang nợ" : status === "paid" ? "Đã thu" : ""}
        </Badge>
      );
    },
  },
  {
    accessorKey: "debt",
    header: ({ column }) => {
      return (
        <Button
          className="pl-0"
          variant="ghost"
          style={{ backgroundColor: "transparent" }}
        >
          Tiền nợ
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("debt")}</div>,
  },
];
