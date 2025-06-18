"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
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

interface Subject {
  subjectId: number;
  subjectName: string;
}

export default function ClassRatePage() {
  const semesterList = ["Học kỳ 1", "Học kỳ 2"];
  const [year, setYear] = useState<string>("");
  const [semester, setSemester] = useState<string>("");
  const [classId, setClassId] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [error, setError] = useState<string | undefined>(undefined);
  const [students, setStudents] = useState<Student[]>([]);
  const [isFormDirty, setIsFormDirty] = useState<boolean>(false);
  const [yearList, setYearList] = useState<string[]>([]);
  const [classList, setClassList] = useState<string[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);

  // Fetch danh sách năm học từ API
  const fetchYearList = async () => {
    try {
      const res = await fetch("http://localhost:8080/teacher/years");
      if (!res.ok) throw new Error("Không thể tải danh sách năm học");
      const data = await res.json();
      setYearList(data);
      if (data.length > 0 && !year) setYear(data[0]);
    } catch (err: any) {
      setError("Không thể tải danh sách năm học");
      setYearList([]);
    }
  };

  // Fetch danh sách lớp học từ API (không cần truyền year)
  const fetchClassList = async () => {
    try {
      const res = await fetch("http://localhost:8080/teacher/classes");
      if (!res.ok) throw new Error("Không thể tải danh sách lớp học");
      const data = await res.json();
      setClassList(data);
      if (data.length > 0 && !classId) setClassId(data[0]);
    } catch (err: any) {
      setError("Không thể tải danh sách lớp học");
      setClassList([]);
    }
  };

  // Fetch danh sách môn học từ API thực tế
  const fetchSubjects = async () => {
    try {
      const teacherId = "GV001";
      if (!year || !semester) return;
      const res = await fetch(
        `http://localhost:8080/teacher/subjects?teacherId=${teacherId}&year=${encodeURIComponent(year)}&semester=${semester === "Học kỳ 1" ? 1 : 2}`
      );
      if (!res.ok) throw new Error("Không thể tải danh sách môn học");
      const data = await res.json();
      setSubjects(data);
    } catch (err: any) {
      setError("Không thể tải danh sách môn học");
      setSubjects([]);
    }
  };

  // Fetch danh sách học sinh đánh giá
  const fetchData = async () => {
    try {
      if (!year || !semester || !classId) return;
      const response = await fetch(
        `http://localhost:8080/teacher/class-rate?year=${encodeURIComponent(year)}&semester=${encodeURIComponent(semester)}&class=${encodeURIComponent(classId)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) throw new Error("Không thể tải danh sách học sinh");
      const data = await response.json();

      if (data.selectedYear) setYear(data.selectedYear);
      if (data.selectedSemester) setSemester(data.selectedSemester);
      if (data.selectedClass) setClassId(data.selectedClass);

      if (data.studentList && Array.isArray(data.studentList)) {
        setStudents(
          data.studentList.map((s: any) => ({
            id: s.studentId,
            name: s.fullName,
            class: data.selectedClass || classId,
            subject: s.subjectName,
            averageScore: s.averageScore || 0,
            comments: s.comments || "",
          }))
        );
      } else {
        setStudents([]);
      }
      setError(undefined);
    } catch (err: any) {
      setError("Không thể tải danh sách học sinh");
      toast.error("Không thể tải danh sách học sinh");
      setStudents([]);
    }
  };

  // Lấy danh sách năm học và lớp học khi load trang
  useEffect(() => {
    fetchYearList();
    fetchClassList();
  }, []);

  // Lấy danh sách môn học khi năm học hoặc học kỳ thay đổi
  useEffect(() => {
    if (year && semester) {
      fetchSubjects();
    }
  }, [year, semester]);

  // Lấy danh sách học sinh khi các filter thay đổi
  useEffect(() => {
    if (year && semester && classId) {
      fetchData();
    }
  }, [year, semester, classId, search]);

  // Theo dõi thay     đổi form
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

  // Memoize columns
  const memoizedColumns = useMemo(
    () => columns(handleCommentChange),
    [handleCommentChange]
  );

  const handleSave = async () => {
    try {
      const payload = students
        .map((student) => ({
          studentId: student.id,
          subjectId: subjects.find((s) => s.subjectName === student.subject)?.subjectId,
          comment: student.comments,
          semester: semester === "Học kỳ 1" ? 1 : 2,
          academicYear: year,
        }))
        .filter((item) => item.comment && item.comment.trim() !== "" && item.subjectId);

      if (payload.length === 0) {
        toast.error("Không có nhận xét hợp lệ để lưu");
        return;
      }

      const response = await fetch("http://localhost:8080/teacher/add-comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Lưu đánh giá thất bại");
      }

      toast.success("Lưu đánh giá thành công");
      setIsFormDirty(false);
    } catch (err: any) {
      console.error("Error saving comments:", err);
      toast.error(err.message || "Lưu đánh giá thất bại");
    }
  };

  const handleExportExcel = () => {
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
          {/* Dropdown chọn năm học */}
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
          {/* Dropdown chọn học kỳ */}
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
          {/* Dropdown chọn lớp học */}
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

      <div className="bg-white p-4 rounded-lg overflow-x-auto">
        <DataTable
          columns={memoizedColumns}
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