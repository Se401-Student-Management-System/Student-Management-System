"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Chuyển data về dạng 1 object chứa các loại học sinh
const data = [
  {
    name: "Khối 10",
    gioi: 40,
    trungBinh: 35,
    yeu: 25,
  },
];

export default function TenthChart() {
  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="gioi"
            fill="#01427A"
            name="Học sinh giỏi"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="trungBinh"
            fill="#01B3EF"
            name="Học sinh trung bình"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="yeu"
            fill="#E14177"
            name="Học sinh yếu"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
