"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export interface StudentScore {
  id: string;
  name: string;
  score15Min1: number | null;
  score15Min2: number | null;
  score1Hour1: number | null;
  score1Hour2: number | null;
  finalScore: number | null;
  averageScore: number | null;
}

export const columns = (
  onScoreChange: (studentId: string, field: keyof StudentScore, value: string) => void
): ColumnDef<StudentScore>[] => [
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
    accessorKey: "score15Min1",
    header: ({ column }) => (
      <Button
        className="pl-0"
        variant="ghost"
        style={{ backgroundColor: "transparent" }}
      >
        15 Phút lần 1
      </Button>
    ),
    cell: ({ row }) => (
      <Input
        key={`${row.getValue("id")}-score15Min1`}
        type="number"
        step="0.1"
        min="0"
        max="10"
        value={row.getValue("score15Min1") ?? ""}
        onChange={(e) => onScoreChange(row.getValue("id"), "score15Min1", e.target.value)}
        placeholder="Nhập điểm"
        className="w-24"
      />
    ),
  },
  {
    accessorKey: "score15Min2",
    header: ({ column }) => (
      <Button
        className="pl-0"
        variant="ghost"
        style={{ backgroundColor: "transparent" }}
      >
        15 Phút lần 2
      </Button>
    ),
    cell: ({ row }) => (
      <Input
        key={`${row.getValue("id")}-score15Min2`}
        type="number"
        step="0.1"
        min="0"
        max="10"
        value={row.getValue("score15Min2") ?? ""}
        onChange={(e) => onScoreChange(row.getValue("id"), "score15Min2", e.target.value)}
        placeholder="Nhập điểm"
        className="w-24"
      />
    ),
  },
  {
    accessorKey: "score1Hour1",
    header: ({ column }) => (
      <Button
        className="pl-0"
        variant="ghost"
        style={{ backgroundColor: "transparent" }}
      >
        1 Tiết lần 1
      </Button>
    ),
    cell: ({ row }) => (
      <Input
        key={`${row.getValue("id")}-score1Hour1`}
        type="number"
        step="0.1"
        min="0"
        max="10"
        value={row.getValue("score1Hour1") ?? ""}
        onChange={(e) => onScoreChange(row.getValue("id"), "score1Hour1", e.target.value)}
        placeholder="Nhập điểm"
        className="w-24"
      />
    ),
  },
  {
    accessorKey: "score1Hour2",
    header: ({ column }) => (
      <Button
        className="pl-0"
        variant="ghost"
        style={{ backgroundColor: "transparent" }}
      >
        1 Tiết lần 2
      </Button>
    ),
    cell: ({ row }) => (
      <Input
        key={`${row.getValue("id")}-score1Hour2`}
        type="number"
        step="0.1"
        min="0"
        max="10"
        value={row.getValue("score1Hour2") ?? ""}
        onChange={(e) => onScoreChange(row.getValue("id"), "score1Hour2", e.target.value)}
        placeholder="Nhập điểm"
        className="w-24"
      />
    ),
  },
  {
    accessorKey: "finalScore",
    header: ({ column }) => (
      <Button
        className="pl-0"
        variant="ghost"
        style={{ backgroundColor: "transparent" }}
      >
        Cuối kỳ
      </Button>
    ),
    cell: ({ row }) => (
      <Input
        key={`${row.getValue("id")}-finalScore`}
        type="number"
        step="0.1"
        min="0"
        max="10"
        value={row.getValue("finalScore") ?? ""}
        onChange={(e) => onScoreChange(row.getValue("id"), "finalScore", e.target.value)}
        placeholder="Nhập điểm"
        className="w-24"
      />
    ),
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
    cell: ({ row }) => {
      const average = row.getValue("averageScore");
      return <div>{average ? Number(average).toFixed(1) : ""}</div>;
    },
  },
];