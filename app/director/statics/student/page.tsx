"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  LineChart,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
} from "recharts";
import { TrendingDown, TrendingUp } from "lucide-react";

export default function StudentStatisticsPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | undefined>(undefined);
  const [academicYear, setAcademicYear] = useState<string>("2024-2025");
  const [stats, setStats] = useState<any>(null);
  const [chartData, setChartData] = useState<any[]>([]);

  const fetchStudentStatistics = async () => {
    setIsLoading(true);
    setError(undefined);
    try {
      const response = await axios.get(
        "http://localhost:8080/director/statics-student",
        {
          params: { academicYear },
        }
      );
      const apiData = response.data;

      // Chuẩn bị dữ liệu cho biểu đồ
      const years = [
        ...new Set([
          ...Object.keys(apiData.enrolledHistory),
          ...Object.keys(apiData.warnedHistory),
        ]),
      ].sort();
      const chartData = years.map((year) => ({
        year,
        newStudents: Number(apiData.enrolledHistory[year]) || 0,
        warnedStudents: Number(apiData.warnedHistory[year]) || 0,
      }));

      setStats(apiData);
      setChartData(chartData);
    } catch (err: any) {
      setError("Đã có lỗi xảy ra khi lấy dữ liệu thống kê.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentStatistics();
  }, [academicYear]);

  return (
    <div>
      <div className="text-black text-base font-medium mb-6">
        Trung tâm / Thống kê / Học sinh
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
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {stats && (
          <>
            <div className="p-6 rounded-2xl shadow-md bg-[rgba(109,207,251,0.08)] border border-[rgba(1,179,239,1)]">
              <h3 className="text-base font-semibold text-gray-700">Học sinh mới</h3>
              <p className="text-3xl font-bold text-gray-900">{stats.enrolledStats.count}</p>
              <div className="flex items-center gap-2">
                {stats.enrolledStats.change > 0 ? (
                  <TrendingUp color="#22c55e" />
                ) : stats.enrolledStats.change < 0 ? (
                  <TrendingDown color="#ef4444" />
                ) : null}
                <span className={stats.enrolledStats.change > 0 ? "text-green-600" : "text-red-500"}>
                  {stats.enrolledStats.change}%
                </span>
              </div>
              <span className="text-sm text-gray-500">so với năm trước</span>
            </div>
            <div className="p-6 rounded-2xl shadow-md bg-[rgba(220,38,38,0.08)] border border-[rgba(220,38,38,1)]">
              <h3 className="text-base font-semibold text-gray-700">Học sinh bị cảnh cáo</h3>
              <p className="text-3xl font-bold text-gray-900">{stats.warnedStats.count}</p>
              <div className="flex items-center gap-2">
                {stats.warnedStats.change > 0 ? (
                  <TrendingUp color="#22c55e" />
                ) : stats.warnedStats.change < 0 ? (
                  <TrendingDown color="#ef4444" />
                ) : null}
                <span className={stats.warnedStats.change > 0 ? "text-green-600" : "text-red-500"}>
                  {stats.warnedStats.change}%
                </span>
              </div>
              <span className="text-sm text-gray-500">so với năm trước</span>
            </div>
            <div className="p-6 rounded-2xl shadow-md bg-[rgba(22,163,74,0.08)] border border-[rgba(22,163,74,1)]">
              <h3 className="text-base font-semibold text-gray-700">Tổng số học sinh</h3>
              <p className="text-3xl font-bold text-gray-900">{stats.totalStats.count}</p>
              <div className="flex items-center gap-2">
                {stats.totalStats.change > 0 ? (
                  <TrendingUp color="#22c55e" />
                ) : stats.totalStats.change < 0 ? (
                  <TrendingDown color="#ef4444" />
                ) : null}
                <span className={stats.totalStats.change > 0 ? "text-green-600" : "text-red-500"}>
                  {stats.totalStats.change}%
                </span>
              </div>
              <span className="text-sm text-gray-500">so với năm trước</span>
            </div>
          </>
        )}
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-md mb-10">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Số lượng học sinh theo năm học</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="newStudents"
              stroke="#3b82f6"
              strokeWidth={3}
              name="Học sinh mới"
            />
            <Line
              type="monotone"
              dataKey="warnedStudents"
              stroke="#ef4444"
              strokeWidth={3}
              name="Học sinh bị cảnh cáo"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}