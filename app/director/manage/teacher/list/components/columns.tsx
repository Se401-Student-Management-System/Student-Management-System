"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Pencil, Trash } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

export interface Teacher {
  id: string;
  teacherName: string;
  gender: string;
  birthDate: string;
  position: string;
  class: string;
  subject: string;
  status: string;
  action: string;
}

export const columns: ColumnDef<Teacher>[] = [
  {
    accessorKey: "id",
    header: () => (
      <Button className="pl-0" variant="ghost" style={{ backgroundColor: "transparent" }}>
        MSGV
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("id")}</div>,
  },
  {
    accessorKey: "teacherName",
    header: () => (
      <Button className="pl-0" variant="ghost" style={{ backgroundColor: "transparent" }}>
        Họ tên
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("teacherName")}</div>,
  },
  {
    accessorKey: "gender",
    header: () => (
      <Button className="pl-0" variant="ghost" style={{ backgroundColor: "transparent" }}>
        Giới tính
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("gender")}</div>,
  },
  {
    accessorKey: "birthDate",
    header: () => (
      <Button className="pl-0" variant="ghost" style={{ backgroundColor: "transparent" }}>
        Ngày sinh
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("birthDate")}</div>,
  },
  {
    accessorKey: "position",
    header: () => (
      <Button className="pl-0" variant="ghost" style={{ backgroundColor: "transparent" }}>
        Chức vụ
      </Button>
    ),
    cell: ({ row }) => (
      <Badge>
        {row.getValue("position")}
      </Badge>
    ),
  },
  {
    accessorKey: "class",
    header: () => (
      <Button className="pl-0" variant="ghost" style={{ backgroundColor: "transparent" }}>
        Lớp
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("class")}</div>,
  },
  {
    accessorKey: "subject",
    header: () => (
      <Button className="pl-0" variant="ghost" style={{ backgroundColor: "transparent" }}>
        Môn
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("subject")}</div>,
  },
  {
    accessorKey: "status",
    header: () => (
      <Button className="pl-0" variant="ghost" style={{ backgroundColor: "transparent" }}>
        Tình trạng
      </Button>
    ),
    cell: ({ row }) => {
      const status = row.getValue("status");
      return (
        <Badge status={status as "inactive" | "active" | "onHold" | undefined}>
          {status === "active"
            ? "Đang làm"
            : status === "onHold"
            ? "Tạm nghỉ"
            : "Nghỉ"}
        </Badge>
      );
    },
  },
  {
    id: "action",
    header: "Action",
    cell: ({ row }) => (
      <div className="inline-flex justify-center items-center gap-2.5">
        <Trash color="red" />
        <Link href={`/director/manage/teacher/update/${row.getValue("id")}`}>
          <Pencil color="#01B3EF" />
        </Link>
      </div>
    ),
  },
];
