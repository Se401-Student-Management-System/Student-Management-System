"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useState, useEffect } from "react";
import TenthChart from "./components/TenthChart";
import EleventhChart from "./components/EleventhChart";
import TwelfthChart from "./components/TwelfthChart";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import axios from "axios";

export default function ConductStatisticsPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | undefined>(undefined);
  const [academicYear, setAcademicYear] = useState<string>("2024-2025");
  const [semester, setSemester] = useState<number>(1);
  const [data, setData] = useState<any>(null);

  const fetchConductStatistics = async () => {
    setIsLoading(true);
    setError(undefined);
    try {
      const response = await axios.get(
        "http://localhost:8080/director/statics-conduct",
        {
          params: { semester, academicYear },
        }
      );
      setData(response.data);
    } catch (err: any) {
      setError("Đã có lỗi xảy ra khi lấy dữ liệu thống kê hạnh kiểm.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchConductStatistics();
  }, [semester, academicYear]);

  return (
    <div>
      <div className="text-black text-base font-medium mb-6">
        Trung tâm / Thống kê / Hạnh kiểm
      </div>
      <div className="mb-6 flex gap-4">
        <div>
          <label className="block text-sm font-medium">Năm học</label>
          <select
            value={academicYear}
            onChange={(e) => setAcademicYear(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="2024-2025">2024-2025</option>
            <option value="2023-2024">2023-2024</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Học kỳ</label>
          <select
            value={semester}
            onChange={(e) => setSemester(Number(e.target.value))}
            className="border p-2 rounded"
          >
            <option value={1}>Học kỳ 1</option>
            <option value={2}>Học kỳ 2</option>
          </select>
        </div>
      </div>
      <div className="w-full h-full self-stretch inline-flex justify-between items-center">
        <div className="w-1/2 h-full inline-flex flex-col justify-start items-start gap-5">
          <Tabs defaultValue="gradeTenth" className="w-[90%] h-full">
            <TabsList className="grid w-full grid-cols-3 mb-20">
              <TabsTrigger value="gradeTenth">Khối 10</TabsTrigger>
              <TabsTrigger value="gradeEleventh">Khối 11</TabsTrigger>
              <TabsTrigger value="gradeTwelfth">Khối 12</TabsTrigger>
            </TabsList>
            <TabsContent value="gradeTenth">
              <TenthChart data={data?.grade10Conduct || {}} />
            </TabsContent>
            <TabsContent value="gradeEleventh">
              <EleventhChart data={data?.grade11Conduct || {}} />
            </TabsContent>
            <TabsContent value="gradeTwelfth">
              <TwelfthChart data={data?.grade12Conduct || {}} />
            </TabsContent>
          </Tabs>
        </div>
        <div className="w-1/2 self-stretch p-2.5 bg-white inline-flex flex-col justify-start items-center gap-2.5 overflow-hidden">
          <div className="justify-start text-black text-[16px] font-[600] font-['Inter']">
            Danh sách các học sinh vi phạm nhiều nhất
          </div>
          <DataTable
            columns={columns}
            data={data?.lowestConductStudents || []}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </div>
    </div>
  );
}