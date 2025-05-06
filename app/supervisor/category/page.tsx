"use client"

import React, {useEffect, useState} from "react";
import { DataTable } from "./components/data-table";
import { columns, Category } from "./components/column";
import { mockCategory } from "./components/data";

export default function PageCategoryList() {
  const [data, setData] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setData(mockCategory);
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <div className="relative justify-start text-black text-base font-normal font-['Inter']">
      Hạnh kiểm / Quản lý hạnh kiểm / Danh mục vi phạm
      <DataTable
        columns={columns} 
        data={data} 
        isLoading={false}
        error={undefined} 
      />
    </div>
  );
}