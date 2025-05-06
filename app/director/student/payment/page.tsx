"use client";
import React from "react";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import { studentPaymentData } from "./data/payment-data";

export default function page() {
  const [error, setError] = React.useState<string | undefined>(undefined);
  return (
    <div className="relative justify-start text-black text-base font-normal font-['Inter']">
      Học tập / Học sinh / Thông tin thanh toán
      <DataTable
        columns={columns}
        data={studentPaymentData}
        isLoading={false}
        error={error}
      />
    </div>
  );
}
