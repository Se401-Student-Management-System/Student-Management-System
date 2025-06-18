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
import { Button } from "@/components/ui/button";
import { PlusCircle, Search } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { DataTablePagination } from "./data-pagination";
import { TableFilter } from "./table-filter";
import Link from "next/link";

interface DataTableProps<TData extends object, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading: boolean;
  error: string | undefined;
  grade: number;
  setGrade: (g: number) => void;
  semester: number;
  setSemester: (s: number) => void;
  academicYear: string;
  setAcademicYear: (y: string) => void;
}

const yearList = ["2022-2023", "2023-2024", "2024-2025"];
const semesterList = [
  { value: 1, label: "Học kỳ 1" },
  { value: 2, label: "Học kỳ 2" },
];
const gradeList = [
  { value: 10, label: "Khối 10" },
  { value: 11, label: "Khối 11" },
  { value: 12, label: "Khối 12" },
];

export function DataTable<TData extends object, TValue>({
  columns,
  data,
  isLoading,
  error,
  grade,
  setGrade,
  semester,
  setSemester,
  academicYear,
  setAcademicYear,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
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
          <select
            className="border rounded px-2 py-1"
            value={grade}
            onChange={(e) => setGrade(Number(e.target.value))}
          >
            {gradeList.map((g) => (
              <option key={g.value} value={g.value}>
                {g.label}
              </option>
            ))}
          </select>
          <select
            className="border rounded px-2 py-1"
            value={semester}
            onChange={(e) => setSemester(Number(e.target.value))}
          >
            {semesterList.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
          <select
            className="border rounded px-2 py-1"
            value={academicYear}
            onChange={(e) => setAcademicYear(e.target.value)}
          >
            {yearList.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-start">
          <div className="relative">
            <PlusCircle className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white" />
            <Button className="pl-12 h-[40px]">
              <Link href="/supervisor/fault/add">Thêm</Link>
            </Button>{" "}
          </div>
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
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
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