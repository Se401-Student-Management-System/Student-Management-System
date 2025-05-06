"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Pencil } from "lucide-react";

export interface Invoice {
  id: number;
  student_id: number;
  name: string;
  class: string;
  year: string;
  totalFee: string;
  totalPayment: string;
  debtAmount: string;
  status: string;
}

export const columns: ColumnDef<Invoice>[] = [
    {
      accessorKey: "id",
      header: ({ column }) => {
        return (
          <Button
            className="pl-0"
            variant="ghost"
            style={{ backgroundColor: "transparent" }}
          >
            ID
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue("id")}</div>,
    },
    {
        accessorKey: "student_id",
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
        cell: ({ row }) => <div>{row.getValue("student_id")}</div>,
      },
      {
        accessorKey: "name",
        header: ({ column }) => {
          return (
            <Button
              className="pl-0"
              variant="ghost"
              style={{ backgroundColor: "transparent" }}
            >
              Họ tên
            </Button>
          );
        },
        cell: ({ row }) => <div>{row.getValue("name")}</div>,
      },
      {
        accessorKey: "class",
        header: ({ column }) => {
          return (
            <Button
              className="pl-0"
              variant="ghost"
              style={{ backgroundColor: "transparent" }}
            >
              Lớp
            </Button>
          );
        },
        cell: ({ row }) => <div>{row.getValue("class")}</div>,
      },
      {
        accessorKey: "year",
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
        cell: ({ row }) => <div>{row.getValue("year")}</div>,
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
        cell: ({ row }) => <div>{row.getValue("totalFee")}</div>,
      },
      {
        accessorKey: "totalPayment",
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
        cell: ({ row }) => <div>{row.getValue("totalPayment")}</div>,
      },
      {
        accessorKey: "debtAmount",
        header: ({ column }) => {
          return (
            <Button
              className="pl-0"
              variant="ghost"
              style={{ backgroundColor: "transparent" }}
            >
              Còn nợ
            </Button>
          );
        },
        cell: ({ row }) => <div>{row.getValue("debtAmount")}</div>,
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
        cell: ({ row }) => {
              const status = row.getValue("status");
        
              return (
                <Badge status={status as "inactive" | "active" | "onHold" | undefined}>
                  {status === "active"
                    ? "Đã thanh toán"
                    : status === "onHold"
                    ? "Thanh toán 1 phần"
                    : "Chưa thanh toán"}
                </Badge>
              );
            },
      },   
      {
        id: "action",
        header: "Action",
        cell: ({ row }) => (
          <div className="self-stretch self-stretch inline-flex justify-center items-center gap-2.5">
            <Link href={`/cashier/invoice/add/${row.getValue("id")}`}>
              <Pencil color="#6DCFFB" />
            </Link>
          </div>
        ),
      },
]