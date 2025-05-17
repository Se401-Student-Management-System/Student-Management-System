"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Trash2 } from "lucide-react";
import Link from "next/link"

export interface Fault {
  id: number;
  student_id: number;
  name: string;
  class: string;
  fault: string;
  minus_point: string;
} 

export const columns: ColumnDef<Fault>[] = [
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
      accessorKey: "student_id",
      header: ({ column }) => {
        return (
          <Button
            className="pl-0"
            variant="ghost"
            style={{ backgroundColor: "transparent" }}
          >
            Mã học sinh
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue("student_id")}</div>,
    },
      {
        accessorKey: "name",
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
        cell: ({ row }) => <div>{row.getValue("name")}</div>,
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
              Lớp
            </Button>
          );
        },
        cell: ({ row }) => <div>{row.getValue("class")}</div>,
      },
      {
        accessorKey: "fault",
        header: ({ column }) => {
          return (
            <Button
              className="pl-0"
              variant="ghost"
              style={{ backgroundColor: "transparent" }}
            >
              Lỗi vi phạm
            </Button>
          );
        },
        cell: ({ row }) => <div>{row.getValue("fault")}</div>,
      },
      {
        accessorKey: "minus_point",
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
        cell: ({ row }) => <div>{row.getValue("minus_point")}</div>,
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
]