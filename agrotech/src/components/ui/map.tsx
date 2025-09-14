import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface MapProps {
  lat: number;
  lng: number;
  zoom?: number;
  title?: string;
}

const Map: React.FC<MapProps> = ({ lat, lng, zoom = 15, title = "Location" }) => {
  const mapSrc = `https://www.google.com/maps?q=${lat},${lng}&z=${zoom}&t=${"h"}&output=embed`;

  return (
    <Card className="w-full h-[400px]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0 h-full">
        <iframe
          src={mapSrc}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="rounded-lg"
        ></iframe>
      </CardContent>
    </Card>
  );
};

export default Map;
