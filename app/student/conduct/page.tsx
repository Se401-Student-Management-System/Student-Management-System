"use client";
import React, { useState, useMemo } from "react";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import { mockConducts } from "./components/data";

const yearList = ["2024-2025", "2023-2024", "2022-2023"];
const semesterList = ["Học kỳ 1", "Học kỳ 2"];

export default function ConductPage() {
  const [year, setYear] = useState(yearList[0]);
  const [semester, setSemester] = useState(semesterList[0]);

  // Lọc dữ liệu hạnh kiểm theo năm học và học kỳ
  const filteredData = useMemo(
    () =>
      mockConducts.filter(
        (row) => row.year === year && row.semester === semester
      ),
    [year, semester]
  );

  return (
    <div className="p-1">
      <div className="relative justify-start text-black text-base font-normal font-['Inter']">
        Học tập / Xem hạnh kiểm
      </div>
      {/* Bộ lọc */}
      <form className="flex items-center gap-4 mb-6 mt-5">
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
      {/* Bảng hạnh kiểm */}
      <div className="bg-white rounded-lg shadow-lg p-6 overflow-x-auto border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Bảng hạnh kiểm năm học {year} - {semester}
        </h2>
        <DataTable
          data={filteredData}
          columns={columns}
          isLoading={false}
          error={undefined}
        />
      </div>
      <div className="mt-4 text-base font-medium text-blue-700 text-right">
        {(() => {
          const totalMinus = filteredData.reduce(
            (sum, row) => sum + Number(row.minusPoint || 0),
            0
          );
          const conductScore = 100 - totalMinus;
          return `Điểm hạnh kiểm: ${conductScore}`;
        })()}
      </div>
    </div>
  );
}