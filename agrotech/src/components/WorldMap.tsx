"use client";
import WorldMap from "@/components/ui/world-map";
import { motion } from "motion/react";

export function WorldMapDemo() {
  return (
    <div className="py-40 dark:bg-black bg-white w-full">
      <div className="max-w-7xl mx-auto text-center">
        <p className="font-bold text-xl md:text-4xl dark:text-white text-black">
          Remote Agro{" "}
          <span className="text-neutral-400">
            {"Connectivity".split("").map((letter, idx) => (
              <motion.span
                key={idx}
                className="inline-block"
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.04 }}
              >
                {letter}
              </motion.span>
            ))}
          </span>
        </p>
        <p className="text-sm md:text-lg text-neutral-500 max-w-2xl mx-auto py-4">
          Expand your farm's reach. Track your farm, manage products, and 
          connect with customers across borders, without leaving your land.
        </p>
      </div>

      <WorldMap
        dots={[
          // Moldova -> EU
          {
            start: { lat: 47.0105, lng: 28.8638 }, // Moldova
            end: { lat: 48.8566, lng: 2.3522 }, // Paris, France
          },
          {
            start: { lat: 47.0105, lng: 28.8638 }, // Moldova
            end: { lat: 50.1109, lng: 8.6821 }, // Frankfurt, Germany
          },
          {
            start: { lat: 47.0105, lng: 28.8638 }, // Moldova
            end: { lat: 45.4642, lng: 9.1900 }, // Milan, Italy
          },
          {
            start: { lat: 47.0105, lng: 28.8638 }, // Moldova
            end: { lat: 52.5200, lng: 13.4050 }, // Berlin, Germany
          },

          // Moldova -> Global
          {
            start: { lat: 47.0105, lng: 28.8638 }, // Moldova
            end: { lat: 34.0522, lng: -118.2437 }, // Los Angeles, USA
          },
          {
            start: { lat: 47.0105, lng: 28.8638 }, // Moldova
            end: { lat: 35.6895, lng: 139.6917 }, // Tokyo, Japan
          },
          {
            start: { lat: 47.0105, lng: 28.8638 }, // Moldova
            end: { lat: -33.8688, lng: 151.2093 }, // Sydney, Australia
          },
        ]}
      />
    </div>
  );
}
