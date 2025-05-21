"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";

export interface Invoice {
  id: string;
  amount: string;
  debt: string;
  paymentDate: string;
  nextPaymentDate: string;
  paymentMethod: string;
  creator: string;
}

export const columns: ColumnDef<Invoice>[] = [
  {
    id: "detail",
    header: () => <span>Thông tin học phí</span>,
    cell: ({ row }) => {
      const invoice = row.original;
      return (
        <div className="p-4 border rounded-md bg-white space-y-1">
          <div className="border-b border-gray-200 p-4 font-medium">
            Thông tin học phí học kì 1, năm học 2024-2025
          </div>
          <table className="w-full text-sm border border-gray-200 border-collapse">
            <tbody>
              <Row label="Mã thanh toán" value={invoice.id} />
              <Row label="Số tiền đã đóng" value={invoice.amount} />
              <Row
                label={<span className="text-red-600">Còn nợ</span>}
                value={invoice.debt}
              />
              <Row label="Ngày thanh toán" value={invoice.paymentDate} />
              <Row label="Ngày thanh toán tiếp theo" value={invoice.nextPaymentDate} />
              <Row label="Phương thức thanh toán" value={invoice.paymentMethod} />
              <Row label="Người tạo" value={invoice.creator} />
            </tbody>
          </table>
        </div>
      );
    },
  },
];

function Row({ label, value }: { label: React.ReactNode; value: React.ReactNode }) {
  return (
    <tr className="border-t border-gray-200">
      <td className="p-2 font-medium w-1/3 bg-gray-50 whitespace-nowrap">{label}</td>
      <td className="p-2">{value}</td>
    </tr>
  );
}
