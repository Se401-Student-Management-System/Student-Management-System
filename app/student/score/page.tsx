"use client";
import React, { useState, useEffect } from "react";
import { DataTable } from "./components/data-table";
import { ScoreEntry, columns } from "./components/columns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const yearList = ["2024-2025", "2023-2024", "2022-2023"];
const semesterList = ["Học kỳ 1", "Học kỳ 2"];

function calcAverage(scores: ScoreEntry[]) {
  const valid = scores
    .map((s) => Number(s.finalScore))
    .filter((n) => !isNaN(n));
  if (!valid.length) return "Không có dữ liệu";
  const avg = valid.reduce((a, b) => a + b, 0) / valid.length;
  return avg.toFixed(2);
}

export default function StudentScorePage({ params }: { params: { id: string } }) {
  const [year, setYear] = useState(yearList[0]);
  const [semester, setSemester] = useState(semesterList[0]);
  const [scores, setScores] = useState<ScoreEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [studentId, setStudentId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const uid = localStorage.getItem("userId");
      const r = localStorage.getItem("role");
      setUserId(uid);
      setRole(r);
      let sid = "";
      if (r === "Student") {
        sid = uid || "";
        setStudentId(sid);
      } else {
        sid = localStorage.getItem("studentId") || "";
        setStudentId(sid);
      }
      // Lưu studentId vào sessionStorage
      if (sid) {
        sessionStorage.setItem("studentId", sid);
      }
    }
  }, []);

  useEffect(() => {
    if (!studentId || !userId || !role) return;
    setLoading(true);
    console.log("Gọi API với:", { studentId, userId, role, year, semester });
    fetch(
      `http://localhost:8080/grades/${studentId}?userId=${userId}&role=${role}&semester=${
        semester === "Học kỳ 1" ? 1 : 2
      }&academicYear=${year}`
    )
      .then((res) => {
        if (!res.ok) throw new Error("Không thể lấy dữ liệu điểm số");
        return res.json();
      })
      .then((data) => {
        console.log("Kết quả trả về:", data);
        setScores(data);
      })
      .catch((e) => {
        console.error(e);
        setScores([]);
      })
      .finally(() => setLoading(false));
  }, [year, semester, studentId, userId, role]);

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
          isLoading={loading}
          error={undefined}
        />
        <div className="mt-4 text-base font-medium text-blue-700 text-right">
          Điểm trung bình các môn: {calcAverage(scores)}
        </div>
      </div>
    </div>
  );
}