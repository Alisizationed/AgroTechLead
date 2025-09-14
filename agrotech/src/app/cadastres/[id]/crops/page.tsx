"use client";

import React, { useState } from "react";

type CropInput = {
  cropId: number;
  name: string;
  quantity: number;
  pesticide: number;
};

const defaultCrops: CropInput[] = [
  { cropId: 1, name: "Wheat", quantity: 0, pesticide: 0 },
  { cropId: 2, name: "Corn", quantity: 0, pesticide: 0 },
  { cropId: 3, name: "Barley", quantity: 0, pesticide: 0 },
  { cropId: 4, name: "Sunflower", quantity: 0, pesticide: 0 },
  { cropId: 5, name: "Sugar Beet", quantity: 0, pesticide: 0 },
  { cropId: 6, name: "Soybeans", quantity: 0, pesticide: 0 },
];

const CropForm = () => {
  const [crops, setCrops] = useState<CropInput[]>(defaultCrops);

  const handleChange = (index: number, field: "quantity" | "pesticide", value: number) => {
    const newCrops = [...crops];
    newCrops[index]![field] = value;
    setCrops(newCrops);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Filter out crops with zero quantity
    const cropsToSubmit = crops.filter((c) => c.quantity > 0);

    if (cropsToSubmit.length === 0) {
      console.error("Please enter at least one crop quantity.");
      return;
    }

    // Here you can send `cropsToSubmit` to your API
    console.log("Submitting crops:", cropsToSubmit);
    console.log("Crops submitted successfully!");
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 space-y-4 border rounded shadow">
        <h2 className="text-xl font-bold mb-2">Crops Form</h2>

        {crops.map((c, i) => (
          <div key={c.cropId} className="flex gap-2 items-center">
            <span className="w-32">{c.name}</span>
            <input
              type="number"
              className="border p-1 w-24"
              placeholder="Quantity"
              value={c.quantity}
              onChange={(e) => handleChange(i, "quantity", Number(e.target.value))}
            />
            <input
              type="number"
              className="border p-1 w-24"
              placeholder="Pesticide"
              value={c.pesticide}
              onChange={(e) => handleChange(i, "pesticide", Number(e.target.value))}
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

export default CropForm;
