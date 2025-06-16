"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";

export interface SubjectReport {
  id: string; // subjectId
  subjectName: string;
  className: string;
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
    accessorKey: "className",
    header: "Lớp học",    
    cell: ({ row }) => <div>{row.getValue("className")}</div>,
  },
  {
    id: "action",
    header: "Action",
    cell: ({ row }) => {
      const router = useRouter();
      const subjectId = row.original.id;
      const subjectName = row.original.subjectName;
      const className = row.original.className;
      return (
        <Button
          variant="outline"
          size="icon"
          title="Xem chi tiết"
          onClick={() =>
            router.push(
              `/teacher/class/record/detail/${subjectId}?year=${encodeURIComponent(
                year
              )}&semester=${encodeURIComponent(semester)}&subjectId=${subjectId}&subjectName=${encodeURIComponent(
                subjectName
              )}&className=${encodeURIComponent(className)}`
            )
          }
        >
          <Eye className="h-4 w-4" />
        </Button>
      );
    },
  },
];