"use client";

import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ClassRecordDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const classId = params.id as string;
  const year = searchParams.get("year") || "2024-2025";
  const semester = searchParams.get("semester") || "Học kỳ 1";
  const subjectName = searchParams.get("subjectName") || "Chưa chọn";
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const subjectId = params.id as string;

  useEffect(() => {
    const fetchScores = async () => {
      setLoading(true);
      try {
        const teacherId = localStorage.getItem("userId");
        const res = await fetch(
          `http://localhost:8080/students/by-teacher/${teacherId}`
        );
        const studentsList = await res.json();

        const role = localStorage.getItem("role");
        const semesterNum = semester === "Học kỳ 1" ? 1 : 2;

        const studentsWithScores = await Promise.all(
          studentsList.map(async (student: any) => {
            const sid = student.id;
            if (!sid) return null;
            const res = await fetch(
              `http://localhost:8080/grades/${sid}?userId=${teacherId}&role=${role}&semester=${semesterNum}&academicYear=${year}`
            );
            const data = await res.json();
            // Lọc điểm theo subjectId
            const scores = Array.isArray(data)
              ? data.filter((score: any) => String(score.subjectId) === String(subjectId))
              : [];
            return {
              ...student,
              scores,
            };
          })
        );
        setStudents(studentsWithScores.filter(Boolean));
      } catch (e) {
        console.error("Lỗi khi tải dữ liệu:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchScores();
  }, [classId, year, semester]);

  const handleExportExcel = () => {
    console.log("Xuất Excel...");
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="text-black text-base font-medium mb-6">
        Học tập / Lớp học / Báo cáo học lực lớp / Chi tiết
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        {/* Thông tin báo cáo */}
        <div className="mb-6">
          <h1 className="text-lg font-bold mb-4">Báo cáo học lực lớp</h1>
          <div className="grid grid-cols-3 gap-8 p-4 border border-gray-200 rounded-lg bg-gray-50">
            <div className="flex items-center gap-2">
              <span className="text-[#01B3EF] font-medium">Năm học:</span>
              <span className="font-semibold">{year}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#01B3EF] font-medium">Học kỳ:</span>
              <span className="font-semibold">{semester}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#01B3EF] font-medium">Môn học:</span>
              <span className="font-semibold">{subjectName}</span>
            </div>
          </div>
        </div>

        {/* Nút Xuất Excel */}
        <div className="flex justify-end mb-6">
          <Button onClick={handleExportExcel} variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Xuất Excel
          </Button>
        </div>

        {/* Bảng điểm học sinh */}
        <div className="mb-8">
          <h1 className="text-lg font-bold mb-4">Bảng điểm học sinh</h1>
          {loading ? (
            <div>Đang tải...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-r border-gray-200">
                      Lớp
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-r border-gray-200">
                      Mã học sinh
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-r border-gray-200">
                      Họ tên học sinh
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-r border-gray-200">
                      15 phút 1
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-r border-gray-200">
                      15 phút 2
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-r border-gray-200">
                      1 tiết 1
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-r border-gray-200">
                      1 tiết 2
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                      Cuối kỳ
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((s, sIdx) =>
                    Array.isArray(s.scores) && s.scores.length > 0 ? (
                      (() => {
                        const uniqueScores = [];
                        const seen = new Set();
                        for (const score of s.scores) {
                          const key = `${score.subjectId}-${score.semester}-${score.academicYear}`;
                          if (!seen.has(key)) {
                            uniqueScores.push(score);
                            seen.add(key);
                          }
                        }
                        return uniqueScores.map((score: any, idx: number) => (
                          <tr key={`${s.id}-${idx}`} className="border-t border-gray-200">
                            <td className="px-4 py-2 text-sm text-gray-900 border-r border-gray-200">
                              {s.className || s.clazz?.className || ""}
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-900 border-r border-gray-200">
                              {s.id}
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-900 border-r border-gray-200">
                              {s.fullName}
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-900 border-r border-gray-200">
                              {score.score15m1}
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-900 border-r border-gray-200">
                              {score.score15m2}
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-900 border-r border-gray-200">
                              {score.score1h1}
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-900 border-r border-gray-200">
                              {score.score1h2}
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-900">
                              {score.finalScore}
                            </td>
                          </tr>
                        ));
                      })()
                    ) : (
                      <tr key={`no-score-${s.id}-${sIdx}`} className="border-t border-gray-200">
                        <td className="px-4 py-2 text-sm text-gray-900 border-r border-gray-200">
                          {s.className || s.clazz?.className || ""}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-900 border-r border-gray-200">
                          {s.id}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-900 border-r border-gray-200">
                          {s.fullName}
                        </td>
                        <td colSpan={5} className="px-4 py-2 text-sm text-gray-900 text-center">
                          Không có dữ liệu
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}