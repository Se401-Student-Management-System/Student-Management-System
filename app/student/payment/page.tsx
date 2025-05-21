"use client"

import React, {useEffect, useState} from "react";
import { DataTable } from "./components/data-table";
import { columns, Payment } from "./components/column";
import { mockPayment } from "./components/data";

export default function PagePaymentList() {
  const [data, setData] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setData(mockPayment);
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <div className="relative justify-start text-black text-base font-normal font-['Inter']">
      Học phí / Quản lý học phí / Lịch sử thanh toán
      <DataTable
        columns={columns} 
        data={data} 
        isLoading={false}
        error={undefined} 
      />
    </div>
  );
}