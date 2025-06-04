"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";

export interface PaymentRecord {
  invoiceId: number;
  studentId: string;
  studentName: string;
  academicYear: string;
  totalFee: number;
  paidAmount: number;
  outstandingAmount: number;
  status: string;
}

export const columns: ColumnDef<PaymentRecord>[] = [
  {
    accessorKey: "invoiceId",
    header: ({ column }) => {
      return (
        <Button
          className="pl-0"
          variant="ghost"
          style={{ backgroundColor: "transparent" }}
        >
          Mã hóa đơn
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("invoiceId")}</div>,
  },
  {
    accessorKey: "studentId",
    header: ({ column }) => {
      return (
        <Button
          className="pl-0"
          variant="ghost"
          style={{ backgroundColor: "transparent" }}
        >
          Mã học sinh
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("studentId")}</div>,
  },
  {
    accessorKey: "studentName",
    header: ({ column }) => {
      return (
        <Button
          className="pl-0"
          variant="ghost"
          style={{ backgroundColor: "transparent" }}
        >
          Họ và tên
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("studentName")}</div>,
  },
  {
    accessorKey: "academicYear",
    header: ({ column }) => {
      return (
        <Button
          className="pl-0"
          variant="ghost"
          style={{ backgroundColor: "transparent" }}
        >
          Năm học
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("academicYear")}</div>,
  },
  {
    accessorKey: "totalFee",
    header: ({ column }) => {
      return (
        <Button
          className="pl-0"
          variant="ghost"
          style={{ backgroundColor: "transparent" }}
        >
          Tổng học phí
        </Button>
      );
    },
    cell: ({ row }) => {
      const value = row.getValue("totalFee") as number;
      return <div>{value.toLocaleString("vi-VN")} VNĐ</div>;
    },
  },
  {
    accessorKey: "paidAmount",
    header: ({ column }) => {
      return (
        <Button
          className="pl-0"
          variant="ghost"
          style={{ backgroundColor: "transparent" }}
        >
          Đã thanh toán
        </Button>
      );
    },
    cell: ({ row }) => {
      const value = row.getValue("paidAmount") as number;
      return <div>{value.toLocaleString("vi-VN")} VNĐ</div>;
    },
  },
  {
    accessorKey: "outstandingAmount",
    header: ({ column }) => {
      return (
        <Button
          className="pl-0"
          variant="ghost"
          style={{ backgroundColor: "transparent" }}
        >
          Số tiền còn nợ
        </Button>
      );
    },
    cell: ({ row }) => {
      const value = row.getValue("outstandingAmount") as number;
      return <div>{value.toLocaleString("vi-VN")} VNĐ</div>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          className="pl-0"
          variant="ghost"
          style={{ backgroundColor: "transparent" }}
        >
          Trạng thái
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("status")}</div>,
  },
  {
    id: "action",
    header: "Action",
    cell: ({ row }) => (
      <div className="self-stretch self-stretch inline-flex justify-center items-center gap-2.5">
        <Trash2 color="#E14177" />
      </div>
    ),
  },
];