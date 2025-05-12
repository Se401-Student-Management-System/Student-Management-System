"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";

export interface AcademicReport {
  id: string;
  className: string;
  subject: string;
  excellent: number;
  good: number;
  average: number;
  weak: number;
  averageScore: number;
}

export const columns: ColumnDef<AcademicReport>[] = [
  {
    id: "stt",
    header: "STT",
    cell: ({ row }) => <div>{row.index + 1}</div>,
  },
  {
    accessorKey: "className",
    header: ({ column }) => (
      <Button
        className="pl-0"
        variant="ghost"
        style={{ backgroundColor: "transparent" }}
      >
        Tên lớp
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("className")}</div>,
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
    accessorKey: "excellent",
    header: ({ column }) => (
      <Button
        className="pl-0"
        variant="ghost"
        style={{ backgroundColor: "transparent" }}
      >
        Giỏi
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("excellent")}%</div>,
  },
  {
    accessorKey: "good",
    header: ({ column }) => (
      <Button
        className="pl-0"
        variant="ghost"
        style={{ backgroundColor: "transparent" }}
      >
        Khá
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("good")}%</div>,
  },
  {
    accessorKey: "average",
    header: ({ column }) => (
      <Button
        className="pl-0"
        variant="ghost"
        style={{ backgroundColor: "transparent" }}
      >
        Trung bình
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("average")}%</div>,
  },
  {
    accessorKey: "weak",
    header: ({ column }) => (
      <Button
        className="pl-0"
        variant="ghost"
        style={{ backgroundColor: "transparent" }}
      >
        Yếu
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("weak")}%</div>,
  },
  {
    accessorKey: "averageScore",
    header: ({ column }) => (
      <Button
        className="pl-0"
        variant="ghost"
        style={{ backgroundColor: "transparent" }}
      >
        Điểm trung bình
      </Button>
    ),
    cell: ({ row }) => <div>{(row.getValue("averageScore") as number).toFixed(1)}</div>,
  },
  {
    id: "action",
    header: "Action",
    cell: ({ row }) => {
      const router = useRouter();
      const reportId = row.original.id;

      return (
        <Button
          variant="ghost"
          size="icon"
          title="Xem chi tiết"
          onClick={() => router.push(`/teacher/class/record/detail/${reportId}`)}
          className="hover:bg-transparent p-0 h-auto w-auto"
        >
          <Eye className="h-4 w-4 text-muted-foreground hover:text-primary" />
        </Button>
      );
    },
  },
];