"use client";
import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import StatCard from "./StatCard";

interface GoodStudentCardProps {
  month: number;
}

const GoodStudentCard: React.FC<GoodStudentCardProps> = ({ month }) => {
  const [data, setData] = useState({
    value: "0",
    percent: "0%",
    trend: "equal" as "up" | "down" | "equal",
  });

  useEffect(() => {
    // 🎯 Mock data cho học sinh bảo lưu
    const mockData = {
      preservedStudents: 24,
      percentChange: -3.1,
      trend: "down",
    };

    const timeout = setTimeout(() => {
      setData({
        value: mockData.preservedStudents.toLocaleString("vi-VN"),
        percent: `${Math.abs(mockData.percentChange).toFixed(2)}%`,
        trend: mockData.trend as "up" | "down" | "equal",
      });
    }, 500);

    return () => clearTimeout(timeout);
  }, [month]);

  return (
    <StatCard
      title="Học sinh giỏi"
      value={data.value}
      percent={data.percent}
      change={data.trend}
      icon={<Users size={40} color="#f59e0b" />} // màu vàng cảnh báo
      bg="bg-[rgba(245,158,11,0.08)]"
      border="border-[rgba(245,158,11,1)]"
      compareText={month === 1 ? undefined : `so với tháng ${month - 1}/2025`}
    />
  );
};

export default GoodStudentCard;
