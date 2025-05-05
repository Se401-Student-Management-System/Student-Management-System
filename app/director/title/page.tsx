"use client";

import React, { useEffect, useState } from "react";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import { titleData } from "./data/title-data";

export default function PageTitle() {
  const [error, setError] = useState<string | undefined>(undefined);

  return (
    <div className="relative justify-start text-black text-base font-normal font-['Inter']">
      Trung tâm / Quy định / Danh hiệu
      <DataTable
        columns={columns}
        data={titleData}
        isLoading={false}
        error={error}
      />
    </div>
  );
}
