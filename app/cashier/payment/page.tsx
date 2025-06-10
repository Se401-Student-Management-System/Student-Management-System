"use client";

import React, { useState, useEffect } from "react";
import { DataTable } from "./components/data-table";
import { columns, PaymentRecord } from "./components/column";
import axios from "axios";

export default function PagePaymentList() {
  const [data, setData] = useState<PaymentRecord[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | undefined>(undefined);
  const [academicYear, setAcademicYear] = useState<string>("2024-2025");
  const [status, setStatus] = useState<string>("");

  const fetchPaymentRecords = async () => {
    setIsLoading(true);
    setError(undefined);
    try {
      const params: any = { academicYear };
      if (status) {
        params.status = status;
      }
      const response = await axios.get(
        "http://localhost:8080/cashier/payment-records",
        { params }
      );
      setData(response.data);
    } catch (err: any) {
      setError(
        err.response?.status === 400
          ? "Trạng thái không hợp lệ"
          : "Lỗi hệ thống khi lấy dữ liệu lịch sử thanh toán."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPaymentRecords();
  }, [academicYear, status]);

  const handleExportExcel = async () => {
    try {
      const params: any = { academicYear };
      if (status) {
        params.status = status;
      }
      const response = await axios.get(
        "http://localhost:8080/cashier/export-payment-records",
        {
          params,
          responseType: "blob", // Xử lý file Excel
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `payment-records-${academicYear}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err: any) {
      setError("Lỗi khi xuất file Excel. Vui lòng kiểm tra lại hệ thống.");
    }
  };

  return (
  <div className="relative text-black text-base font-normal font-['Inter']">
    Học phí / Quản lý học phí / Lịch sử thanh toán
    <div className="mb-6 mt-4 flex flex-wrap items-end gap-x-6 gap-y-4">
      <div>
        <label className="block text-sm font-medium">Năm học</label>
        <select
          value={academicYear}
          onChange={(e) => setAcademicYear(e.target.value)}
          className="border p-2 rounded w-40"
        >
          <option value="2024-2025">2024-2025</option>
          <option value="2023-2024">2023-2024</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium">Trạng thái</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border p-2 rounded w-40"
        >
          <option value="">Tất cả</option>
          <option value="Đã thanh toán">Đã thanh toán</option>
          <option value="Chưa thanh toán">Chưa thanh toán</option>
          <option value="Thanh toán 1 phần">Thanh toán 1 phần</option>
        </select>
      </div>
      <div className="ml-auto">
        <button
          onClick={handleExportExcel}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Export Excel
        </button>
      </div>
    </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <DataTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
}