"use client";
import React, { useState, useEffect } from "react";
import { DataTable } from "./components/data-table";
import { ScoreEntry, columns } from "./components/columns";
import { mockScores } from "./components/data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Dữ liệu mẫu


const yearList = ["2024-2025", "2023-2024", "2022-2023"];
const semesterList = ["Học kỳ 1", "Học kỳ 2"];

// Hàm tính điểm trung bình (chỉ tính các trường hợp có finalScore hợp lệ)
function calcAverage(scores: ScoreEntry[]) {
  const valid = scores
    .map((s) => Number(s.finalScore))
    .filter((n) => !isNaN(n));
  if (!valid.length) return "Không có dữ liệu";
  const avg = valid.reduce((a, b) => a + b, 0) / valid.length;
  return avg.toFixed(2);
}

export default function StudentScorePage() {
  const [year, setYear] = useState(yearList[0]);
  const [semester, setSemester] = useState(semesterList[0]);
  const [scores, setScores] = useState<ScoreEntry[]>([]);

  useEffect(() => {
    setScores(
      mockScores.filter(
        (row) => row.year === year && row.semester === semester
      )
    );
  }, [year, semester]);

  // Hàm xử lý xem chi tiết (nếu cần)
  const handleViewDetails = (id: string) => {
    // Xử lý khi click xem chi tiết, ví dụ: mở modal hoặc chuyển trang
    // alert(`Xem chi tiết bản ghi có id: ${id}`);
  };

  return (
    <div className="p-1">
      <div className="relative justify-start text-black text-base font-normal font-['Inter']">
        Học tập / Xem điểm
      </div>
      {/* Bộ lọc */}
      <form className="flex items-center gap-4 mb-6 mt-5">
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
      {/* Bảng điểm */}
      <div className="bg-white rounded-lg shadow -xl p-6 overflow-x-auto border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Bảng điểm năm học {year} - {semester}
        </h2>
        <DataTable
          data={scores}
          columns={columns(() => {})}
          isLoading={false}
          error={undefined}
        />
        {/* Đoạn text tính điểm trung bình nằm dưới bảng */}
        <div className="mt-4 text-base font-medium text-blue-700 text-right">
          Điểm trung bình các môn: {calcAverage(scores)}
        </div>
      </div>
    </div>
  );
}