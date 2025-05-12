"use client";
import React, { useState, useEffect } from "react";
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
import { Download } from "lucide-react";
import { toast } from "sonner";

interface AcademicReport {
  id: string;
  className: string;
  subject: string;
  excellent: number; // Tỷ lệ % Giỏi
  good: number; // Tỷ lệ % Khá
  average: number; // Tỷ lệ % Trung bình
  weak: number; // Tỷ lệ % Yếu
  averageScore: number; // Điểm trung bình
}

export default function ClassRecordListPage() {
  const [search, setSearch] = useState<string>("");
  const [year, setYear] = useState<string>("2024");
  const [semester, setSemester] = useState<string>("Học kỳ 1");
  const [exam, setExam] = useState<string>("Cuối kỳ");
  const [error, setError] = useState<string | undefined>(undefined);
  const [reports, setReports] = useState<AcademicReport[]>([]);

  // Mock dữ liệu
  const yearList = ["2024", "2023", "2022", "2021"];
  const semesterList = ["Học kỳ 1", "Học kỳ 2"];
  const examList = ["15 Phút lần 1", "15 Phút lần 2", "1 Tiết lần 1", "1 Tiết lần 2", "Cuối kỳ"];
  const mockReports: AcademicReport[] = [
    {
      id: "1",
      className: "10A1",
      subject: "Toán",
      excellent: 20,
      good: 40,
      average: 30,
      weak: 10,
      averageScore: 7.5,
    },
    {
      id: "2",
      className: "10A1",
      subject: "Văn",
      excellent: 15,
      good: 35,
      average: 40,
      weak: 10,
      averageScore: 7.0,
    },
    {
      id: "3",
      className: "10A2",
      subject: "Toán",
      excellent: 10,
      good: 30,
      average: 50,
      weak: 10,
      averageScore: 6.5,
    },
    {
      id: "4",
      className: "11A1",
      subject: "Anh",
      excellent: 25,
      good: 45,
      average: 20,
      weak: 10,
      averageScore: 7.8,
    },
  ];

  useEffect(() => {
    // Mock API call: /api/teacher/class/record/list?year={year}&semester={semester}&exam={exam}&search={search}
    const fetchData = async () => {
      try {
        setTimeout(() => {
          const filteredReports = mockReports.filter(
            (report) =>
              report.className.toLowerCase().includes(search.toLowerCase()) ||
              report.subject.toLowerCase().includes(search.toLowerCase())
          );
          setReports(filteredReports);
        }, 500);
      } catch (err) {
        setError("Không thể tải báo cáo học lực");
        toast.error("Không thể tải báo cáo học lực");
      }
    };
    fetchData();
  }, [year, semester, exam, search]);

  const handleExportExcel = () => {
    // Giả lập xuất Excel
    console.log("Exporting Excel for reports:", reports);
    toast.success("Đã xuất Excel thành công");
  };

  return (
    <div className="p-6">
      <div className="text-black text-base font-medium mb-6">
        Học tập / Lớp học / Báo cáo học lực lớp
      </div>

      <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg">
        {/* Bộ lọc */}
        <form className="flex items-center gap-4">
          <TableFilter
            value={search}
            onChange={(value) => setSearch(value)}
            placeholder="Tìm kiếm lớp hoặc môn học..."
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
          <Select value={exam} onValueChange={setExam}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Bài kiểm tra" />
            </SelectTrigger>
            <SelectContent>
              {examList.map((e) => (
                <SelectItem key={e} value={e}>
                  {e}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </form>

        {/* Nút Xuất Excel */}
        <Button onClick={handleExportExcel} variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Xuất Excel
        </Button>
      </div>

      {/* Thông báo lỗi */}
      {error && <p className="text-red-500 mb-6">{error}</p>}

      {/* Bảng dữ liệu */}
      <div className="bg-white p-4 rounded-lg overflow-x-auto">
        <DataTable
          columns={columns}
          data={reports}
          isLoading={false}
          error={error}
        />
        <DataTablePagination
          pageCount={Math.ceil(reports.length / 10)}
          pageIndex={0}
          pageSize={10}
          onPageChange={() => {}}
        />
      </div>
    </div>
  );
}