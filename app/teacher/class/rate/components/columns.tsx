"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export interface Student {
  id: string;
  name: string;
  class: string;
  subject: string;
  averageScore: number;
  comments: string;
}

export const columns = (
  onCommentChange: (studentId: string, subject: string, value: string) => void
): ColumnDef<Student>[] => [
  {
    id: "stt",
    header: "STT",
    cell: ({ row }) => <div>{row.index + 1}</div>,
  },
  {
    accessorKey: "id",
    header: ({ column }) => <Button variant="ghost">Mã học sinh</Button>,
    cell: ({ row }) => <div>{row.getValue("id")}</div>,
  },
  {
    accessorKey: "name",
    header: ({ column }) => <Button variant="ghost">Họ tên</Button>,
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "subject",
    header: ({ column }) => <Button variant="ghost">Môn học</Button>,
    cell: ({ row }) => <div>{row.getValue("subject")}</div>,
  },
  {
    accessorKey: "averageScore",
    header: ({ column }) => <Button variant="ghost">Điểm trung bình môn</Button>,
    cell: ({ row }) => <div>{row.getValue("averageScore")}</div>,
  },
  {
    accessorKey: "comments",
    header: ({ column }) => <Button variant="ghost">Nhận xét</Button>,
    cell: ({ row }) => {
      return (
        <Input
          value={row.getValue("comments")}
          onChange={(e) =>
            onCommentChange(
              row.getValue("id"),
              row.getValue("subject"),
              e.target.value
            )
          }
          placeholder="Nhập nhận xét..."
        />
      );
    },
  },
];