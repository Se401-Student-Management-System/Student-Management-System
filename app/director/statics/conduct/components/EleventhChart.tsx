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

interface ConductData {
  goodCount: number;
  fairCount: number;
  averageCount: number;
  poorCount: number;
}

interface EleventhChartProps {
  data: ConductData;
}

const chartData = (data: ConductData) => [
  {
    name: "Khối 11",
    tot: data.goodCount,
    kha: data.fairCount,
    trungBinh: data.averageCount,
    yeu: data.poorCount,
  },
];

export default function EleventhChart({ data }: EleventhChartProps) {
  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData(data)}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="tot"
            fill="#01427A"
            name="Hạnh kiểm Tốt"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="kha"
            fill="#01B3EF"
            name="Hạnh kiểm Khá"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="trungBinh"
            fill="#F59E0B"
            name="Hạnh kiểm Trung bình"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="yeu"
            fill="#E14177"
            name="Hạnh kiểm Yếu"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}