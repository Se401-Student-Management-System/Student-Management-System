"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { toast } from "sonner";

interface Student {
  studentId: string;
  fullName: string;
  score: number;
}

interface ReportDetail {
  year: string;
  semester: string;
  className: string;
  subject: string;
  exam: string;
  excellentStudents: Student[];
  goodStudents: Student[];
  averageStudents: Student[];
  weakStudents: Student[];
}

export default function ClassRecordDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [report, setReport] = useState<ReportDetail | null>(null);
  const [error, setError] = useState<string | undefined>(undefined);

  // Mock dữ liệu
  const mockReport: ReportDetail = {
    year: "2024",
    semester: "Học kỳ 1",
    className: "10A1",
    subject: "Toán",
    exam: "Cuối kỳ",
    excellentStudents: [
      { studentId: "HS001", fullName: "Nguyễn Văn A", score: 8.5 },
      { studentId: "HS002", fullName: "Trần Thị B", score: 9.0 },
    ],
    goodStudents: [
      { studentId: "HS003", fullName: "Lê Văn C", score: 7.0 },
      { studentId: "HS004", fullName: "Phạm Thị D", score: 7.5 },
    ],
    averageStudents: [
      { studentId: "HS005", fullName: "Hoàng Văn E", score: 6.0 },
    ],
    weakStudents: [
      { studentId: "HS006", fullName: "Ngô Thị F", score: 4.5 },
    ],
  };

  useEffect(() => {
    // Mock API call: /api/teacher/class/record/detail/[id]
    const fetchData = async () => {
      try {
        setTimeout(() => {
          setReport(mockReport);
        }, 500);
      } catch (err) {
        setError("Không thể tải chi tiết báo cáo");
        toast.error("Không thể tải chi tiết báo cáo");
      }
    };
    fetchData();
  }, [id]);

  const handleExportExcel = () => {
    // Giả lập xuất Excel
    console.log("Exporting Excel for report:", report);
    toast.success("Đã xuất Excel thành công");
  };

  if (!report) {
    return <div className="p-6">Đang tải...</div>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="text-black text-base font-medium mb-6">
        Học tập / Lớp học / Báo cáo học lực lớp / Chi tiết
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        {/* Thông tin báo cáo */}
        <div className="mb-6">
          <h1 className="text-lg font-bold mb-4">Báo cáo học lực lớp</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-[#01B3EF] font-medium">Năm học:</span>
                <span className="font-semibold">{report.year}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#01B3EF] font-medium">Học kỳ:</span>
                <span className="font-semibold">{report.semester}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#01B3EF] font-medium">Lớp:</span>
                <span className="font-semibold">{report.className}</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-[#01B3EF] font-medium">Môn học:</span>
                <span className="font-semibold">{report.subject}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#01B3EF] font-medium">Bài kiểm tra:</span>
                <span className="font-semibold">{report.exam}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Nút Xuất Excel */}
        <div className="flex justify-end mb-6">
          <Button onClick={handleExportExcel} variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Xuất Excel
          </Button>
        </div>

        {/* Bảng Giỏi */}
        <div className="mb-8">
          <h1 className="text-lg font-bold mb-4">Loại Giỏi</h1>
          <DataTable
            columns={columns}
            data={report.excellentStudents}
            isLoading={false}
            error={error}
          />
        </div>

        {/* Bảng Khá */}
        <div className="mb-8">
          <h1 className="text-lg font-bold mb-4">Loại Khá</h1>
          <DataTable
            columns={columns}
            data={report.goodStudents}
            isLoading={false}
            error={error}
          />
        </div>

        {/* Bảng Trung bình */}
        <div className="mb-8">
          <h1 className="text-lg font-bold mb-4">Loại Trung Bình</h1>
          <DataTable
            columns={columns}
            data={report.averageStudents}
            isLoading={false}
            error={error}
          />
        </div>

        {/* Bảng Yếu */}
        <div>
          <h1 className="text-lg font-bold mb-4">Loại Yếu</h1>
          <DataTable
            columns={columns}
            data={report.weakStudents}
            isLoading={false}
            error={error}
          />
        </div>
      </div>
    </div>
  );
}