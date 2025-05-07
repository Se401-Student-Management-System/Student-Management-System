"use client";
import React, { useState } from "react";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import { TeacherArrangeData } from "./data/teacher-data";
export default function page() {
  const [error, setError] = useState<string | undefined>(undefined);

  return (
    <div className="relative justify-start text-black text-base font-normal font-['Inter']">
      Học tập / Lớp học / Xếp lớp / 11A1
      <DataTable
        columns={columns}
        data={TeacherArrangeData}
        isLoading={false}
        error={error}
      />
    </div>
  );
}
