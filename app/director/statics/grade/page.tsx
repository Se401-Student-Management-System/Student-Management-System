"use client";
import React, { useState, useEffect } from "react";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { TrendingDown, TrendingUp } from "lucide-react";

export default function GradeStatisticsPage() {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | undefined>(undefined);
  const [grade, setGrade] = useState<number>(10);
  const [semester, setSemester] = useState<number>(1);
  const [academicYear, setAcademicYear] = useState<string>("2024-2025");
  const [stats, setStats] = useState<any>(null);

  const fetchGradeStatistics = async () => {
    setIsLoading(true);
    setError(undefined);
    try {
      const response = await axios.get(
        "http://localhost:8080/director/statics-grade",
        {
          params: { grade, semester, academicYear },
        }
      );
      const apiData = response.data;

      // Chuẩn bị dữ liệu cho biểu đồ tròn
      const pieData = [
        {
          name: "Giỏi",
          value: apiData.goodGrade.excellentCount,
          change: apiData.goodGrade.excellentChange,
        },
        {
          name: "Khá",
          value: apiData.normalGrade.goodCount,
          change: apiData.normalGrade.goodChange,
        },
        {
          name: "Trung Bình",
          value: apiData.mediumGrade.averageCount,
          change: apiData.mediumGrade.averageChange,
        },
        {
          name: "Yếu",
          value: apiData.weakGrade.weakCount,
          change: apiData.weakGrade.weakChange,
        },
      ];

      setStats({ ...apiData, pieData });
      setData(apiData.topTenStudents || []);
    } catch (err: any) {
      setError("Đã có lỗi xảy ra khi lấy dữ liệu thống kê.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGradeStatistics();
  }, [grade, semester, academicYear]);

  const COLORS = ["#3b82f6", "#f59e0b", "#16a34a", "#dc2626"];

  return (
    <div>
      <div className="text-black text-base font-medium mb-6">
        Trung tâm / Thống kê / Học lực
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
        <div>
          <label className="block text-sm font-medium">Khối</label>
          <select
            value={grade}
            onChange={(e) => setGrade(Number(e.target.value))}
            className="border p-2 rounded"
          >
            <option value={10}>Khối 10</option>
            <option value={11}>Khối 11</option>
            <option value={12}>Khối 12</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats && (
          <>
            <div className="p-6 rounded-2xl shadow-md bg-[rgba(109,207,251,0.08)] border border-[rgba(1,179,239,1)]">
              <h3 className="text-base font-semibold text-gray-700">Giỏi</h3>
              <p className="text-3xl font-bold text-gray-900">{stats.goodGrade.excellentCount}</p>
              <div className="flex items-center gap-2">
                {stats.goodGrade.excellentChange > 0 ? (
                  <TrendingUp color="#22c55e" />
                ) : stats.goodGrade.excellentChange < 0 ? (
                  <TrendingDown color="#ef4444" />
                ) : null}
                <span className={stats.goodGrade.excellentChange > 0 ? "text-green-600" : "text-red-500"}>
                  {stats.goodGrade.excellentChange}%
                </span>
              </div>
              <span className="text-sm text-gray-500">so với năm trước</span>
            </div>
            <div className="p-6 rounded-2xl shadow-md bg-[rgba(245,158,11,0.08)] border border-[rgba(245,158,11,1)]">
              <h3 className="text-base font-semibold text-gray-700">Khá</h3>
              <p className="text-3xl font-bold text-gray-900">{stats.normalGrade.goodCount}</p>
              <div className="flex items-center gap-2">
                {stats.normalGrade.goodChange > 0 ? (
                  <TrendingUp color="#22c55e" />
                ) : stats.normalGrade.goodChange < 0 ? (
                  <TrendingDown color="#ef4444" />
                ) : null}
                <span className={stats.normalGrade.goodChange > 0 ? "text-green-600" : "text-red-500"}>
                  {stats.normalGrade.goodChange}%
                </span>
              </div>
              <span className="text-sm text-gray-500">so với năm trước</span>
            </div>
            <div className="p-6 rounded-2xl shadow-md bg-[rgba(22,163,74,0.08)] border border-[rgba(22,163,74,1)]">
              <h3 className="text-base font-semibold text-gray-700">Trung Bình</h3>
              <p className="text-3xl font-bold text-gray-900">{stats.mediumGrade.averageCount}</p>
              <div className="flex items-center gap-2">
                {stats.mediumGrade.averageChange > 0 ? (
                  <TrendingUp color="#22c55e" />
                ) : stats.mediumGrade.averageChange < 0 ? (
                  <TrendingDown color="#ef4444" />
                ) : null}
                <span className={stats.mediumGrade.averageChange > 0 ? "text-green-600" : "text-red-500"}>
                  {stats.mediumGrade.averageChange}%
                </span>
              </div>
              <span className="text-sm text-gray-500">so với năm trước</span>
            </div>
            <div className="p-6 rounded-2xl shadow-md bg-[rgba(220,38,38,0.08)] border border-[rgba(220,38,38,1)]">
              <h3 className="text-base font-semibold text-gray-700">Yếu</h3>
              <p className="text-3xl font-bold text-gray-900">{stats.weakGrade.weakCount}</p>
              <div className="flex items-center gap-2">
                {stats.weakGrade.weakChange > 0 ? (
                  <TrendingUp color="#22c55e" />
                ) : stats.weakGrade.weakChange < 0 ? (
                  <TrendingDown color="#ef4444" />
                ) : null}
                <span className={stats.weakGrade.weakChange > 0 ? "text-green-600" : "text-red-500"}>
                  {stats.weakGrade.weakChange}%
                </span>
              </div>
              <span className="text-sm text-gray-500">so với năm trước</span>
            </div>
          </>
        )}
      </div>
      <div className="w-full h-full flex justify-between items-start">
        <div className="w-1/2 h-full flex flex-col justify-start items-start gap-5">
          <div className="bg-white p-6 rounded-2xl shadow-md w-full">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Thống kê học lực</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={stats?.pieData || []}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={100}
                  dataKey="value"
                >
                  {stats?.pieData.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="w-1/2 self-stretch p-2.5 bg-white inline-flex flex-col justify-start items-center gap-2.5 overflow-hidden">
          <div className="justify-start text-black text-[16px] font-[600] font-['Inter']">
            Danh sách các học sinh đứng đầu trường
          </div>
          <DataTable
            columns={columns}
            data={data}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </div>
    </div>
  );
}

const COLORS = ["#3b82f6", "#f59e0b", "#16a34a", "#dc2626"];