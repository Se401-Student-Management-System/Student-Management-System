"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Pencil, Trash } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

export interface Cashier {
  id: string;           // MSTN
  name: string;
  email: string;
  phone: string;
  address: string;
  gender: string;
  birthDate: string;
  status: string;
}

export const columns: ColumnDef<Cashier>[] = [
  {
    accessorKey: "id",
    header: () => <Button variant="ghost">MSTN</Button>,
    cell: ({ row }) => <div>{row.getValue("id")}</div>,
  },
  {
    accessorKey: "name",
    header: () => <Button variant="ghost">Họ tên</Button>,
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "email",
    header: () => <Button variant="ghost">Email</Button>,
    cell: ({ row }) => <div>{row.getValue("email")}</div>,
  },
  {
    accessorKey: "phone",
    header: () => <Button variant="ghost">Số điện thoại</Button>,
    cell: ({ row }) => <div>{row.getValue("phone")}</div>,
  },
  {
    accessorKey: "address",
    header: () => <Button variant="ghost">Địa chỉ</Button>,
    cell: ({ row }) => <div>{row.getValue("address")}</div>,
  },
  {
    accessorKey: "gender",
    header: () => <Button variant="ghost">Giới tính</Button>,
    cell: ({ row }) => <div>{row.getValue("gender")}</div>,
  },
  {
    accessorKey: "birthDate",
    header: () => <Button variant="ghost">Ngày sinh</Button>,
    cell: ({ row }) => <div>{row.getValue("birthDate")}</div>,
  },
  {
    accessorKey: "status",
    header: () => <Button variant="ghost">Tình trạng</Button>,
    cell: ({ row }) => {
      const status = row.getValue("status");
      return (
        <Badge status={status as "active" | "inactive" | "onHold" | undefined}>
          {status === "active"
            ? "Đang làm"
            : status === "onHold"
            ? "Tạm nghỉ"
            : "Nghỉ"}
        </Badge>
      );
    },
  },
  {
    id: "action",
    header: "Action",
    cell: ({ row }) => (
      <div className="inline-flex justify-center items-center gap-2.5">
        <Trash color="red" />
       <Link href={`/director/manage/cashier/update/${String(row.getValue("id")).replace(/\D/g, "").replace(/^0+/, "")}`}>
          <Pencil color="#01B3EF" />
        </Link>
      </div>
    ),
  },
];
