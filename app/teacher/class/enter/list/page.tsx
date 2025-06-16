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
  const [year, setYear] = useState<string>("2024-2025");
  const [semester, setSemester] = useState<string>("1");
  const [search, setSearch] = useState<string>("");
  const [error, setError] = useState<string | undefined>(undefined);
  const [scores, setScores] = useState<ScoreEntry[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Danh sách năm học và học kỳ
  const yearList = ["2024-2025", "2023-2024"];
  const semesterList = ["1", "2"];

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(undefined);
      try {
        const response = await fetch(
          `http://localhost:8080/teacher/enter-list?semester=${semester}&year=${year}`,
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
        const enterList = data.enterList as any[];
        const formattedScores = enterList.map((item: any) => ({
          id: `${item.tenLop}-${item.tenMH}`,
          className: item.tenLop,
          subject: item.tenMH,
          score15Min1: item.diem15P_1,
          score15Min2: item.diem15P_2,
          score1Hour1: item.diem1Tiet_1,
          score1Hour2: item.diem1Tiet_2,
          finalScore: item.diemCK,
        }));
        setScores(formattedScores);
      } catch (err) {
        setError("Không thể tải danh sách điểm");
        toast.error("Không thể tải danh sách điểm");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [year, semester, search]);

  const handleExportExcel = () => {
    console.log("Exporting Excel for scores:", scores);
    toast.success("Đã xuất Excel thành công");
  };

  const handleViewDetails = (id: string) => {
    router.push(`/teacher/class/enter/detail/${id}?semester=${semester}&year=${encodeURIComponent(year)}`);
  };

  return (
    <div className="p-6">
      <div className="text-black text-base font-medium mb-6">
        Học tập / Lớp học / Nhập điểm
      </div>

      <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg">
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
                  {`Học kỳ ${s}`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </form>

        <Button onClick={handleExportExcel} variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Xuất Excel
        </Button>
      </div>

      {error && <p className="text-red-500 mb-6">{error}</p>}

      <div className="bg-white p-4 rounded-lg overflow-x-auto">
        <DataTable
          columns={columns(handleViewDetails, semester, year)}
          data={scores}
          isLoading={isLoading}
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