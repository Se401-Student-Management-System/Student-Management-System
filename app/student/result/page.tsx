"use client";
import React, { useState, useMemo } from "react";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
// Import dữ liệu điểm từ file score/components/data
import { mockScores } from "../score/components/data";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Nếu bạn không dùng form ở trang này, hãy xóa các phần liên quan đến form bên dưới!

const yearList = ["2024-2025", "2023-2024"];
const semesterList = ["Học kỳ 1", "Học kỳ 2"];

// Tính điểm trung bình của từng cột cho học kỳ và năm học đã chọn
function calcAvgByColumn(scores: any[], key: string) {
  const nums = scores
    .map((s) => Number(s[key]))
    .filter((n) => !isNaN(n));
  if (!nums.length) return "";
  return (nums.reduce((a, b) => a + b, 0) / nums.length).toFixed(2);
}

export default function ResultPage() {
  const [year, setYear] = useState(yearList[0]);
  const [semester, setSemester] = useState(semesterList[0]);

  // Lọc điểm theo học kỳ và năm học từ dữ liệu import
  const filteredScores = useMemo(
    () =>
      mockScores.filter(
        (s: any) => s.year === year && s.semester === semester
      ),
    [year, semester]
  );

  // Tạo 1 dòng tổng hợp điểm trung bình các cột
  const avgRow = useMemo(
    () => ({
      scoreFrequent: calcAvgByColumn(filteredScores, "scoreFrequent"),
      score15Min1: calcAvgByColumn(filteredScores, "score15Min1"),
      score15Min2: calcAvgByColumn(filteredScores, "score15Min2"),
      score1Hour1: calcAvgByColumn(filteredScores, "score1Hour1"),
      score1Hour2: calcAvgByColumn(filteredScores, "score1Hour2"),
      finalScore: calcAvgByColumn(filteredScores, "finalScore"),
      avgScore: calcAvgByColumn(filteredScores, "finalScore"),
    }),
    [filteredScores]
  );

  // Dữ liệu bảng chỉ có 1 dòng là điểm trung bình các môn
  const tableData = [avgRow];

  return (
    <div className="p-1">
      <div className="text-black text-base font-medium mb-6">
        Học tập / Kết quả học tập
      </div>
      <form className="flex items-center gap-4 mb-6">
        <select
          className="border rounded px-3 py-2"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        >
          {yearList.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
        <select
          className="border rounded px-3 py-2"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
        >
          {semesterList.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </form>
      <div className="bg-white rounded-lg shadow-lg p-6 overflow-x-auto border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Kết quả học tập năm học {year} - {semester}
        </h2>
        <DataTable data={tableData} columns={columns} isLoading={false} error={undefined} />
      </div>
      {/* Giữ nguyên phần mới thêm vào bên dưới */}
      <div className="bg-white rounded-lg shadow -lg p-6 py-5 overflow-x-auto border border-gray-200 mt-8">
        <div className="w-full self-stretch inline-flex justify-between items-center mt-[10px]">
          <div className="w-[500px] inline-flex flex-col justify-start items-start gap-5">
            <div className="w-full flex flex-col">
              <span className="font-normal text-gray-600">Điểm trung bình</span>
              <span className="w-full px-3 py-2 bg-gray-100 rounded border border-gray-200 font-['Inter'] text-base">
                {avgRow.avgScore || "--"}
              </span>
            </div>
            
            <div className="w-full flex flex-col">
              <span className="font-normal text-gray-600">Hạnh kiểm</span>
              <span className="w-full px-3 py-2 bg-gray-100 rounded border border-gray-200 font-['Inter'] text-base">
                {/* Nếu có dữ liệu thực tế thì thay vào đây */}
                Tốt
              </span>
            </div>
          </div>
          <div className="w-[500px] inline-flex flex-col justify-start items-start gap-5 mt-0">
            <div className="w-full flex flex-col">
              <span className="font-normal text-gray-600">Học lực</span>
              <span className="w-full px-3 py-2 bg-gray-100 rounded border border-gray-200 font-['Inter'] text-base">
                {avgRow.avgScore
                  ? Number(avgRow.avgScore) >= 8
                    ? "Giỏi"
                    : Number(avgRow.avgScore) >= 6.5
                    ? "Khá"
                    : Number(avgRow.avgScore) >= 5
                    ? "Trung bình"
                    : "Yếu"
                  : "--"}
              </span>
            </div>
            <div className="w-full flex flex-col">
              <span className="font-normal text-gray-600">Danh hiệu</span>
              <span className="w-full px-3 py-2 bg-gray-100 rounded border border-gray-200 font-['Inter'] text-base">
                {avgRow.avgScore
                  ? Number(avgRow.avgScore) >= 8
                    ? "Học sinh giỏi"
                    : Number(avgRow.avgScore) >= 6.5
                    ? "Học sinh tiên tiến"
                    : ""
                  : "--"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}