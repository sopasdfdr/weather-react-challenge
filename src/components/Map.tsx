import React, { useEffect, useRef } from "react";
import L from "leaflet";

type MapProps = {
  lat: number;
  lon: number;
  temperature: number;
  unit: 'C' | 'F';
};

const Map: React.FC<MapProps> = ({ lat, lon, temperature, unit }) => {
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY; //API KEY
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize the map
    mapInstanceRef.current = L.map(mapRef.current, {
      center: [lat, lon],
      zoom: 5,
      layers: [
          L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }),
        L.tileLayer(`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${API_KEY}`, {
          maxZoom: 19,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }),
      ],
    }).setView([lat, lon], 13);

    // Add a marker with a popup
    L.marker([lat, lon])
      .addTo(mapInstanceRef.current)
      .bindPopup(`The temperature is ${unit === 'C'
                ? `${temperature}°C`
                : `${(temperature * 1.8 + 32).toFixed(1)}°F`}`)
      .openPopup();

    return () => {
      mapInstanceRef.current?.remove();
    };
  }, [lat, lon, temperature, API_KEY]);

  return <div ref={mapRef} style={{ width: "100%", height: "100%" }} />;
};

export default Map;
