"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  filterFns,
  Row,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search } from "lucide-react";
import { DataTablePagination } from "./data-pagination";
import { TableFilter } from "./table-filter";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DataTableProps<TData extends object, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading: boolean;
  error: string | undefined;
  onStatusChange?: (status: string | undefined) => void;
  onAcademicYearChange?: (year: string) => void;
}

export function DataTable<TData extends object, TValue>({
  columns,
  data,
  isLoading,
  error,
  onStatusChange,
  onAcademicYearChange,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = React.useState("");

  const globalFilterFn = <TData extends object>(
    row: Row<TData>,
    columnId: string,
    filterValue: string
  ) => {
    return Object.values(row.original).some((value) =>
      String(value).toLowerCase().includes(filterValue.toLowerCase())
    );
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    filterFns: { global: globalFilterFn },
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
  });

  return (
    <div>
      <div className="w-full bg-white flex items-center justify-between border border-white rounded-[10px] mb-[20px] mt-[10px] h-[60px]">
        <div className="flex justify-end items-center h-full gap-2">
          <div className="relative h-full flex items-center">
            <TableFilter table={table} />
            <Search className="absolute right-2 top-1/3 transform -translate-y-1 text-black" />
          </div>
          <Select
            onValueChange={(value) =>
              onStatusChange?.(
                value === "paid" ? "Đã thanh toán" :
                value === "unpaid" ? "Chưa thanh toán" :
                value === "processing" ? "Thanh toán 1 phần" : undefined
              )
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="paid">Đã thanh toán</SelectItem>
              <SelectItem value="unpaid">Chưa thanh toán</SelectItem>
              <SelectItem value="processing">Thanh toán 1 phần</SelectItem>
            </SelectContent>
          </Select>
          <Select
            onValueChange={(value) => onAcademicYearChange?.(value)}
            defaultValue="2024-2025"
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Năm học" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2023-2024">2023-2024</SelectItem>
              <SelectItem value="2024-2025">2024-2025</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="rounded-md">
        {isLoading ? (
          <div className="flex items-center justify-center">Loading...</div>
        ) : error ? (
          <div className="flex items-center justify-center">Error: {error}</div>
        ) : (
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
      {table.getRowModel().rows?.length > 0 && (
        <DataTablePagination table={table} />
      )}
    </div>
  );
}