"use client";
import React, { useState, useEffect } from "react";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import { TableFilter } from "./components/table-filter";
import { DataTablePagination } from "./components/data-pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { toast } from "sonner";

interface Student {
  id: string;
  name: string;
  class: string;
  gender: string;
  birthDate: string;
  phone: string;
  email: string;
  status: string;
}

export default function StudentPage() {
  const [year, setYear] = useState<string>("2024");
  const [classId, setClassId] = useState<string>("10A1");
  const [search, setSearch] = useState<string>("");
  const [error, setError] = useState<string | undefined>(undefined);
  const [students, setStudents] = useState<Student[]>([]);

  // Mock dữ liệu
  const yearList = ["2024", "2023", "2022", "2021"];
  const classList = ["10A1", "10A2", "11A1", "11A2"];
  const mockStudents: Student[] = [
    {
      id: "1",
      name: "Nguyễn Văn A",
      class: "10A1",
      gender: "Nam",
      birthDate: "15/03/2008",
      phone: "0123456789",
      email: "nguyenvana@example.com",
      status: "Đang học",
    },
    {
      id: "2",
      name: "Trần Thị B",
      class: "10A1",
      gender: "Nữ",
      birthDate: "22/07/2008",
      phone: "0987654321",
      email: "tranthib@example.com",
      status: "Đang học",
    },
    {
      id: "3",
      name: "Lê Văn C",
      class: "10A2",
      gender: "Nam",
      birthDate: "10/11/2007",
      phone: "0912345678",
      email: "levanc@example.com",
      status: "Nghỉ học",
    },
    {
      id: "4",
      name: "Phạm Thị D",
      class: "11A1",
      gender: "Nữ",
      birthDate: "05/05/2007",
      phone: "0932145678",
      email: "phamthid@example.com",
      status: "Đang học",
    },
    {
      id: "5",
      name: "Hoàng Văn E",
      class: "11A2",
      gender: "Nam",
      birthDate: "18/09/2007",
      phone: "0941234567",
      email: "hoangvane@example.com",
      status: "Chuyển trường",
    },
  ];

  useEffect(() => {
    // Mock API call
    const fetchData = async () => {
      try {
        // Giả lập gọi API: /api/teacher/student?year={year}&class={classId}&search={search}
        setTimeout(() => {
          const filteredStudents = mockStudents.filter(
            (student) =>
              student.class === classId &&
              (student.name.toLowerCase().includes(search.toLowerCase()) ||
                student.id.toLowerCase().includes(search.toLowerCase()))
          );
          setStudents(filteredStudents);
        }, 500);
      } catch (err) {
        setError("Không thể tải danh sách học sinh");
        toast.error("Không thể tải danh sách học sinh");
      }
    };
    fetchData();
  }, [year, classId, search]);

  const handleExportExcel = () => {
    // Giả lập xuất Excel
    console.log("Exporting Excel for students:", students);
    toast.success("Đã xuất Excel thành công");
  };

  return (
    <div className="p-6">
      <div className="text-black text-base font-medium mb-6">
        Học tập / Học sinh / Danh sách học sinh
      </div>

      <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg">
        {/* Bộ lọc */}
        <form className="flex items-center gap-4">
          <TableFilter
            value={search}
            onChange={(value) => setSearch(value)}
            placeholder="Tìm kiếm học sinh..."
          />
          <Select value={year} onValueChange={setYear}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Chọn năm học" />
            </SelectTrigger>
            <SelectContent>
              {yearList.map((y) => (
                <SelectItem key={y} value={y}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={classId} onValueChange={setClassId}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Chọn lớp học" />
            </SelectTrigger>
            <SelectContent>
              {classList.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </form>

        {/* Nút xuất Excel */}
        <Button onClick={handleExportExcel} variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Xuất Excel
        </Button>
      </div>

      {/* Thông báo lỗi */}
      {error && <p className="text-red-500 mb-6">{error}</p>}

      {/* Bảng dữ liệu */}
      <div className="bg-white p-4 rounded-lg overflow-x-auto">
        <DataTable
          columns={columns}
          data={students}
          isLoading={false}
          error={error}
        />
        <DataTablePagination
          pageCount={Math.ceil(students.length / 10)}
          pageIndex={0}
          pageSize={10}
          onPageChange={() => {}}
        />
      </div>
    </div>
  );
}