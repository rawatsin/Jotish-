import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function CityMap({ employees }) {

  const mapRef = useRef(null);
  const containerRef = useRef(null);

  const cityCoords = {
    Edinburgh:[55.9533,-3.1883],
    Tokyo:[35.6762,139.6503],
    "San Francisco":[37.7749,-122.4194],
    London:[51.5074,-0.1278],
    "New York":[40.7128,-74.006],
    Sydney:[-33.8688,151.2093],
    Berlin:[52.52,13.405],
    Paris:[48.8566,2.3522],
    Singapore:[1.3521,103.8198],
    Mumbai:[19.076,72.8777],
    Default:[20,0]
  };

  useEffect(()=>{

    if(mapRef.current) return;

    mapRef.current = L.map(containerRef.current).setView([20,0],2);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png")
      .addTo(mapRef.current);

    employees.forEach(e=>{
      const city=e[2];
      const coords=cityCoords[city]||cityCoords.Default;

      L.circleMarker(coords,{
        radius:8,
        fillColor:"#3b82f6",
        color:"#1e3a8a",
        fillOpacity:0.7
      })
      .addTo(mapRef.current)
      .bindPopup(`<b>${city}</b><br>${e[1]}`);
    });

    return ()=>{
      mapRef.current.remove();
      mapRef.current=null;
    }

  },[employees]);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <h2 className="text-xl font-semibold mb-4">Employee Locations</h2>
      <div ref={containerRef} className="h-96 w-full rounded-lg"></div>
    </div>
  );
}