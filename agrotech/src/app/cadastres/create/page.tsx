"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useSaveCadastru } from "@/api/apiComponents";

type CropInput = { cropId: number; quantity: number; pesticide: number };
type LivestockInput = { livestockId: number; quantity: number; contaminated: number };

const CadastruForm = () => {
  const router = useRouter();
  const session = useSession();
  const mutation = useSaveCadastru();

  const [raionId, setRaionId] = useState(0);
  const [hectare, setHectare] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);

  const crops = [
    { cropId: 1, name: "Wheat" },
    { cropId: 2, name: "Corn" },
    { cropId: 3, name: "Barley" },
    { cropId: 4, name: "Sunflower" },
  ];

  const livestock = [
    { livestockId: 1, name: "Cattle" },
    { livestockId: 2, name: "Pigs" },
    { livestockId: 3, name: "Sheep" },
    { livestockId: 4, name: "Goats" },
  ];

  const [cropsData, setCropsData] = useState<CropInput[]>(crops.map(c => ({ cropId: c.cropId, quantity: 0, pesticide: 0 })));
  const [livestockData, setLivestockData] = useState<LivestockInput[]>(livestock.map(l => ({ livestockId: l.livestockId, quantity: 0, contaminated: 0 })));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session.data?.user.keycloakId) return (
        <div>No session found</div>
    );

    const payload = {
      userId: session.data.user.keycloakId,
      raionId,
      hectare,
      longitude,
      latitude,
    };

    try {
      await mutation.mutateAsync({ body: payload });
      router.push("/cadastres");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto p-4">
        <div>
          <label className="block font-bold">Raion ID</label>
          <input type="number" className="border p-2 w-full" value={raionId} onChange={e => setRaionId(Number(e.target.value))} />
        </div>
        <div>
          <label className="block font-bold">Hectare</label>
          <input type="number" className="border p-2 w-full" value={hectare} onChange={e => setHectare(Number(e.target.value))} />
        </div>
        <div>
          <label className="block font-bold">Longitude</label>
          <input type="number" className="border p-2 w-full" value={longitude} onChange={e => setLongitude(Number(e.target.value))} />
        </div>
        <div>
          <label className="block font-bold">Latitude</label>
          <input type="number" className="border p-2 w-full" value={latitude} onChange={e => setLatitude(Number(e.target.value))} />
        </div>

        {/* <div>
          <h3 className="font-bold">Crops</h3>
          {cropsData.map((c, i) => (
            <div key={c.cropId} className="flex gap-2 mb-2">
              <span className="w-24">{crops[i].name}</span>
              <input type="number" placeholder="Quantity" className="border p-1 w-24"
                value={c.quantity}
                onChange={e => {
                  const newData = [...cropsData];
                  newData[i].quantity = Number(e.target.value);
                  setCropsData(newData);
                }}
              />
              <input type="number" placeholder="Pesticide" className="border p-1 w-24"
                value={c.pesticide}
                onChange={e => {
                  const newData = [...cropsData];
                  newData[i].pesticide = Number(e.target.value);
                  setCropsData(newData);
                }}
              />
            </div>
          ))}
        </div>

        <div>
          <h3 className="font-bold">Livestock</h3>
          {livestockData.map((l, i) => (
            <div key={l.livestockId} className="flex gap-2 mb-2">
              <span className="w-24">{livestock[i].name}</span>
              <input type="number" placeholder="Quantity" className="border p-1 w-24"
                value={l.quantity}
                onChange={e => {
                  const newData = [...livestockData];
                  newData[i].quantity = Number(e.target.value);
                  setLivestockData(newData);
                }}
              />
              <input type="number" placeholder="Contaminated" className="border p-1 w-24"
                value={l.contaminated}
                onChange={e => {
                  const newData = [...livestockData];
                  newData[i].contaminated = Number(e.target.value);
                  setLivestockData(newData);
                }}
              />
            </div>
          ))}
        </div> */}

      <button type="submit" className="px-4 py-2 rounded-md border border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200">
        Create
      </button>
      </form>
    </>
  );
};

export default CadastruForm;
