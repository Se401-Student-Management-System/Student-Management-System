"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Pencil, Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface Teacher {
  id: string;
  teacherName: string;
  gender: string;
  class: string;
  position: string;
  subject: string;
  birthDate: string;
  status: string;
  action: string;
}

export const columns: ColumnDef<Teacher>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <Button className="pl-0" variant="ghost" style={{ backgroundColor: "transparent" }}>
        ID
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("id")}</div>,
  },
  {
    accessorKey: "teacherName",
    header: ({ column }) => (
      <Button className="pl-0" variant="ghost" style={{ backgroundColor: "transparent" }}>
        Tên giáo viên
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("teacherName")}</div>,
  },
  {
    accessorKey: "gender",
    header: ({ column }) => (
      <Button className="pl-0" variant="ghost" style={{ backgroundColor: "transparent" }}>
        Giới tính
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("gender")}</div>,
  },
  {
    accessorKey: "class",
    header: ({ column }) => (
      <Button className="pl-0" variant="ghost" style={{ backgroundColor: "transparent" }}>
        Lớp
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("class")}</div>,
  },
  {
    accessorKey: "position",
    header: ({ column }) => (
      <Button className="pl-0" variant="ghost" style={{ backgroundColor: "transparent" }}>
        Chức vụ
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("position")}</div>,
  },
  {
    accessorKey: "subject",
    header: ({ column }) => (
      <Button className="pl-0" variant="ghost" style={{ backgroundColor: "transparent" }}>
        Môn dạy
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("subject")}</div>,
  },
  {
    accessorKey: "birthDate",
    header: ({ column }) => (
      <Button className="pl-0" variant="ghost" style={{ backgroundColor: "transparent" }}>
        Ngày sinh
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("birthDate")}</div>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <Button className="pl-0" variant="ghost" style={{ backgroundColor: "transparent" }}>
        Trạng thái
      </Button>
    ),
    cell: ({ row }) => {
      const status = row.getValue("status");
      return (
        <Badge status={status as "inactive" | "active" | "onHold" | undefined}>
          {status === "active"
            ? "Đang dạy"
            : status === "onHold"
            ? "Tạm nghỉ"
            : "Nghỉ việc"}
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
        <Link href={`/director/teacher/update/${row.getValue("id")}`}>
          <Pencil color="#01B3EF" />
        </Link>
      </div>
    ),
  },
];
