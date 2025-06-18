"use client";

import React, { useEffect, useState } from "react";
import { DataTable } from "./components/data-table";
import { columns, Category } from "./components/column";

export default function PageCategoryList() {
  const [category, setCategory] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8080/violation-types/list");
        if (!res.ok) {
          throw new Error("Lỗi khi gọi API");
        }
        const data = await res.json();
        setCategory(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="relative justify-start text-black text-base font-normal font-['Inter']">
      Hạnh kiểm / Quản lý hạnh kiểm / Danh mục vi phạm
      <DataTable
        columns={columns}
        data={category}
        isLoading={false}
        error={undefined}
      />
    </div>
  );
}
