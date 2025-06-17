"use client";
import React, { useEffect, useState } from "react";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";

export default function Page() {
  const [students, setStudents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8080/students/list-all");
        if (!res.ok) {
          throw new Error("Lỗi khi gọi API");
        }
        const data = await res.json();
        setStudents(data);
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
      Học tập / Học sinh / Danh sách học sinh
      <DataTable
        columns={columns}
        data={students}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
}
