"use client";
import React, { useState, useEffect } from "react";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import axios from "axios";

export default function StudentRecordPage() {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | undefined>(undefined);
  const [semester, setSemester] = useState<number>(1);
  const [className, setClassName] = useState<string>("10A1");
  const [academicYear, setAcademicYear] = useState<string>("2024-2025");

  const fetchClassSchoolRecords = async () => {
    setIsLoading(true);
    setError(undefined);
    try {
      const response = await axios.get(
        "http://localhost:8080/director/class-school-records",
        {
          params: { className, semester, academicYear },
        }
      );
      const apiData: any[] = response.data;

      const transformedData = apiData.map((record, index) => {
        const scores = record.scoresBySemester[semester] || {};
        const yearlyScores = record.yearlyAverageScoresBySubject || {};
        return {
          stt: index + 1,
          studentId: record.student.id,
          studentName: record.studentName,
          className: record.className,
          mathScore: semester === 0
            ? yearlyScores["Subject(id=1, subjectName=Toán)"]?.toString() || ""
            : scores["Subject(id=1, subjectName=Toán)"]?.averageSubjectScore?.toString() || "",
          literatureScore: semester === 0
            ? yearlyScores["Subject(id=2, subjectName=Văn)"]?.toString() || ""
            : scores["Subject(id=2, subjectName=Văn)"]?.averageSubjectScore?.toString() || "",
          englishScore: semester === 0
            ? yearlyScores["Subject(id=3, subjectName=Anh)"]?.toString() || ""
            : scores["Subject(id=3, subjectName=Anh)"]?.averageSubjectScore?.toString() || "",
          averageScore: semester === 0
            ? record.yearlyAverageScore?.toString() || ""
            : record.averageScoresBySemester[semester]?.toString() || "",
          grade: record.academicPerformance || "",
          conduct: record.behaviorScore?.toString() || "",
          title: record.title || "Không có",
        };
      });
      setData(transformedData);
    } catch (err: any) {
      setError(err.response?.status === 404 ? "Lớp học không tồn tại" : "Đã có lỗi xảy ra khi lấy dữ liệu.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchClassSchoolRecords();
  }, [className, semester, academicYear]);

  return (
    <div className="relative justify-start text-black text-base font-normal font-['Inter']">
      <div className="mb-4">Học tập / Học sinh / Thông tin học bạ</div>
      <div className="mb-4 flex gap-4">
        <div>
          <label className="block text-sm font-medium">Học kỳ</label>
          <select
            value={semester}
            onChange={(e) => setSemester(Number(e.target.value))}
            className="border p-2 rounded"
          >
            <option value={1}>Học kỳ 1</option>
            <option value={2}>Học kỳ 2</option>
            <option value={0}>Cả năm</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Tên lớp</label>
          <select
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="10A1">10A1</option>
            <option value="10A2">10A2</option>
            <option value="11A1">11A1</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Năm học</label>
          <select
            value={academicYear}
            onChange={(e) => setAcademicYear(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="2024-2025">2024-2025</option>
            <option value="2023-2024">2023-2024</option>
          </select>
        </div>
      </div>
      <DataTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
}