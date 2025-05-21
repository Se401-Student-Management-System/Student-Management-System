"use client"

import React, {useEffect, useState} from "react";
import { DataTable } from "./components/data-table";
import { columns, Invoice } from "./components/column";
import { mockInvoice } from "./components/data";

export default function PageInvoiceList() {
  const [data, setData] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setData(mockInvoice);
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <div className="relative justify-start text-black text-base font-normal font-['Inter']">
      Học phí / Thông tin học phí
      <DataTable
        columns={columns} 
        data={data} 
        isLoading={false}
        error={undefined} 
      />
    </div>
  );
}