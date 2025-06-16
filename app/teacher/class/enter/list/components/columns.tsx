"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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
  onViewDetails: (id: string) => void,
  semester: string,
  academicYear: string
): ColumnDef<ScoreEntry>[] => [
  {
    id: "stt",
    header: "STT",
    cell: ({ row }) => <div>{row.index + 1}</div>,
  },
  {
    id: "id",
    accessorKey: "id",
    header: ({ column }) => (
      <Button
        className="pl-0"
        variant="ghost"
        style={{ backgroundColor: "transparent" }}
      >
        Mã định danh
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("id")}</div>,
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
    cell: ({ row }) => {
      const router = useRouter();
      const handleViewDetailsWithApi = async () => {
        try {
          const [className, subjectName] = (row.getValue("id") as string).split("-");
          const decodedSubjectName = decodeURIComponent(subjectName);
          const teacherId = "GV001"; // Thay bằng logic lấy từ context/token

          const response = await fetch(
            `http://localhost:8080/teacher/enter-next?teacherId=${teacherId}&className=${encodeURIComponent(
              className
            )}&subjectName=${encodeURIComponent(decodedSubjectName)}&semester=${semester}&academicYear=${academicYear}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (!response.ok) {
            throw new Error("Không thể tải dữ liệu điểm");
          }

          const data = await response.json();
          if (data && data.length > 0) {
            const encodedId = `${className}-${encodeURIComponent(decodedSubjectName)}`;
            onViewDetails(encodedId);
          } else {
            toast.error("Không có dữ liệu điểm cho lớp/môn học này");
          }
        } catch (err) {
          toast.error("Không thể tải dữ liệu điểm");
        }
      };

      return (
        <Button
          variant="ghost"
          onClick={handleViewDetailsWithApi}
          title="Xem chi tiết"
          className="hover:bg-transparent p-0 h-auto w-auto"
        >
          <Eye className="h-4 w-4 text-muted-foreground hover:text-primary" />
        </Button>
      );
    },
  },
];