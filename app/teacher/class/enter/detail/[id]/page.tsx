"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
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
  const [search, setSearch] = useState<string>("");
  const [error, setError] = useState<string | undefined>(undefined);
  const [students, setStudents] = useState<StudentScore[]>([]);
  const [classInfo, setClassInfo] = useState<ClassInfo | null>(null);
  const [isFormDirty, setIsFormDirty] = useState<boolean>(false);

  // Mock dữ liệu
  const mockStudents: StudentScore[] = [
    {
      id: "1",
      name: "Nguyễn Văn A",
      score15Min1: 8.0,
      score15Min2: 7.5,
      score1Hour1: 8.5,
      score1Hour2: 9.0,
      finalScore: 8.7,
    },
    {
      id: "2",
      name: "Trần Thị B",
      score15Min1: 7.0,
      score15Min2: null,
      score1Hour1: 7.5,
      score1Hour2: null,
      finalScore: null,
    },
    {
      id: "3",
      name: "Lê Văn C",
      score15Min1: null,
      score15Min2: null,
      score1Hour1: null,
      score1Hour2: null,
      finalScore: null,
    },
  ];

  const mockClassInfo: ClassInfo = {
    className: "10A1",
    subject: "Toán",
    year: "2024",
    semester: "Học kỳ 1",
  };

  useEffect(() => {
    // Mock API call: /api/teacher/class/enter/detail/[id]
    const fetchData = async () => {
      try {
        // Giả lập gọi API
        setTimeout(() => {
          const filteredStudents = mockStudents.filter(
            (student) =>
              student.name.toLowerCase().includes(search.toLowerCase()) ||
              student.id.toLowerCase().includes(search.toLowerCase())
          );
          setStudents(filteredStudents);
          setClassInfo(mockClassInfo); // Giả lập thông tin lớp
        }, 500);
      } catch (err) {
        setError("Không thể tải danh sách học sinh");
        toast.error("Không thể tải danh sách học sinh");
      }
    };
    fetchData();
  }, [id, search]);

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
      // Giả lập gọi API: /api/teacher/class/enter/detail/[id]/save
      console.log("Saving scores for class ID:", id, students);
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
    router.push("/teacher/class/enter/list");
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
        {/* Bộ lọc */}
        <form className="flex items-center gap-4">
          <TableFilter
            value={search}
            onChange={(value) => setSearch(value)}
            placeholder="Tìm kiếm học sinh..."
          />
        </form>

        {/* Nút Lưu và Quay lại */}
        <div className="flex gap-4">
          <Button onClick={handleSave} variant="default">
            <Save className="mr-2 h-4 w-4" />
            Lưu
          </Button>
          <Button onClick={handleBack} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại
          </Button>
        </div>
      </div>

      {/* Thông báo lỗi */}
      {error && <p className="text-red-500 mb-6">{error}</p>}

      {/* Bảng dữ liệu */}
      <div className="bg-white p-4 rounded-lg overflow-x-auto">
        <DataTable
          columns={columns(handleScoreChange)}
          data={students}
          isLoading={false}
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