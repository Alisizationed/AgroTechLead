"use client";

import React, { useState } from "react";

type LivestockInput = {
  livestockId: number;
  name: string;
  quantity: number;
  contaminated: number;
};

const defaultLivestock: LivestockInput[] = [
  { livestockId: 1, name: "Cattle", quantity: 0, contaminated: 0 },
  { livestockId: 2, name: "Pigs", quantity: 0, contaminated: 0 },
  { livestockId: 3, name: "Sheep", quantity: 0, contaminated: 0 },
  { livestockId: 4, name: "Goats", quantity: 0, contaminated: 0 },
  { livestockId: 5, name: "Chickens", quantity: 0, contaminated: 0 },
  { livestockId: 6, name: "Ducks", quantity: 0, contaminated: 0 },
  { livestockId: 7, name: "Geese", quantity: 0, contaminated: 0 },
  { livestockId: 8, name: "Turkeys", quantity: 0, contaminated: 0 },
  { livestockId: 9, name: "Horses", quantity: 0, contaminated: 0 },
  { livestockId: 10, name: "Rabbits", quantity: 0, contaminated: 0 },
];

const LivestockForm = () => {
  const [livestock, setLivestock] = useState<LivestockInput[]>(defaultLivestock);

  const handleChange = (index: number, field: "quantity" | "contaminated", value: number) => {
    const newData = [...livestock];
    newData[index]![field] = value;
    setLivestock(newData);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const livestockToSubmit = livestock.filter((l) => l.quantity > 0);

    if (livestockToSubmit.length === 0) {
      console.error("Please enter at least one livestock quantity.");
      return;
    }

    // Send `livestockToSubmit` to your API
    console.log("Submitting livestock:", livestockToSubmit);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 space-y-4 border rounded shadow">
        <h2 className="text-xl font-bold mb-2">Livestock Form</h2>

        {livestock.map((l, i) => (
          <div key={l.livestockId} className="flex gap-2 items-center">
            <span className="w-32">{l.name}</span>
            <input
              type="number"
              className="border p-1 w-24"
              placeholder="Quantity"
              value={l.quantity}
              onChange={(e) => handleChange(i, "quantity", Number(e.target.value))}
            />
            <input
              type="number"
              className="border p-1 w-24"
              placeholder="Contaminated"
              value={l.contaminated}
              onChange={(e) => handleChange(i, "contaminated", Number(e.target.value))}
            />
          </div>
        ))}

        <button className="px-4 py-2 rounded-md border border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200">
            Submit
        </button>
      </form>

    </>
  );
};

export default LivestockForm;
