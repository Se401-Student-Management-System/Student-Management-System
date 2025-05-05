"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";

export interface Payment {
  id: number;
  invoice_id: number;
  cashier_id: number;
  name: string;
  money: string;
  payment_date: string;
}

export const columns: ColumnDef<Payment>[] = [
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
        accessorKey: "invoice_id",
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
        cell: ({ row }) => <div>{row.getValue("invoice_id")}</div>,
      },
      {
        accessorKey: "cashier_id",
        header: ({ column }) => {
          return (
            <Button
              className="pl-0"
              variant="ghost"
              style={{ backgroundColor: "transparent" }}
            >
              Mã thu ngân
            </Button>
          );
        },
        cell: ({ row }) => <div>{row.getValue("cashier_id")}</div>,
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
        accessorKey: "money",
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
        cell: ({ row }) => <div>{row.getValue("money")}</div>,
      },
      {
        accessorKey: "payment_date",
        header: ({ column }) => {
          return (
            <Button
              className="pl-0"
              variant="ghost"
              style={{ backgroundColor: "transparent" }}
            >
              Ngày thanh toán
            </Button>
          );
        },
        cell: ({ row }) => <div>{row.getValue("payment_date")}</div>,
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
]