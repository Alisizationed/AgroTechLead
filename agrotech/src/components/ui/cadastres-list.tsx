import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import Link from "next/link";

const raionMap: Record<number, string> = {
  0: "Cantemir",
  1: "Cahul",
  2: "Orhei",
  3: "Bălți",
  4: "Ungheni",
  5: "Ștefan Vodă",
};

const getRaionName = (id?: number) => (id != null ? raionMap[id] ?? `ID ${id}` : "—");

const CadastresList = ({
  data,
  type,
}: {
  data: Array<any>;
  type: "Cadastru" | "CadastruCrop" | "CadastruLivestock";
}) => {
  if (type === "Cadastru") {
    return (
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
          {data && data.length > 0 ? (
            data.map((item) => (
              <TableRow key={item.cadastruId ?? Math.random()}>
                <TableCell>
                  {item.cadastruId ? (
                    <Link href={`/cadastres/${item.cadastruId}`}>
                      <b>{item.cadastruId}</b>
                    </Link>
                  ) : (
                    "—"
                  )}
                </TableCell>
                <TableCell>{getRaionName(item.raionId)}</TableCell>
                <TableCell>{item.hectare ?? "—"}</TableCell>
                <TableCell>{item.longitude ?? "—"}</TableCell>
                <TableCell>{item.latitude ?? "—"}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow key="empty">
              <TableCell colSpan={5}>
                <div className="text-center text-gray-500">No data provided</div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    );
  } else if (type === "CadastruCrop") {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Raion</TableHead>
            <TableHead>Hectare</TableHead>
            <TableHead>Longitude</TableHead>
            <TableHead>Latitude</TableHead>
            <TableHead>Crop Name</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Pesticide</TableHead>
            <TableHead>Produced At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data && data.length > 0 ? (
            data.map((item) => (
              <TableRow key={item.cadastruId ?? Math.random()}>
                <TableCell>
                  {item.cadastruId ? (
                    <Link href={`/cadastres/${item.cadastruId}`}>
                      <b>{item.cadastruId}</b>
                    </Link>
                  ) : (
                    "—"
                  )}
                </TableCell>
                <TableCell>{getRaionName(item.raionId)}</TableCell>
                <TableCell>{item.hectare ?? "—"}</TableCell>
                <TableCell>{item.longitude ?? "—"}</TableCell>
                <TableCell>{item.latitude ?? "—"}</TableCell>
                <TableCell>{item.cropName ?? "—"}</TableCell>
                <TableCell>{item.quantity ?? "—"}</TableCell>
                <TableCell>{item.pesticide ?? "—"}</TableCell>
                <TableCell>
                  {item.dataProduced
                    ? new Date(item.dataProduced).toLocaleString()
                    : "—"}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow key="empty">
              <TableCell colSpan={9}>
                <div className="text-center text-gray-500">No data provided</div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    );
  } else {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Raion</TableHead>
            <TableHead>Hectare</TableHead>
            <TableHead>Longitude</TableHead>
            <TableHead>Latitude</TableHead>
            <TableHead>Livestock Name</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Contaminated</TableHead>
            <TableHead>Produced At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data && data.length > 0 ? (
            data.map((item) => (
              <TableRow key={item.cadastruId ?? Math.random()}>
                <TableCell>
                  {item.cadastruId ? (
                    <Link href={`/cadastres/${item.cadastruId}`}>
                      <b>{item.cadastruId}</b>
                    </Link>
                  ) : (
                    "—"
                  )}
                </TableCell>
                <TableCell>{getRaionName(item.raionId)}</TableCell>
                <TableCell>{item.hectare ?? "—"}</TableCell>
                <TableCell>{item.longitude ?? "—"}</TableCell>
                <TableCell>{item.latitude ?? "—"}</TableCell>
                <TableCell>{item.livestockName ?? "—"}</TableCell>
                <TableCell>{item.quantity ?? "—"}</TableCell>
                <TableCell>{item.contaminated ?? "—"}</TableCell>
                <TableCell>
                  {item.dataProduced
                    ? new Date(item.dataProduced).toLocaleString()
                    : "—"}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow key="empty">
              <TableCell colSpan={9}>
                <div className="text-center text-gray-500">No data provided</div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    );
  }
};

export default CadastresList;
