"use client";

import React, { useEffect, useState } from "react";
import { DataTable } from "./components/data-table";
import { columns, Invoice } from "./components/column";

export default function PageInvoiceList() {
  const [data, setData] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>(undefined);
  const [selectedYear, setSelectedYear] = useState<string>("2024-2025");

  const fetchInvoices = async (status?: string, year?: string) => {
    try {
      setIsLoading(true);
      const url = `http://localhost:8080/cashier/invoices?academicYear=${year || "2024-2025"}${
        status ? `&status=${status}` : ""
      }`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Không thể tải danh sách hóa đơn");
      const apiData = await response.json();
      if (apiData && Array.isArray(apiData)) {
        const mappedData = apiData.map((item: any) => ({
          id: item.invoiceId,
          student_id: item.studentId,
          name: item.studentName,
          class: item.className,
          year: item.academicYear,
          totalFee: item.totalFee?.toString() || "0",
          totalPayment: item.paidAmount?.toString() || "0",
          debtAmount: item.outstandingAmount?.toString() || "0",
          status: item.status,
        }));
        setData(mappedData);
      } else {
        setData([]);
      }
      setError(undefined);
    } catch (err) {
      setError("Không thể tải danh sách hóa đơn");
      setData([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices(selectedStatus, selectedYear);
  }, [selectedStatus, selectedYear]);

  return (
    <div className="relative justify-start text-black text-base font-normal font-['Inter']">
      Học phí / Quản lý học phí / Danh sách hóa đơn
      <DataTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        error={error}
        onStatusChange={(status) => setSelectedStatus(status)}
        onAcademicYearChange={(year) => setSelectedYear(year)}
      />
    </div>
  );
}