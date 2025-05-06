import {
  LineChart,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
} from "recharts";
import { useEffect, useState } from "react";

interface GradeData {
  month: number;
  new: number;
  preserved: number;
  warning: number;
}

const GradeChart = () => {
  const [data, setData] = useState<GradeData[]>([]);

  useEffect(() => {
    // 🎯 Mock dữ liệu 12 tháng
    const mockGradeData: GradeData[] = Array.from({ length: 12 }, (_, i) => ({
      month: i + 1,
      new: Math.floor(Math.random() * 100) + 50, // 50 - 149 học sinh mới
      preserved: Math.floor(Math.random() * 30) + 10, // 10 - 39 bảo lưu
      warning: Math.floor(Math.random() * 20) + 5, // 5 - 24 cảnh báo
    }));

    setTimeout(() => {
      setData(mockGradeData);
    }, 500);
  }, []);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md mb-10 w-full">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        Biểu đồ học lực theo tháng
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="new"
            stroke="#3b82f6"
            strokeWidth={3}
            name="Học sinh xuất sắc"
          />
          <Line
            type="monotone"
            dataKey="preserved"
            stroke="#f59e0b"
            strokeWidth={3}
            name="Học sinh giỏi"
          />
          <Line
            type="monotone"
            dataKey="warning"
            stroke="#ef4444"
            strokeWidth={3}
            name="Học sinh trung bình"
          />
          <Line
            type="monotone"
            dataKey="warning"
            stroke="#ff0000"
            strokeWidth={3}
            name="Học sinh yếu"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GradeChart;
