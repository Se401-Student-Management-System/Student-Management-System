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

interface FeeStats {
    totalCount: number;
    paidCount: number;
    debtCount: number;
    halfCount: number;
    totalChange: number;
    paidChange: number;
    debtChange: number;
    halfChange: number;
}

export default function FeeStaticsPage() {
    const [year, setYear] = useState<string>("2024");
    const [semester, setSemester] = useState<string>("Học kỳ 1");
    const [error, setError] = useState<string | undefined>(undefined);
    const [stats, setStats] = useState<FeeStats>({
        totalCount: 500,
        paidCount: 300,
        debtCount: 50,
        halfCount: 150,
        totalChange: 5.2,
        paidChange: 2.3,
        debtChange: -3.1,
        halfChange: -1.8,
    });

    // Mock danh sách năm học
    const yearList = ["2024", "2023", "2022", "2021"];

    // Tạo văn bản so sánh
    const previousYear = (parseInt(year) - 1).toString();
    const comparisonText = semester
        ? `so với ${semester.toLowerCase()} năm ${previousYear}`
        : `so với năm ${previousYear}`;

    // Dữ liệu cho biểu đồ tròn
    const pieData = [
        { name: "Đã thanh toán", value: stats.paidCount },
        { name: "Chưa thanh toán", value: stats.debtCount },
        { name: "Thanh toán 1 phần", value: stats.halfCount },
    ];

    // Dữ liệu cho biểu đồ cột
    const barData = [
        { name: "Đã thanh toán", count: stats.paidCount },
        { name: "Chưa thanh toán", count: stats.debtCount },
        { name: "Thanh toán 1 phần", count: stats.halfCount },
    ];

    // Màu sắc cho biểu đồ
    const COLORS = ["#16a34a", "#dc2626", "#f59e0b"];

    useEffect(() => {
        // Mock API call
        const fetchData = async () => {
        try {
            // Giả lập gọi API: /api/teacher/statics/grade?year={year}&semester={semester}
            setTimeout(() => {
            setStats({
                totalCount: 500,
                paidCount: 300,
                debtCount: 50,
                halfCount: 150,
                totalChange: 5.2,
                paidChange: 2.3,
                debtChange: -3.1,
                halfChange: -1.8,
            });
            }, 500);
        } catch (err) {
            setError("Không thể tải dữ liệu thống kê");
        }
    };
    fetchData();
    }, [year, semester]);

    return (
        <div className="p-6">
            <div className="text-black text-base font-medium mb-6">
                Thống kê / Học phí
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
                title="Tổng học phí"
                value={stats.totalCount.toLocaleString("vi-VN")}
                percent={`${Math.abs(stats.totalChange).toFixed(2)}%`}
                change={stats.totalChange >= 0 ? "up" : "down"}
                icon={<Ticket size={40} color="#01B3EF" />}
                bg="bg-[rgba(109,207,251,0.08)]"
                border="border-[rgba(1,179,239,1)]"
                compareText={comparisonText}
                />
                <StatCard
                title="Đã thanh toán"
                value={stats.paidCount.toLocaleString("vi-VN")}
                percent={`${Math.abs(stats.paidChange).toFixed(2)}%`}
                change={stats.paidChange >= 0 ? "up" : "down"}
                icon={<Ticket size={40} color="#16a34a" />}
                bg="bg-[rgba(22,163,74,0.08)]"
                border="border-[rgba(22,163,74,1)]"
                compareText={comparisonText}
                />
                <StatCard
                title="Thanh toán 1 phần"
                value={stats.halfCount.toLocaleString("vi-VN")}
                percent={`${Math.abs(stats.halfChange).toFixed(2)}%`}
                change={stats.halfChange >= 0 ? "up" : "down"}
                icon={<Ticket size={40} color="#f59e0b" />}
                bg="bg-[rgba(245,158,11,0.08)]"
                border="border-[rgba(245,158,11,1)]"
                compareText={comparisonText}
                />
                <StatCard
                title="Chưa thanh toán"
                value={stats.debtCount.toLocaleString("vi-VN")}
                percent={`${Math.abs(stats.debtChange).toFixed(2)}%`}
                change={stats.debtChange >= 0 ? "up" : "down"}
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