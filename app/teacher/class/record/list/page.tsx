"use client";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";

interface SubjectReport {
  id: string; // subjectId
  subjectName: string;
}

export default function ClassRecordListPage() {
  const [subjects, setSubjects] = useState<SubjectReport[]>([]);
  const [year, setYear] = useState("2024-2025");
  const [semester, setSemester] = useState("Học kỳ 1");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const yearList = ["2024-2025", "2023-2024"];
  const semesterList = ["Học kỳ 1", "Học kỳ 2"];

  useEffect(() => {
    const fetchSubjects = async () => {
      setLoading(true);
      setError(null);
      try {
        const teacherId = localStorage.getItem("userId");
        const semesterNum = semester === "Học kỳ 1" ? 1 : 2;
        const res = await fetch(
          `http://localhost:8080/teacher/subjects?teacherId=${teacherId}&year=${year}&semester=${semesterNum}`
        );
        const data = await res.json();
        if (Array.isArray(data)) {
          setSubjects(data);
        } else {
          setSubjects([]);
          setError("Dữ liệu trả về không hợp lệ.");
        }
      } catch (e) {
        setSubjects([]);
        setError("Không thể tải danh sách môn học.");
      } finally {
        setLoading(false);
      }
    };
    fetchSubjects();
  }, [year, semester]);

  // Filter and paginate
  const filteredSubjects = subjects.filter(
    (subject) =>
      subject.subjectName.toLowerCase().includes(search.toLowerCase())
  );
  const pageCount = Math.ceil(filteredSubjects.length / pageSize) || 1;
  const paginatedData = filteredSubjects.slice(
    pageIndex * pageSize,
    pageIndex * pageSize + pageSize
  );

  useEffect(() => {
    setPageIndex(0);
  }, [search, pageSize]);

  return (
    <div className="p-6">
      <div className="text-black text-base font-medium mb-6">
        Học tập / Lớp học / Báo cáo học lực lớp
      </div>
      <div className="mb-6 mt-4 flex flex-wrap items-end gap-x-6 gap-y-4">
        <div>
          {/* <label className="block text-sm font-medium">Tìm kiếm môn học</label> */}
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm kiếm môn học..."
            className="border p-2 rounded w-60"
          />
        </div>
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
      </div>
      {loading ? (
        <div>Đang tải...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : subjects.length === 0 ? (
        <div>Không có môn học nào.</div>
      ) : (
        <div className="bg-white p-4 rounded-lg overflow-x-auto">
          <DataTable
            columns={columns({ year, semester })}
            data={paginatedData}
            isLoading={loading}
            error={error ?? undefined}
          />
          
        </div>
      )}
    </div>
  );
}