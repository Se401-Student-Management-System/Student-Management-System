"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

export interface Student {
  studentId: string;
  fullName: string;
  score: number;
}

export const columns: ColumnDef<Student>[] = [
  {
    id: "stt",
    header: "STT",
    cell: ({ row }) => <div>{row.index + 1}</div>,
  },
  {
    accessorKey: "studentId",
    header: ({ column }) => (
      <Button
        className="pl-0"
        variant="ghost"
        style={{ backgroundColor: "transparent" }}
      >
        Mã học sinh
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("studentId")}</div>,
  },
  {
    accessorKey: "fullName",
    header: ({ column }) => (
      <Button
        className="pl-0"
        variant="ghost"
        style={{ backgroundColor: "transparent" }}
      >
        Họ tên
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("fullName")}</div>,
  },
  {
    accessorKey: "score",
    header: ({ column }) => (
      <Button
        className="pl-0"
        variant="ghost"
        style={{ backgroundColor: "transparent" }}
      >
        Điểm số
      </Button>
    ),
    cell: ({ row }) => <div>{(row.getValue("score") as number).toFixed(1)}</div>,
  },
];