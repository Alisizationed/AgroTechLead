"use client";

import React, { use } from "react";
import {
  useGetCadastru1,
  useGetCrops,
  useGetLivestock,
} from "@/api/apiComponents";
import LoadingElement from "@/components/ui/loading-circle";
import MapWithWMS from "@/components/ui/mapwithwms";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { useSession } from "next-auth/react";

const raionMap: Record<number, string> = {
  0: "Cantemir",
  1: "Cahul",
  2: "Orhei",
  3: "Bălți",
  4: "Ungheni",
  5: "Ștefan Vodă",
};

const getRaionName = (id?: number) =>
  id != null ? (raionMap[id] ?? `ID ${id}`) : "—";

const Crops = ({ id }: { id: number }) => {
  const { data, isLoading, isError } = useGetCrops({
    pathParams: { id },
  });

  if (isLoading) return <LoadingElement />;
  if (isError) return <div>ERROR</div>;

  if (data && data.length > 0) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Pesticide</TableHead>
            <TableHead>Date Produced</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.cropId ?? Math.random()}>
              <TableCell>{item.cropName ?? "—"}</TableCell>
              <TableCell>{item.quantity ?? "—"}</TableCell>
              <TableCell>{item.pesticide ?? "—"}</TableCell>
              <TableCell>
                {item.dataProduced
                  ? new Date(item.dataProduced).toLocaleString()
                  : "—"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  return <div className="text-center text-gray-500">No crops available</div>;
};

const Livestock = ({ id }: { id: number }) => {
  const { data, isLoading, isError } = useGetLivestock({
    pathParams: { id },
  });

  if (isLoading) return <LoadingElement />;
  if (isError) return <div>ERROR</div>;

  if (data && data.length > 0) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Contaminated</TableHead>
            <TableHead>Produced At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.livestockId ?? Math.random()}>
              <TableCell>{item.livestockId ?? "—"}</TableCell>
              <TableCell>{item.livestockName ?? "—"}</TableCell>
              <TableCell>{item.quantity ?? "—"}</TableCell>
              <TableCell>{item.contaminated ?? "—"}</TableCell>
              <TableCell>
                {item.dataProduced
                  ? new Date(item.dataProduced).toLocaleString()
                  : "—"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  return <div className="text-center text-gray-500">No crops available</div>;
};

const Cadastre = ({ params }: { params: Promise<{ id: number }> }) => {
  const resolvedParams = use(params);
  const { data: session, status } = useSession();
  const { data, isLoading, isError } = useGetCadastru1({
    pathParams: { id: resolvedParams.id },
  });

  if (isLoading) return <LoadingElement />;
  if (isError) return <div>ERROR</div>;

  return (
    <div className="space-y-6 p-6">
      {session?.user.id == data?.userId && (
        <div>
          <button className="rounded-md border border-black bg-white px-4 py-2 text-sm text-black transition duration-200 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)]">
            <Link href={`/cadastres/${resolvedParams.id}/crops`}>
              Create crops entry
            </Link>
          </button>
          <button className="rounded-md border border-black bg-white px-4 py-2 text-sm text-black transition duration-200 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)]">
            <Link href={`/cadastres/${resolvedParams.id}/livestock`}>
              Create livestock entry
            </Link>
          </button>
        </div>
      )}
      <Card>
        <CardHeader>
          <CardTitle>Cadastre Records</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Raion</TableHead>
                <TableHead>Hectare</TableHead>
                <TableHead>Longitude</TableHead>
                <TableHead>Latitude</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow key={data?.cadastruId ?? Math.random()}>
                <TableCell>{data?.cadastruId ?? "—"}</TableCell>
                <TableCell>{getRaionName(data?.raionId)}</TableCell>
                <TableCell>{data?.hectare ?? "—"}</TableCell>
                <TableCell>{data?.longitude ?? "—"}</TableCell>
                <TableCell>{data?.latitude ?? "—"}</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          {data?.longitude != null && data?.latitude != null && (
            <MapWithWMS long={data.longitude} lat={data.latitude} />
          )}

          {data?.cadastruId != null && <Crops id={data.cadastruId} />}
          {data?.cadastruId != null && <Livestock id={data.cadastruId} />}
        </CardContent>
      </Card>
    </div>
  );
};

export default Cadastre;
