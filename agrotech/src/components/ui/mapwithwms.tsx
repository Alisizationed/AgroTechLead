"use client";

import { useEffect, useRef } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import { OSM, TileWMS, Vector as VectorSource } from "ol/source";
import { fromLonLat } from "ol/proj";
import GeoJSON from "ol/format/GeoJSON";
import { Style, Stroke, Fill, Text } from "ol/style";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface MapWithWmsProps {
  long: number;
  lat: number;
  zoom?: number;
}

const MapWithWms: React.FC<MapWithWmsProps> = ({
  long,
  lat,
  zoom = 18,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const baseLayer = new TileLayer({ source: new OSM() });

    // WMS cadastral layer for polygons
    const wmsLayer = new TileLayer({
      source: new TileWMS({
        url: "https://geodata.gov.md/geoserver/w_rsuat/wms",
        params: {
          LAYERS: "mv_cadastral",
          FORMAT: "image/png",
          TRANSPARENT: true,
          VERSION: "1.1.1",
          STYLES: "label_cadastre",
          SRS: "EPSG:4026",
        },
        serverType: "geoserver",
        crossOrigin: "anonymous",
      }),
    });

    // WFS vector layer to show numbers
    const vectorLayer = new VectorLayer({
      source: new VectorSource({
        url: `https://geodata.gov.md/geoserver/w_rsuat/ows?service=WFS&version=1.1.0&request=GetFeature&typeName=w_rsuat:mv_cadastral&outputFormat=application/json`,
        format: new GeoJSON(),
      }),
      style: (feature) =>
        new Style({
          stroke: new Stroke({
            color: "rgba(0,0,255,0.6)",
            width: 1,
          }),
          fill: new Fill({
            color: "rgba(0,0,255,0.1)",
          }),
          text: new Text({
            text: feature.get("nr_cadastral") || "", // show cadastral number
            font: "12px Arial",
            fill: new Fill({ color: "#000" }),
            stroke: new Stroke({ color: "#fff", width: 2 }),
          }),
        }),
    });

    const map = new Map({
      target: mapRef.current,
      layers: [baseLayer, wmsLayer, vectorLayer],
      view: new View({
        center: fromLonLat([long, lat]),
        zoom,
      }),
    });

    return () => map.setTarget(undefined);
  }, [long, lat, zoom]);

  return (
    <Card className="w-full h-[500px]">
      <CardHeader>
        <CardTitle>Cadastre Map</CardTitle>
      </CardHeader>
      <CardContent className="p-0 h-full">
        <div ref={mapRef} className="w-full h-full rounded-lg" />
      </CardContent>
    </Card>
  );
};

export default MapWithWms;
