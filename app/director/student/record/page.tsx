"use client";
import React from "react";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import { studentRecordData } from "./data/record-data";

export default function page() {
  const [error, setError] = React.useState<string | undefined>(undefined);
  return (
    <div className="relative justify-start text-black text-base font-normal font-['Inter']">
      Học tập / Học sinh / Thông tin học bạ
      <DataTable
        columns={columns}
        data={studentRecordData}
        isLoading={false}
        error={error}
      />
    </div>
  );
}
