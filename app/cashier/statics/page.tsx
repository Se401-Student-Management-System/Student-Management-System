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
import { Ticket } from "lucide-react";
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

interface PaymentStats {
    totalStudents: number;
    totalStudentsChangePercent: number;
    paidStudents: number;
    paidStudentsChangePercent: number;
    partiallyPaidStudents: number;
    partiallyPaidStudentsChangePercent: number;
    unpaidStudents: number;
    unpaidStudentsChangePercent: number;
}

export default function FeeStaticsPage() {
    const [academicYear, setAcademicYear] = useState<string>("2024-2025");
    const [error, setError] = useState<string | undefined>(undefined);
    const [stats, setStats] = useState<PaymentStats | null>(null);

    // Mock danh sách năm học
    const yearList = ["2024-2025", "2023-2024"];

    // Tạo văn bản so sánh
    const previousYear = parseInt(academicYear.split("-")[0]) > 2020 ? `${parseInt(academicYear.split("-")[0]) - 1}-${parseInt(academicYear.split("-")[1]) - 1}` : "";
    const comparisonText = academicYear ? `so với năm ${previousYear}` : "";

    // Dữ liệu cho biểu đồ tròn
    const pieData = [
        { name: "Đã thanh toán", value: stats?.paidStudents || 0 },
        { name: "Chưa thanh toán", value: stats?.unpaidStudents || 0 },
        { name: "Thanh toán 1 phần", value: stats?.partiallyPaidStudents || 0 },
    ];

    // Dữ liệu cho biểu đồ cột
    const barData = [
        { name: "Đã thanh toán", count: stats?.paidStudents || 0 },
        { name: "Chưa thanh toán", count: stats?.unpaidStudents || 0 },
        { name: "Thanh toán 1 phần", count: stats?.partiallyPaidStudents || 0 },
    ];

    // Màu sắc cho biểu đồ
    const COLORS = ["#16a34a", "#dc2626", "#f59e0b"];

    // Gọi API
    const fetchPaymentStatistics = async () => {
        setError(undefined);
        try {
            const response = await axios.get(
                "http://localhost:8080/cashier/statistics-payment-records",
                {
                    params: { academicYear },
                }
            );
            setStats(response.data);
        } catch (err: any) {
            setError(err.response?.status === 400 ? "Tham số không hợp lệ" : "Lỗi hệ thống khi lấy dữ liệu thống kê.");
        }
    };

    useEffect(() => {
        fetchPaymentStatistics();
    }, [academicYear]);

    return (
        <div className="p-6">
            <div className="text-black text-base font-medium mb-6">
                Thống kê / Học phí
            </div>

            {/* Bộ lọc */}
            <form className="flex items-center gap-4 mb-6">
                <Select value={academicYear} onValueChange={setAcademicYear}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Chọn năm học" />
                    </SelectTrigger>
                    <SelectContent>
                        {yearList.map((year) => (
                            <SelectItem key={year} value={year}>
                                {year}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </form>

            {/* Thông báo lỗi */}
            {error && <p className="text-red-500 mb-6">{error}</p>}

            {/* Thẻ thống kê */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <StatCard
                    title="Tổng số học sinh"
                    value={(stats?.totalStudents || 0).toLocaleString("vi-VN")}
                    percent={`${Math.abs(stats?.totalStudentsChangePercent || 0).toFixed(2)}%`}
                    change={(stats?.totalStudentsChangePercent ?? 0) >= 0 ? "up" : "down"}
                    icon={<Ticket size={40} color="#01B3EF" />}
                    bg="bg-[rgba(109,207,251,0.08)]"
                    border="border-[rgba(1,179,239,1)]"
                    compareText={comparisonText}
                />
                <StatCard
                    title="Đã thanh toán"
                    value={(stats?.paidStudents || 0).toLocaleString("vi-VN")}
                    percent={`${Math.abs(stats?.paidStudentsChangePercent || 0).toFixed(2)}%`}
                    change={(stats?.paidStudentsChangePercent ?? 0) >= 0 ? "up" : "down"}
                    icon={<Ticket size={40} color="#16a34a" />}
                    bg="bg-[rgba(22,163,74,0.08)]"
                    border="border-[rgba(22,163,74,1)]"
                    compareText={comparisonText}
                />
                <StatCard
                    title="Thanh toán 1 phần"
                    value={(stats?.partiallyPaidStudents || 0).toLocaleString("vi-VN")}
                    percent={`${Math.abs(stats?.partiallyPaidStudentsChangePercent || 0).toFixed(2)}%`}
                    change={(stats?.partiallyPaidStudentsChangePercent ?? 0) >= 0 ? "up" : "down"}
                    icon={<Ticket size={40} color="#f59e0b" />}
                    bg="bg-[rgba(245,158,11,0.08)]"
                    border="border-[rgba(245,158,11,1)]"
                    compareText={comparisonText}
                />
                <StatCard
                    title="Chưa thanh toán"
                    value={(stats?.unpaidStudents || 0).toLocaleString("vi-VN")}
                    percent={`${Math.abs(stats?.unpaidStudentsChangePercent || 0).toFixed(2)}%`}
                    change={(stats?.unpaidStudentsChangePercent ?? 0) >= 0 ? "up" : "down"}
                    icon={<Ticket size={40} color="#dc2626" />}
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
                        Thống kê học phí trong học kỳ
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
                        Số liệu về số tiền thanh toán theo trạng thái
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