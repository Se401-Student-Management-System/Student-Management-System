"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Pencil, Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface Student {
  id: string;
  studentName: string;
  gender: string;
  email: string;
  phone: string;
  class: string;
  nation: string;
  birthDate: string;
  address: string;
  status: string;
  action: string;
}

export const columns: ColumnDef<Student>[] = [
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
    accessorKey: "gender",
    header: ({ column }) => {
      return (
        <Button
          className="pl-0"
          variant="ghost"
          style={{ backgroundColor: "transparent" }}
        >
          Giới tính
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("gender")}</div>,
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
    accessorKey: "phone",
    header: ({ column }) => {
      return (
        <Button
          className="pl-0"
          variant="ghost"
          style={{ backgroundColor: "transparent" }}
        >
          Số điện thoại
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("phone")}</div>,
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
    accessorKey: "nation",
    header: ({ column }) => {
      return (
        <Button
          className="pl-0"
          variant="ghost"
          style={{ backgroundColor: "transparent" }}
        >
          Dân tộc
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("nation")}</div>,
  },
  {
    accessorKey: "birthDate",
    header: ({ column }) => {
      return (
        <Button
          className="pl-0"
          variant="ghost"
          style={{ backgroundColor: "transparent" }}
        >
          Ngày sinh
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("birthDate")}</div>,
  },
  {
    accessorKey: "address",
    header: ({ column }) => {
      return (
        <Button
          className="pl-0"
          variant="ghost"
          style={{ backgroundColor: "transparent" }}
        >
          Nơi sinh
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("address")}</div>,
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
        <Badge status={status as "inactive" | "active" | "onHold" | undefined}>
          {status === "active"
            ? "Đang học"
            : status === "onHold"
            ? "Đang bảo lưu"
            : "Hết hạn bảo lưu"}
        </Badge>
      );
    },
  },
  {
    id: "action",
    header: "Action",
    cell: ({ row }) => (
      <div className="self-stretch self-stretch inline-flex justify-center items-center gap-2.5">
        <Trash color="red" />
        <Link href={`/director/student/update/${row.getValue("id")}`}>
          <Pencil color="#01B3EF" />
        </Link>
      </div>
    ),
  },
];
