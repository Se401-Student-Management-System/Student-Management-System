"use client";
import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import StatCard from "./components/StatCard";
import { Users } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import axios from "axios";

interface GradeStats {
  excellentCount: number;
  goodCount: number;
  averageCount: number;
  weakCount: number;
  excellentChange: number;
  goodChange: number;
  averageChange: number;
  weakChange: number;
}

export default function GradeStaticsPage() {
  const [year, setYear] = useState<string>("2024");
  const [semester, setSemester] = useState<string>("Học kỳ 1");
  const [stats, setStats] = useState<GradeStats>({
    excellentCount: 50,
    goodCount: 120,
    averageCount: 200,
    weakCount: 30,
    excellentChange: 5.2,
    goodChange: -2.3,
    averageChange: 3.1,
    weakChange: 1.8,
  });
  const [error, setError] = useState<string | undefined>(undefined);

  const yearList = ["2024", "2023", "2022", "2021"];
  const previousYear = (parseInt(year) - 1).toString();
  const comparisonText = semester
    ? `so với ${semester.toLowerCase()} năm ${previousYear}`
    : `so với năm ${previousYear}`;

  const pieData = [
    { name: "Giỏi", value: stats.excellentCount },
    { name: "Khá", value: stats.goodCount },
    { name: "Trung bình", value: stats.averageCount },
    { name: "Yếu", value: stats.weakCount },
  ];

  const barData = [
    { name: "Giỏi", count: stats.excellentCount },
    { name: "Khá", count: stats.goodCount },
    { name: "Trung bình", count: stats.averageCount },
    { name: "Yếu", count: stats.weakCount },
  ];

  const COLORS = ["#01B3EF", "#f59e0b", "#16a34a", "#dc2626"];

  const fetchGradeStatistics = async () => {
    setError(undefined);
    const teacherId = localStorage.getItem("teacherId");
    if (!teacherId) {
      setError("Không tìm thấy mã giáo viên (teacherId). Vui lòng đăng nhập lại.");
      return;
    }
    try {
      const response = await axios.get(
        "http://localhost:8080/api/teacher/statics/grade",
        {
          params: {
            teacherId: teacherId,
            academicYear: year,
            semester: semester === "Học kỳ 1" ? 1 : 2,
          },
        }
      );
      setStats(response.data);
    } catch (err) {
      setError("Không thể tải dữ liệu thống kê");
    }
  };

  useEffect(() => {
    fetchGradeStatistics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, semester]);

  return (
    <div className="p-6">
      <div className="text-black text-base font-medium mb-6">
        Trung tâm / Thống kê / Học lực
      </div>

      {/* Bộ lọc */}
      <form className="flex items-center gap-4 mb-6">
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
        <Select value={semester} onValueChange={setSemester}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Chọn học kỳ" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Học kỳ 1">Học kỳ 1</SelectItem>
            <SelectItem value="Học kỳ 2">Học kỳ 2</SelectItem>
          </SelectContent>
        </Select>
      </form>

      {/* Thông báo lỗi */}
      {error && <p className="text-red-500 mb-6">{error}</p>}

      {/* Thẻ thống kê */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard
          title="Học lực giỏi"
          value={stats.excellentCount.toLocaleString("vi-VN")}
          percent={`${Math.abs(stats.excellentChange).toFixed(2)}%`}
          change={stats.excellentChange >= 0 ? "up" : "down"}
          icon={<Users size={40} color="#01B3EF" />}
          bg="bg-[rgba(109,207,251,0.08)]"
          border="border-[rgba(1,179,239,1)]"
          compareText={comparisonText}
        />
        <StatCard
          title="Học lực khá"
          value={stats.goodCount.toLocaleString("vi-VN")}
          percent={`${Math.abs(stats.goodChange).toFixed(2)}%`}
          change={stats.goodChange >= 0 ? "up" : "down"}
          icon={<Users size={40} color="#f59e0b" />}
          bg="bg-[rgba(245,158,11,0.08)]"
          border="border-[rgba(245,158,11,1)]"
          compareText={comparisonText}
        />
        <StatCard
          title="Học lực trung bình"
          value={stats.averageCount.toLocaleString("vi-VN")}
          percent={`${Math.abs(stats.averageChange).toFixed(2)}%`}
          change={stats.averageChange >= 0 ? "up" : "down"}
          icon={<Users size={40} color="#16a34a" />}
          bg="bg-[rgba(22,163,74,0.08)]"
          border="border-[rgba(22,163,74,1)]"
          compareText={comparisonText}
        />
        <StatCard
          title="Học lực yếu"
          value={stats.weakCount.toLocaleString("vi-VN")}
          percent={`${Math.abs(stats.weakChange).toFixed(2)}%`}
          change={stats.weakChange >= 0 ? "up" : "down"}
          icon={<Users size={40} color="#dc2626" />}
          bg="bg-[rgba(220,38,38,0.08)]"
          border="border-[rgba(220,38,38,1)]"
          compareText={comparisonText}
        />
      </div>

      {/* Biểu đồ */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Biểu đồ tròn */}
        <div className="w-full lg:w-1/2 bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Thống kê học lực học sinh trong học kỳ
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Biểu đồ cột */}
        <div className="w-full lg:w-1/2 bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            So sánh số lượng học sinh theo học lực
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#01B3EF">
                {barData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
