"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

export interface ScoreEntry {
  subjectName: string;
  score15m1: number;
  score15m2: number;
  score1h1: number;
  score1h2: number;
  finalScore: number;
  semester?: number;
  academicYear?: string;
  comments?: string;
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
    accessorKey: "subjectName",
    header: () => (
      <div className="text-center">
        <Button className="pl-0" variant="ghost" style={{ backgroundColor: "transparent" }}>
          Môn học
        </Button>
      </div>
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue("subjectName")}</div>,
  },
  {
    accessorKey: "score15m1",
    header: () => (
      <div className="text-center">
        <Button className="pl-0" variant="ghost" style={{ backgroundColor: "transparent" }}>
          15 phút (1)
        </Button>
      </div>
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue("score15m1")}</div>,
  },
  {
    accessorKey: "score15m2",
    header: () => (
      <div className="text-center">
        <Button className="pl-0" variant="ghost" style={{ backgroundColor: "transparent" }}>
          15 phút (2)
        </Button>
      </div>
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue("score15m2")}</div>,
  },
  {
    accessorKey: "score1h1",
    header: () => (
      <div className="text-center">
        <Button className="pl-0" variant="ghost" style={{ backgroundColor: "transparent" }}>
          1 tiết (1)
        </Button>
      </div>
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue("score1h1")}</div>,
  },
  {
    accessorKey: "score1h2",
    header: () => (
      <div className="text-center">
        <Button className="pl-0" variant="ghost" style={{ backgroundColor: "transparent" }}>
          1 tiết (2)
        </Button>
      </div>
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue("score1h2")}</div>,
  },
  {
    accessorKey: "finalScore",
    header: () => (
      <div className="text-center">
        <Button className="pl-0" variant="ghost" style={{ backgroundColor: "transparent" }}>
          Điểm cuối kỳ
        </Button>
      </div>
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue("finalScore")}</div>,
  },
  {
    accessorKey: "comments",
    header: () => (
      <div className="text-center">
        <Button className="pl-0" variant="ghost" style={{ backgroundColor: "transparent" }}>
          Nhận xét
        </Button>
      </div>
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue("comments") ?? ""}</div>,
  },
];