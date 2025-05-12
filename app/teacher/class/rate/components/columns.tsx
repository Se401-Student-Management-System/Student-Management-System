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
    header: ({ column }) => (
      <Button
        className="pl-0"
        variant="ghost"
        style={{ backgroundColor: "transparent" }}
      >
        Mã học sinh
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("id")}</div>,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        className="pl-0"
        variant="ghost"
        style={{ backgroundColor: "transparent" }}
      >
        Họ tên
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "subject",
    header: ({ column }) => (
      <Button
        className="pl-0"
        variant="ghost"
        style={{ backgroundColor: "transparent" }}
      >
        Môn học
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("subject")}</div>,
  },
  {
    accessorKey: "averageScore",
    header: ({ column }) => (
      <Button
        className="pl-0"
        variant="ghost"
        style={{ backgroundColor: "transparent" }}
      >
        Điểm trung bình môn
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("averageScore")}</div>,
  },
  {
    accessorKey: "comments",
    header: ({ column }) => (
      <Button
        className="pl-0"
        variant="ghost"
        style={{ backgroundColor: "transparent" }}
      >
        Nhận xét
      </Button>
    ),
    cell: ({ row }) => (
      <Input
        key={`${row.getValue("id")}-${row.getValue("subject")}`} // Key duy nhất
        value={row.getValue("comments")}
        onChange={(e) =>
          onCommentChange(
            row.getValue("id"),
            row.getValue("subject"),
            e.target.value
          )
        }
        placeholder="Nhập nhận xét"
        className="w-full"
      />
    ),
  },
];