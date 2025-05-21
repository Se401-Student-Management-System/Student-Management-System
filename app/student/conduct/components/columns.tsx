"use client";

import { ColumnDef } from "@tanstack/react-table";

// Định nghĩa kiểu dữ liệu cho bảng hạnh kiểm
export interface ConductEntry {
  id: string;
  createdAt: string;
  error: string;
  minusPoint: number;
  year?: string;
  semester?: string;
}

// Chỉ export một mảng columns cho bảng hạnh kiểm
export const columns: ColumnDef<ConductEntry>[] = [
  {
    accessorKey: "id",
    header: () => <div className="text-center">Mã số</div>,
    cell: ({ row }) => <div className="text-center">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "createdAt",
    header: () => <div className="text-center">Ngày tạo</div>,
    cell: ({ row }) => <div className="text-center">{row.getValue("createdAt")}</div>,
  },
  {
    accessorKey: "error",
    header: () => <div className="text-center">Lỗi</div>,
    cell: ({ row }) => <div className="text-center">{row.getValue("error")}</div>,
  },
  {
    accessorKey: "minusPoint",
    header: () => <div className="text-center">Điểm trừ</div>,
    cell: ({ row }) => <div className="text-center">{row.getValue("minusPoint")}</div>,
  },
];

// Điểm tổng kết sẽ được tính và hiển thị ở dưới bảng, không nằm trong columns.