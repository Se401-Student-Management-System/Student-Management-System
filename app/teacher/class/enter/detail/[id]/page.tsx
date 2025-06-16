"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import { TableFilter } from "./components/table-filter";
import { DataTablePagination } from "./components/data-pagination";
import { Button } from "@/components/ui/button";
import { Save, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

interface StudentScore {
  id: string;
  name: string;
  score15Min1: number | null;
  score15Min2: number | null;
  score1Hour1: number | null;
  score1Hour2: number | null;
  finalScore: number | null;
  averageScore: number | null;
}

interface ClassInfo {
  className: string;
  subject: string;
  year: string;
  semester: string;
}

export default function ClassEnterDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState<string>("");
  const [error, setError] = useState<string | undefined>(undefined);
  const [students, setStudents] = useState<StudentScore[]>([]);
  const [originalStudents, setOriginalStudents] = useState<StudentScore[]>([]);
  const [changedScores, setChangedScores] = useState<Record<string, Partial<StudentScore>>>({});
  const [classInfo, setClassInfo] = useState<ClassInfo | null>(null);
  const [isFormDirty, setIsFormDirty] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Giả định lấy teacherId từ context hoặc token
  const teacherId = "GV001";
  const semester = searchParams.get("semester") || "1"; // Lấy từ query, fallback là 1
  const academicYear = searchParams.get("year") || "2024-2025"; // Lấy từ query, fallback là 2024-2025

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(undefined);
      try {
        // Phân tách id và giải mã subjectName
        const [className, encodedSubjectName] = (id as string).split("-");
        const subjectName = decodeURIComponent(encodedSubjectName);

        const response = await fetch(
          `http://localhost:8080/teacher/enter-next?teacherId=${teacherId}&className=${encodeURIComponent(
            className
          )}&subjectName=${encodeURIComponent(subjectName)}&semester=${semester}&academicYear=${encodeURIComponent(academicYear)}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Không thể tải danh sách điểm");
        }

        const data = await response.json();
        if (data.length === 0) {
          throw new Error("Không có dữ liệu điểm cho lớp/môn học này");
        }

        // Map dữ liệu từ ScoreInputDetailDTO sang StudentScore
        const formattedStudents: StudentScore[] = data.map((item: any) => ({
          id: item.studentId,
          name: item.fullName,
          score15Min1: item.score15m1,
          score15Min2: item.score15m2,
          score1Hour1: item.score1h1,
          score1Hour2: item.score1h2,
          finalScore: item.finalScore,
          averageScore: item.averageScore,
        }));

        // Lọc theo tìm kiếm (client-side)
        const filteredStudents = formattedStudents.filter(
          (student) =>
            student.name.toLowerCase().includes(search.toLowerCase()) ||
            student.id.toLowerCase().includes(search.toLowerCase())
        );

        setStudents(filteredStudents);
        setOriginalStudents(formattedStudents);
        setClassInfo({
          className,
          subject: subjectName,
          year: academicYear,
          semester: `Học kỳ ${semester}`,
        });
      } catch (err: any) {
        setError(err.message || "Không thể tải danh sách học sinh");
        toast.error(err.message || "Không thể tải danh sách học sinh");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, search, semester, academicYear]); // Thêm semester và academicYear vào dependencies

  // Theo dõi thay đổi form
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isFormDirty) {
        event.preventDefault();
        event.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isFormDirty]);

  const handleScoreChange = useCallback(
    (studentId: string, field: keyof StudentScore, value: string) => {
      const numericValue = value === "" ? null : parseFloat(value);
      if (numericValue !== null && (isNaN(numericValue) || numericValue < 0 || numericValue > 10)) {
        toast.error("Điểm phải từ 0 đến 10");
        return;
      }
      setStudents((prev) =>
        prev.map((student) =>
          student.id === studentId ? { ...student, [field]: numericValue } : student
        )
      );
      setIsFormDirty(true);
    },
    []
  );

  const handleSave = async () => {
    try {
      const [className, encodedSubjectName] = (id as string).split("-");
      const subjectName = decodeURIComponent(encodedSubjectName);
      const scoreRequest = {
        subjectId: 1, // Thay bằng logic lấy subjectId từ API/context
        semester: parseInt(semester), // Sử dụng semester từ query
        academicYear, // Sử dụng academicYear từ query
        scores: students.map((student) => ({
          studentId: student.id,
          score15m1: student.score15Min1,
          score15m2: student.score15Min2,
          score1h1: student.score1Hour1,
          score1h2: student.score1Hour2,
          finalScore: student.finalScore,
        })),
      };

      const response = await fetch("http://localhost:8080/teacher/enter-scores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(scoreRequest),
      });

      if (!response.ok) {
        throw new Error("Lưu điểm thất bại");
      }

      toast.success("Lưu điểm thành công");
      setIsFormDirty(false);
    } catch (err) {
      toast.error("Lưu điểm thất bại");
    }
  };

  const handleBack = () => {
    if (isFormDirty && !confirm("Bạn có thay đổi chưa lưu. Có muốn tiếp tục rời trang?")) {
      return;
    }
    router.push(`/teacher/class/enter/list?semester=${semester}&year=${encodeURIComponent(academicYear)}`);
  };

  return (
    <div className="p-6">
      <div className="text-black text-base font-medium mb-6">
        Học tập / Lớp học / Nhập điểm
      </div>

      {classInfo && (
        <div className="mb-6 text-gray-600">
          Lớp: {classInfo.className} | Môn: {classInfo.subject} | Năm học: {classInfo.year} | Học kỳ: {classInfo.semester}
        </div>
      )}

      <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg">
        <form className="flex items-center gap-4">
          <TableFilter
            value={search}
            onChange={(value) => setSearch(value)}
            placeholder="Tìm kiếm học sinh..."
          />
        </form>

        <div className="flex gap-4">
          <Button onClick={handleSave} variant="default" disabled={isLoading}>
            <Save className="mr-2 h-4 w-4" />
            Lưu
          </Button>
          <Button onClick={handleBack} variant="outline" disabled={isLoading}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại
          </Button>
        </div>
      </div>

      {error && <p className="text-red-500 mb-6">{error}</p>}

      <div className="bg-white p-4 rounded-lg overflow-x-auto">
        <DataTable
          columns={columns(handleScoreChange)}
          data={students}
          isLoading={isLoading}
          error={error}
        />
        <DataTablePagination
          pageCount={Math.ceil(students.length / 10)}
          pageIndex={0}
          pageSize={10}
          onPageChange={() => {}}
        />
      </div>
    </div>
  );
}