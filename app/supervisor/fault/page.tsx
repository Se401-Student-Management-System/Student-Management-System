"use client"

import React, {useEffect, useState} from "react";
import { DataTable } from "./components/data-table";
import { columns, Fault } from "./components/column";
import { mockFault } from "./components/data";

export default function PageFaultList() {
  const [data, setData] = useState<Fault[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setData(mockFault);
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <div className="relative justify-start text-black text-base font-normal font-['Inter']">
      Hạnh kiểm / Quản lý hạnh kiểm / Thông tin vi phạm
      <DataTable
        columns={columns} 
        data={data} 
        isLoading={false}
        error={undefined} 
      />
    </div>
  );
}