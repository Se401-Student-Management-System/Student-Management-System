"use client";
import { useEffect, useState } from "react";
import { Users, TrendingUp, TrendingDown } from "lucide-react";
import StatCard from "./StatCard";

interface ExcellentStudentCardProps {
  month: number;
}

const ExcellentStudentCard: React.FC<ExcellentStudentCardProps> = ({
  month,
}) => {
  const [data, setData] = useState({
    value: "0",
    percent: "0%",
    trend: "equal" as "up" | "down" | "equal",
  });

  useEffect(() => {
    // 🎯 Dữ liệu mock số lượng học sinh mới
    const mockData = {
      newStudents: 132,
      percentChange: 8.9,
      trend: "up",
    };

    const timeout = setTimeout(() => {
      setData({
        value: mockData.newStudents.toLocaleString("vi-VN"),
        percent: `${Math.abs(mockData.percentChange).toFixed(2)}%`,
        trend: mockData.trend as "up" | "down" | "equal",
      });
    }, 500);

    return () => clearTimeout(timeout);
  }, [month]);

  return (
    <StatCard
      title="Học sinh xuất sắc"
      value={data.value}
      percent={data.percent}
      change={data.trend}
      icon={<Users size={40} color="#01B3EF" />}
      bg="bg-[rgba(109,207,251,0.08)]"
      border="border-[rgba(1, 179, 239, 1)]"
      compareText={month === 1 ? undefined : `so với tháng ${month - 1}/2025`}
    />
  );
};

export default ExcellentStudentCard;
