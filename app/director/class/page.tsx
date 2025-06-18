"use client";
import React, { useEffect, useState } from "react";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";

export default function page() {
  const [classes, setClasses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8080/classes/list");
        if (!res.ok) {
          throw new Error("Lỗi khi gọi API");
        }
        const data = await res.json();
        setClasses(data);
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
      Học tập / Lớp học / Danh sách lớp học
      <DataTable
        columns={columns}
        data={classes}
        isLoading={false}
        error={error}
      />
    </div>
  );
}
