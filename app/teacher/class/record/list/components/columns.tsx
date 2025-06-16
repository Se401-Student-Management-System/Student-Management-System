"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";

export interface SubjectReport {
  id: string; // subjectId
  subjectName: string;
}

export const columns = ({
  year,
  semester,
}: {
  year: string;
  semester: string;
}): ColumnDef<SubjectReport>[] => [
  {
    id: "stt",
    header: "STT",
    cell: ({ row }) => <div>{row.index + 1}</div>,
  },
  {
    accessorKey: "subjectName",
    header: "Môn học",
    cell: ({ row }) => <div>{row.getValue("subjectName")}</div>,
  },
  {
    id: "action",
    header: "Action",
    cell: ({ row }) => {
      const router = useRouter();
      const subjectId = row.original.id;
      return (
        <Button
          variant="outline"
          size="icon"
          title="Xem chi tiết"
          onClick={() =>
            router.push(
              `/teacher/class/record/detail/${subjectId}?year=${encodeURIComponent(
                year
              )}&semester=${encodeURIComponent(semester)}&subjectName=${encodeURIComponent(
                row.original.subjectName
              )}`
            )
          }
        >
          <Eye className="h-4 w-4" />
        </Button>
      );
    },
  },
];