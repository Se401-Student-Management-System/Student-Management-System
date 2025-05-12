"use client";
import React, { useState, useEffect, useCallback } from "react";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import { TableFilter } from "./components/table-filter";
import { DataTablePagination } from "./components/data-pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Download, Save } from "lucide-react";
import { toast } from "sonner";

interface Student {
  id: string;
  name: string;
  class: string;
  subject: string;
  averageScore: number;
  comments: string;
}

export default function ClassRatePage() {
  const [year, setYear] = useState<string>("2024");
  const [semester, setSemester] = useState<string>("Học kỳ 1");
  const [classId, setClassId] = useState<string>("10A1");
  const [search, setSearch] = useState<string>("");
  const [error, setError] = useState<string | undefined>(undefined);
  const [students, setStudents] = useState<Student[]>([]);
  const [isFormDirty, setIsFormDirty] = useState<boolean>(false);

  // Mock dữ liệu
  const yearList = ["2024", "2023", "2022", "2021"];
  const semesterList = ["Học kỳ 1", "Học kỳ 2"];
  const classList = ["10A1", "10A2", "11A1", "11A2"];
  const mockStudents: Student[] = [
    { id: "1", name: "Nguyễn Văn A", class: "10A1", subject: "Toán", averageScore: 8.5, comments: "" },
    { id: "1", name: "Nguyễn Văn A", class: "10A1", subject: "Văn", averageScore: 7.8, comments: "" },
    { id: "1", name: "Nguyễn Văn A", class: "10A1", subject: "Anh", averageScore: 9.0, comments: "" },
    { id: "2", name: "Trần Thị B", class: "10A1", subject: "Toán", averageScore: 7.5, comments: "" },
    { id: "2", name: "Trần Thị B", class: "10A1", subject: "Văn", averageScore: 8.0, comments: "" },
    { id: "2", name: "Trần Thị B", class: "10A1", subject: "Anh", averageScore: 8.2, comments: "" },
    { id: "3", name: "Lê Văn C", class: "10A2", subject: "Toán", averageScore: 6.5, comments: "" },
  ];

  useEffect(() => {
    // Mock API call
    const fetchData = async () => {
      try {
        // Giả lập gọi API
        setTimeout(() => {
          const filteredStudents = mockStudents.filter(
            (student) =>
              student.class === classId &&
              (student.name.toLowerCase().includes(search.toLowerCase()) ||
                student.subject.toLowerCase().includes(search.toLowerCase()))
          );
          setStudents(filteredStudents);
        }, 500);
      } catch (err) {
        setError("Không thể tải danh sách học sinh");
        toast.error("Không thể tải danh sách học sinh");
      }
    };
    fetchData();
  }, [year, semester, classId, search]);

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

  const handleCommentChange = useCallback(
    (studentId: string, subject: string, value: string) => {
      setStudents((prev) =>
        prev.map((student) =>
          student.id === studentId && student.subject === subject
            ? { ...student, comments: value }
            : student
        )
      );
      setIsFormDirty(true);
    },
    []
  );

  const handleSave = async () => {
    try {
      // Giả lập gọi API
      console.log("Saving comments:", students);
      toast.success("Lưu đánh giá thành công");
      setIsFormDirty(false);
    } catch (err) {
      toast.error("Lưu đánh giá thất bại");
    }
  };

  const handleExportExcel = () => {
    // Giả lập xuất Excel
    console.log("Exporting Excel for students:", students);
    toast.success("Đã xuất Excel thành công");
  };

  return (
    <div className="p-6">
      <div className="text-black text-base font-medium mb-6">
        Học tập / Lớp học / Đánh giá kết quả học
      </div>

      <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg">
        {/* Bộ lọc */}
        <form className="flex items-center gap-4">
          <TableFilter
            value={search}
            onChange={(value) => setSearch(value)}
            placeholder="Tìm kiếm học sinh hoặc môn học..."
          />
          <Select value={year} onValueChange={setYear}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Chọn năm học" />
            </SelectTrigger>
            <SelectContent>
              {yearList.map((y) => (
                <SelectItem key={y} value={y}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={semester} onValueChange={setSemester}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Chọn học kỳ" />
            </SelectTrigger>
            <SelectContent>
              {semesterList.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={classId} onValueChange={setClassId}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Chọn lớp học" />
            </SelectTrigger>
            <SelectContent>
              {classList.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </form>

        {/* Nút Lưu và Xuất Excel */}
        <div className="flex gap-4">
          <Button onClick={handleSave} variant="default">
            <Save className="mr-2 h-4 w-4" />
            Lưu
          </Button>
          <Button onClick={handleExportExcel} variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Xuất Excel
          </Button>
        </div>
      </div>

      {/* Thông báo lỗi */}
      {error && <p className="text-red-500 mb-6">{error}</p>}

      {/* Bảng dữ liệu */}
      <div className="bg-white p-4 rounded-lg overflow-x-auto">
        <DataTable
          columns={columns(handleCommentChange)}
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