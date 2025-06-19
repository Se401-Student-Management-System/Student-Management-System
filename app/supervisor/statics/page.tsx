"use client";

import React, { useEffect, useState } from "react";
import { DataTable } from "./components/data-table";
import { columns } from "./components/column";
import dynamic from "next/dynamic";

function PageFaultListContent() {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);
  const [semester, setSemester] = useState<number>(1);
  const [academicYear, setAcademicYear] = useState<string>("2024-2025");
  const [grade, setGrade] = useState<number>(10);

  useEffect(() => {
    const fetchBehaviorSummary = async () => {
      try {
        setIsLoading(true);
        setError(undefined);
        const url = `http://localhost:8080/supervisor/student-behavior-summary?semester=${semester}&academicYear=${academicYear}&grade=${grade}`;
        const res = await fetch(url);
        const result = await res.json();
        setData(result || []); // <-- Sửa ở đây, lấy trực tiếp mảng trả về
      } catch (err: any) {
        setError(err.message);
        setData([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBehaviorSummary();
  }, [semester, academicYear, grade]);

  return (
    <div className="relative justify-start text-black text-base font-normal font-['Inter']">
      <DataTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        error={error}
        grade={grade}
        setGrade={setGrade}
        semester={semester}
        setSemester={setSemester}
        academicYear={academicYear}
        setAcademicYear={setAcademicYear}
      />
    </div>
  );
}

const PageFaultList = dynamic(() => Promise.resolve(PageFaultListContent), {
  ssr: false,
  loading: () => (
    <div className="relative justify-start text-black text-base font-normal font-['Inter']">
      <div className="py-8 text-center text-gray-500">Đang tải dữ liệu thống kê...</div>
    </div>
  ),
});

export default PageFaultList;