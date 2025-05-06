"use client";
import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import StatCard from "./StatCard";

interface WeakStudentCardProps {
  month: number;
}

const WeakStudentCard: React.FC<WeakStudentCardProps> = ({ month }) => {
  const [data, setData] = useState({
    value: "0",
    percent: "0%",
    trend: "equal" as "up" | "down" | "equal",
  });

  useEffect(() => {
    // 🎯 Mock data học sinh cảnh báo
    const mockData = {
      warningStudents: 15,
      percentChange: 4.7,
      trend: "up",
    };

    const timeout = setTimeout(() => {
      setData({
        value: mockData.warningStudents.toLocaleString("vi-VN"),
        percent: `${Math.abs(mockData.percentChange).toFixed(2)}%`,
        trend: mockData.trend as "up" | "down" | "equal",
      });
    }, 500);

    return () => clearTimeout(timeout);
  }, [month]);

  return (
    <StatCard
      title="Học sinh yếu"
      value={data.value}
      percent={data.percent}
      change={data.trend}
      icon={<Users size={40} color="#dc2626" />} // màu đỏ báo động
      bg="bg-[rgba(220,38,38,0.08)]"
      border="border-[rgba(220,38,38,1)]"
      compareText={month === 1 ? undefined : `so với tháng ${month - 1}/2025`}
    />
  );
};

export default WeakStudentCard;
