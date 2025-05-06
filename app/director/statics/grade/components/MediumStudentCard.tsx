"use client";
import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import StatCard from "./StatCard";

interface MediumStudentCardProps {
  month: number;
}

const MediumStudentCard: React.FC<MediumStudentCardProps> = ({ month }) => {
  const [data, setData] = useState({
    value: "0",
    percent: "0%",
    trend: "equal" as "up" | "down" | "equal",
  });

  useEffect(() => {
    // 🎯 Mock data tổng số học sinh
    const mockData = {
      totalStudents: 824,
      percentChange: 2.3,
      trend: "up",
    };

    const timeout = setTimeout(() => {
      setData({
        value: mockData.totalStudents.toLocaleString("vi-VN"),
        percent: `${Math.abs(mockData.percentChange).toFixed(2)}%`,
        trend: mockData.trend as "up" | "down" | "equal",
      });
    }, 500);

    return () => clearTimeout(timeout);
  }, [month]);

  return (
    <StatCard
      title="Học sinh trung bình"
      value={data.value}
      percent={data.percent}
      change={data.trend}
      icon={<Users size={40} color="#16a34a" />} // màu xanh lá
      bg="bg-[rgba(22,163,74,0.08)]"
      border="border-[rgba(22,163,74,1)]"
      compareText={month === 1 ? undefined : `so với tháng ${month - 1}/2025`}
    />
  );
};

export default MediumStudentCard;
