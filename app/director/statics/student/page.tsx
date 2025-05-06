"use client";
import React from "react";
import NewStudentCard from "./components/NewStudentCard";
import { Warning } from "postcss";
import WarningStudentCard from "./components/WarningStudentCard";
import PreservedStudentCard from "./components/PerservedStudentCard";
import TotalStudentCard from "./components/TotalStudentCard";
import StudentChart from "./components/StudentChart";

export default function page() {
  return (
    <div>
      <div className="text-black text-base font-medium mb-6">
        Trung tâm / Thống kê / Học sinh
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <NewStudentCard month={1} />
        <WarningStudentCard month={1} />
        <PreservedStudentCard month={1} />
        <TotalStudentCard month={1} />
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-md mb-10">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Học sinh</h2>
        <StudentChart />
      </div>
    </div>
  );
}
