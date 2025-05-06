"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import TenthChart from "./components/TenthChart";
import EleventhChart from "./components/EleventhChart";
import TwelfthChart from "./components/TwelfthChart";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import { conductData } from "./data/conduct-data";

export default function page() {
  const [error, setError] = React.useState<string | undefined>(undefined);
  return (
    <div>
      <div className="text-black text-base font-medium mb-6">
        Trung tâm / Thống kê / Hạnh kiểm
      </div>
      <div className="w-full h-full self-stretch inline-flex justify-between items-center">
        <div className="w-1/2 h-full inline-flex flex-col justify-start items-start gap-5">
          <Tabs defaultValue="gradeTenth" className="w-[90%] h-full">
            <TabsList className="grid w-full grid-cols-3 mb-20">
              <TabsTrigger value="gradeTenth">Khối 10</TabsTrigger>
              <TabsTrigger value="gradeEleventh">Khối 11</TabsTrigger>
              <TabsTrigger value="gradeTwelfth">Khối 12</TabsTrigger>
            </TabsList>
            <TabsContent value="gradeTenth">
              <TenthChart />
            </TabsContent>
            <TabsContent value="gradeEleventh">
              <EleventhChart />
            </TabsContent>
            <TabsContent value="gradeTwelfth">
              <TwelfthChart />
            </TabsContent>
          </Tabs>
        </div>
        <div className="w-1/2 self-stretch self-stretch p-2.5 bg-white inline-flex flex-col justify-start items-center gap-2.5 overflow-hidden">
          <div className="justify-start text-black text-[16px] font-[600] font-['Inter']">
            Danh sách các học sinh vi phạm nhiều nhất
          </div>
          <DataTable
            columns={columns}
            data={conductData}
            isLoading={false}
            error={error}
          />
        </div>
      </div>
    </div>
  );
}
