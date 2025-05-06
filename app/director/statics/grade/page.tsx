"use client";
import React from "react";
import ExcellentStudentCard from "./components/ExcellentStudentCard";
import GoodStudentCard from "./components/GoodStudentCard";
import MediumStudentCard from "./components/MediumStudentCard";
import WeakStudentCard from "./components/WeakStudentCard";
import GradeChart from "./components/GradeChart";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { gradeData } from "./data/grade-data";

export default function page() {
  const [error, setError] = React.useState<string | undefined>(undefined);
  return (
    <div>
      <div className="text-black text-base font-medium mb-6">
        Trung tâm / Thống kê / Học lực
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <ExcellentStudentCard month={1} />
        <GoodStudentCard month={1} />
        <MediumStudentCard month={1} />
        <WeakStudentCard month={1} />
      </div>
      <div className="w-full h-full flex justify-between items-start">
        <div className="w-1/2 h-full flex flex-col justify-start items-start gap-5">
          <GradeChart />
        </div>
        <div className="w-1/2 self-stretch self-stretch p-2.5 bg-white inline-flex flex-col justify-start items-center gap-2.5 overflow-hidden">
          <div className="justify-start text-black text-[16px] font-[600] font-['Inter']">
            Danh sách các học sinh đứng đầu trường
          </div>
          <DataTable
            columns={columns}
            data={gradeData}
            isLoading={false}
            error={error}
          />
        </div>
      </div>
    </div>
  );
}
