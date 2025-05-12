"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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

interface ScoreEntry {
  id: string;
  className: string;
  subject: string;
  score15Min1: string | null;
  score15Min2: string | null;
  score1Hour1: string | null;
  score1Hour2: string | null;
  finalScore: string | null;
}

export default function ClassEnterListPage() {
  const router = useRouter();
  const [year, setYear] = useState<string>("2024");
  const [semester, setSemester] = useState<string>("Học kỳ 1");
  const [search, setSearch] = useState<string>("");
  const [error, setError] = useState<string | undefined>(undefined);
  const [scores, setScores] = useState<ScoreEntry[]>([]);

  // Mock dữ liệu
  const yearList = ["2024", "2023", "2022", "2021"];
  const semesterList = ["Học kỳ 1", "Học kỳ 2"];
  const mockScores: ScoreEntry[] = [
    {
      id: "1",
      className: "10A1",
      subject: "Toán",
      score15Min1: "Đã hoàn thành",
      score15Min2: "Đã hoàn thành",
      score1Hour1: "Đã hoàn thành",
      score1Hour2: null,
      finalScore: null,
    },
    {
      id: "2",
      className: "10A1",
      subject: "Văn",
      score15Min1: "Đã hoàn thành",
      score15Min2: null,
      score1Hour1: "Đã hoàn thành",
      score1Hour2: null,
      finalScore: null,
    },
    {
      id: "3",
      className: "10A2",
      subject: "Toán",
      score15Min1: null,
      score15Min2: null,
      score1Hour1: null,
      score1Hour2: null,
      finalScore: null,
    },
    {
      id: "4",
      className: "11A1",
      subject: "Anh",
      score15Min1: "Đã hoàn thành",
      score15Min2: "Đã hoàn thành",
      score1Hour1: "Đã hoàn thành",
      score1Hour2: "Đã hoàn thành",
      finalScore: "Đã hoàn thành",
    },
  ];

  useEffect(() => {
    // Mock API call
    const fetchData = async () => {
      try {
        // Giả lập gọi API: /api/teacher/class/enter/list?year={year}&semester={semester}&search={search}
        setTimeout(() => {
          const filteredScores = mockScores.filter(
            (score) =>
              score.className.toLowerCase().includes(search.toLowerCase()) ||
              score.subject.toLowerCase().includes(search.toLowerCase())
          );
          setScores(filteredScores);
        }, 500);
      } catch (err) {
        setError("Không thể tải danh sách điểm");
        toast.error("Không thể tải danh sách điểm");
      }
    };
    fetchData();
  }, [year, semester, search]);

  const handleExportExcel = () => {
    // Giả lập xuất Excel
    console.log("Exporting Excel for scores:", scores);
    toast.success("Đã xuất Excel thành công");
  };

  const handleViewDetails = (id: string) => {
    router.push(`/teacher/class/enter/detail/${id}`);
  };

  return (
    <div className="p-6">
      <div className="text-black text-base font-medium mb-6">
        Học tập / Lớp học / Nhập điểm
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
          columns={columns(handleViewDetails)}
          data={scores}
          isLoading={false}
          error={error}
        />
        <DataTablePagination
          pageCount={Math.ceil(scores.length / 10)}
          pageIndex={0}
          pageSize={10}
          onPageChange={() => {}}
        />
      </div>
    </div>
  );
}