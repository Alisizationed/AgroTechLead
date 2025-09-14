'use client'

import { useGetCadastres } from "@/api/apiComponents";
import LoadingElement from "@/components/ui/loading-circle";
import React from "react";

// utils/jsonToCsv.js
function downloadCSV(jsonData: any[], fileName = "data.csv") {
  if (!jsonData || !jsonData.length) return;

  const headers = Object.keys(jsonData[0]).join(",");
  const rows = jsonData.map((row) =>
    Object.values(row)
      .map((value) => `"${value}"`)
      .join(","),
  );

  const csvContent = [headers, ...rows].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

const ExportPage = () => {
  const { data, isLoading, isError } = useGetCadastres({});

  if (isLoading) {
    return <LoadingElement />;
  }

  if (isError) {
    return <div>ERROR</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <button
        onClick={() => downloadCSV(data!)}
        className="rounded-md border border-black bg-white px-4 py-2 text-sm text-black transition duration-200 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)]"
      >
        Download CSV
      </button>
    </div>
  );
};

export default ExportPage;
