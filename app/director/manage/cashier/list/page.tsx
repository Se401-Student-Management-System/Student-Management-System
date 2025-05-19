"use client";

import React from "react";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import { cashierData } from "./data/cashier-data";

export default function Page() {
  const [error, setError] = React.useState<string | undefined>(undefined);
  return (
    <div className="relative justify-start text-black text-base font-normal font-['Inter']">
      Quản lý nhân viên/ Thu ngân
      <DataTable
        columns={columns}
        data={cashierData}
        isLoading={false}
        error={error}
      />
    </div>
  );
}
