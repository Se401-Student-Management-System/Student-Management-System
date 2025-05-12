"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

export interface ScoreEntry {
  id: string;
  className: string;
  subject: string;
  score15Min1: string | null;
  score15Min2: string | null;
  score1Hour1: string | null;
  score1Hour2: string | null;
  finalScore: string | null;
}

export const columns = (
  onViewDetails: (id: string) => void
): ColumnDef<ScoreEntry>[] => [
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
    accessorKey: "score15Min1",
    header: ({ column }) => (
      <Button
        className="pl-0"
        variant="ghost"
        style={{ backgroundColor: "transparent" }}
      >
        Điểm 15 Phút lần 1
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("score15Min1") ?? ""}</div>,
  },
  {
    accessorKey: "score15Min2",
    header: ({ column }) => (
      <Button
        className="pl-0"
        variant="ghost"
        style={{ backgroundColor: "transparent" }}
      >
        Điểm 15 Phút lần 2
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("score15Min2") ?? ""}</div>,
  },
  {
    accessorKey: "score1Hour1",
    header: ({ column }) => (
      <Button
        className="pl-0"
        variant="ghost"
        style={{ backgroundColor: "transparent" }}
      >
        Điểm 1 Tiết lần 1
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("score1Hour1") ?? ""}</div>,
  },
  {
    accessorKey: "score1Hour2",
    header: ({ column }) => (
      <Button
        className="pl-0"
        variant="ghost"
        style={{ backgroundColor: "transparent" }}
      >
        Điểm 1 Tiết lần 2
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("score1Hour2") ?? ""}</div>,
  },
  {
    accessorKey: "finalScore",
    header: ({ column }) => (
      <Button
        className="pl-0"
        variant="ghost"
        style={{ backgroundColor: "transparent" }}
      >
        Điểm Cuối kỳ
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("finalScore") ?? ""}</div>,
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => (
      <Button
        variant="ghost"
        onClick={() => onViewDetails(row.getValue("id"))}
        title="Xem chi tiết"
        className="hover:bg-transparent p-0 h-auto w-auto"
      >
        <Eye className="h-4 w-4 text-muted-foreground hover:text-primary" />
      </Button>
    ),
  },
];