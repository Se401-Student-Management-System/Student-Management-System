"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

export interface ScoreEntry {
  id: string;
  className: string;
  subject: string;
  scoreFrequent?: string | null; // Thêm cột điểm thường xuyên
  score15Min1: string | null;
  score15Min2: string | null;
  score1Hour1: string | null;
  score1Hour2: string | null;
  finalScore: string | null;
  semester?: string;
  year?: string;
}

export const columns = (
  onViewDetails: (id: string) => void
): ColumnDef<ScoreEntry>[] => [
  {
    id: "stt",
    header: () => <div className="text-center">STT</div>,
    cell: ({ row }) => <div className="text-center">{row.index + 1}</div>,
  },
  {
    accessorKey: "className",
    header: () => (
      <div className="text-center">
        <Button className="pl-0" variant="ghost" style={{ backgroundColor: "transparent" }}>
          Tên lớp
        </Button>
      </div>
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue("className")}</div>,
  },
  {
    accessorKey: "subject",
    header: () => (
      <div className="text-center">
        <Button className="pl-0" variant="ghost" style={{ backgroundColor: "transparent" }}>
          Môn học
        </Button>
      </div>
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue("subject")}</div>,
  },
  {
    accessorKey: "scoreFrequent",
    header: () => (
      <div className="text-center">
        <Button className="pl-0" variant="ghost" style={{ backgroundColor: "transparent" }}>
          Điểm thường xuyên
        </Button>
      </div>
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue("scoreFrequent") ?? ""}</div>,
  },
  {
    accessorKey: "score15Min1",
    header: () => (
      <div className="text-center">
        <Button className="pl-0" variant="ghost" style={{ backgroundColor: "transparent" }}>
          Điểm 15 Phút lần 1
        </Button>
      </div>
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue("score15Min1") ?? ""}</div>,
  },
  {
    accessorKey: "score15Min2",
    header: () => (
      <div className="text-center">
        <Button className="pl-0" variant="ghost" style={{ backgroundColor: "transparent" }}>
          Điểm 15 Phút lần 2
        </Button>
      </div>
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue("score15Min2") ?? ""}</div>,
  },
  {
    accessorKey: "score1Hour1",
    header: () => (
      <div className="text-center">
        <Button className="pl-0" variant="ghost" style={{ backgroundColor: "transparent" }}>
          Điểm 1 Tiết lần 1
        </Button>
      </div>
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue("score1Hour1") ?? ""}</div>,
  },
  {
    accessorKey: "score1Hour2",
    header: () => (
      <div className="text-center">
        <Button className="pl-0" variant="ghost" style={{ backgroundColor: "transparent" }}>
          Điểm 1 Tiết lần 2
        </Button>
      </div>
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue("score1Hour2") ?? ""}</div>,
  },
  {
    accessorKey: "finalScore",
    header: () => (
      <div className="text-center">
        <Button className="pl-0" variant="ghost" style={{ backgroundColor: "transparent" }}>
          Điểm Cuối kỳ
        </Button>
      </div>
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue("finalScore") ?? ""}</div>,
  },
];