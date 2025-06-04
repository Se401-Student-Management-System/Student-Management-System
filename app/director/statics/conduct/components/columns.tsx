"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";

export interface ConductStatics {
  studentId: string;
  fullName: string;
  className: string;
  behaviorScore: number;
  violationCount: number;
}

export const columns: ColumnDef<ConductStatics>[] = [
  {
    accessorKey: "studentId",
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
    cell: ({ row }) => <div>{row.getValue("studentId")}</div>,
  },
  {
    accessorKey: "fullName",
    header: ({ column }) => {
      return (
        <Button
          className="pl-0"
          variant="ghost"
          style={{ backgroundColor: "transparent" }}
        >
          Họ tên
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("fullName")}</div>,
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
          Lớp
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("className")}</div>,
  },
  {
    accessorKey: "behaviorScore",
    header: ({ column }) => {
      return (
        <Button
          className="pl-0"
          variant="ghost"
          style={{ backgroundColor: "transparent" }}
        >
          Điểm hạnh kiểm
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("behaviorScore")}</div>,
  },
  {
    accessorKey: "violationCount",
    header: ({ column }) => {
      return (
        <Button
          className="pl-0"
          variant="ghost"
          style={{ backgroundColor: "transparent" }}
        >
          Số lần vi phạm
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("violationCount")}</div>,
  },
];