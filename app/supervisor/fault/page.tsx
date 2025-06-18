"use client";

import React, { useEffect, useState } from "react";
import { DataTable } from "./components/data-table";
import { columns, Fault } from "./components/column";
import dynamic from "next/dynamic";

function PageFaultListContent() {
  const [data, setData] = useState<Fault[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);
  const [grade, setGrade] = useState<number | "">("");
  const [semester, setSemester] = useState<number>(1);
  const [academicYear, setAcademicYear] = useState<string>("2024-2025");

  useEffect(() => {
    const fetchConductReport = async () => {
      try {
        setIsLoading(true);
        setError(undefined);
        let results: Fault[] = [];
        if (grade === "") {
          const promises = [10, 11, 12].map(async (g) => {
            const url = `http://localhost:8080/supervisor/supervisor-conduct?semester=${semester}&academicYear=${academicYear}&grade=${g}`;
            const res = await fetch(url);
            if (!res.ok) throw new Error("Không thể lấy dữ liệu thống kê hạnh kiểm");
            const result = await res.json();
            return result.lowestList || [];
          });
          const allResults = await Promise.all(promises);
          results = allResults.flat();
          setData(results);
        } else {
          const url = `http://localhost:8080/supervisor/supervisor-conduct?semester=${semester}&academicYear=${academicYear}&grade=${grade}`;
          const res = await fetch(url);
          if (!res.ok) throw new Error("Không thể lấy dữ liệu thống kê hạnh kiểm");
          const result = await res.json();
          setData(result.lowestList || []);
        }
      } catch (err: any) {
        setError(err.message);
        setData([]);
      } finally {
        setIsLoading(false);
      }
    };
    console.log(data[0]);

    fetchConductReport();
  }, [grade, semester, academicYear]);

  return (
    <div className="relative justify-start text-black text-base font-normal font-['Inter']">
      Hạnh kiểm / Quản lý hạnh kiểm / Thông tin vi phạm
      <DataTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        error={error}
      />
      
    </div>
  );
}

const PageFaultList = dynamic(() => Promise.resolve(PageFaultListContent), {
  ssr: false,
  loading: () => (
    <div className="relative justify-start text-black text-base font-normal font-['Inter']">
      <div className="py-8 text-center text-gray-500">Đang tải...</div>
    </div>
  ),
});

export default PageFaultList;