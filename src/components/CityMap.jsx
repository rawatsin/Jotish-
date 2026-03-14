import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const CITY_COORDINATES = {
  Edinburgh: {
    coords: [55.9533, -3.1883],
    region: "Europe",
    country: "Scotland",
  },
  London: {
    coords: [51.5074, -0.1278],
    region: "Europe",
    country: "United Kingdom",
  },
  Berlin: { coords: [52.52, 13.405], region: "Europe", country: "Germany" },
  Paris: { coords: [48.8566, 2.3522], region: "Europe", country: "France" },

  Tokyo: { coords: [35.6762, 139.6503], region: "Asia", country: "Japan" },
  Singapore: {
    coords: [1.3521, 103.8198],
    region: "Asia",
    country: "Singapore",
  },
  Mumbai: { coords: [19.076, 72.8777], region: "Asia", country: "India" },

  "San Francisco": {
    coords: [37.7749, -122.4194],
    region: "North America",
    country: "USA",
  },
  "New York": {
    coords: [40.7128, -74.006],
    region: "North America",
    country: "USA",
  },

  Sydney: {
    coords: [-33.8688, 151.2093],
    region: "Oceania",
    country: "Australia",
  },

  Default: { coords: [20, 0], region: "Default", country: "World" },
};

export default function CityMap({ employees }) {
  const mapRef = useRef(null);
  const containerRef = useRef(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [mapStats, setMapStats] = useState({});
  const [mapInstance, setMapInstance] = useState(null);

  useEffect(() => {
    const stats = {};
    const getSalary = (s) => parseInt(s.replace(/[$,]/g, "")) || 0;

    employees.forEach((emp) => {
      const city = emp[2];
      if (!stats[city]) {
        stats[city] = { count: 0, totalSalary: 0, employees: [] };
      }
      stats[city].count += 1;
      stats[city].totalSalary += getSalary(emp[5]);
      stats[city].employees.push({
        name: emp[1],
        salary: getSalary(emp[5]),
      });
    });

    Object.keys(stats).forEach((city) => {
      stats[city].avgSalary = Math.round(
        stats[city].totalSalary / stats[city].count,
      );
    });

    setMapStats(stats);
  }, [employees]);

  useEffect(() => {
    if (
      mapRef.current ||
      !containerRef.current ||
      Object.keys(mapStats).length === 0
    )
      return;

    const map = L.map(containerRef.current).setView([20, 0], 2);
    mapRef.current = map;
    setMapInstance(map);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
      maxZoom: 19,
    }).addTo(map);

    const markers = [];
    const cities = Object.keys(mapStats);

    cities.forEach((city) => {
      const cityInfo = CITY_COORDINATES[city] || CITY_COORDINATES.Default;
      const [lat, lng] = cityInfo.coords;
      const stats = mapStats[city];

      const markerSize = Math.max(20, Math.min(50, stats.count * 5));
      const maxAvgSalary = Math.max(
        ...cities.map((c) => mapStats[c].avgSalary),
      );

      const salaryPercentage = stats.avgSalary / maxAvgSalary;
      let circleColor = "#9333ea";
      if (salaryPercentage > 0.8) circleColor = "#10b981";
      else if (salaryPercentage < 0.4) circleColor = "#f97316";

      const marker = L.circleMarker([lat, lng], {
        radius: markerSize,
        fillColor: circleColor,
        color: "#6d28d9",
        weight: 2,
        opacity: 0.8,
        fillOpacity: 0.7,
      }).addTo(map);

      const popupContent = `
        <div style="min-width: 200px; font-family: system-ui, -apple-system, sans-serif;">
          <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: bold; color: #1f2937;">
            📍 ${city}
          </h3>
          <p style="margin: 4px 0; font-size: 12px; color: #6b7280;">
            <strong>Country:</strong> ${cityInfo.country}
          </p>
          <p style="margin: 4px 0; font-size: 12px; color: #6b7280;">
            <strong>Region:</strong> ${cityInfo.region}
          </p>
          <hr style="margin: 8px 0; border: none; border-top: 1px solid #e5e7eb;">
          <p style="margin: 4px 0; font-size: 13px; font-weight: bold; color: #1f2937;">
            👥 Employees: ${stats.count}
          </p>
          <p style="margin: 4px 0; font-size: 13px; font-weight: bold; color: #0ea5e9;">
            💰 Avg Salary: $${(stats.avgSalary / 1000).toFixed(1)}k
          </p>
          <p style="margin: 4px 0; font-size: 12px; color: #6b7280;">
            Total Wage: $${(stats.totalSalary / 1000000).toFixed(2)}M
          </p>
        </div>
      `;

      marker.bindPopup(popupContent, { maxWidth: 250 });

      marker.on("click", () => {
        setSelectedCity(city);
        marker.openPopup();
      });

      markers.push(marker);
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [mapStats]);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-4 md:p-8">
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">
          🌍 Geospatial Employee Distribution
        </h2>
        <p className="text-gray-600 text-sm mt-2">
          Interactive map showing employee locations and salary distribution
          across cities
        </p>
      </div>

      <div className="mb-4 p-3 md:p-4 bg-purple-50 rounded-lg border border-purple-200">
        <p className="font-semibold text-sm text-gray-700 mb-3">
          📊 Map Legend:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-green-500 rounded-full border-2 border-purple-900"></div>
            <span className="text-xs md:text-sm text-gray-600">
              High Salary (&gt;80%)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-purple-500 rounded-full border-2 border-purple-900"></div>
            <span className="text-xs md:text-sm text-gray-600">
              Medium Salary (40-80%)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-orange-500 rounded-full border-2 border-purple-900"></div>
            <span className="text-xs md:text-sm text-gray-600">
              Lower Salary (&lt;40%)
            </span>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-3">
          💡 Circle size = Number of employees | Click markers to see detailed
          statistics
        </p>
      </div>

      <div
        ref={containerRef}
        className="h-64 md:h-96 w-full rounded-lg border border-gray-200 shadow-sm mb-6"
        style={{ backgroundColor: "#f0f0f0" }}
      />

      {selectedCity && mapStats[selectedCity] && (
        <div className="mt-6 p-4 md:p-6 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg border border-purple-200">
          <div className="flex items-start justify-between">
            <div className="w-full">
              <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4">
                📍 {selectedCity} - Detailed Statistics
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-4">
                <div className="bg-white p-3 rounded-lg border border-purple-200">
                  <p className="text-xs md:text-sm text-gray-600">
                    Total Employees
                  </p>
                  <p className="text-lg md:text-2xl font-bold text-purple-600">
                    {mapStats[selectedCity].count}
                  </p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-purple-200">
                  <p className="text-xs md:text-sm text-gray-600">
                    Average Salary
                  </p>
                  <p className="text-lg md:text-2xl font-bold text-purple-600">
                    ${(mapStats[selectedCity].avgSalary / 1000).toFixed(1)}k
                  </p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-purple-200">
                  <p className="text-xs md:text-sm text-gray-600">
                    Total Wages
                  </p>
                  <p className="text-lg md:text-2xl font-bold text-purple-600">
                    ${(mapStats[selectedCity].totalSalary / 1000000).toFixed(2)}
                    M
                  </p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-purple-200">
                  <p className="text-xs md:text-sm text-gray-600">Country</p>
                  <p className="text-lg md:text-2xl font-bold text-purple-600">
                    {
                      (
                        CITY_COORDINATES[selectedCity] ||
                        CITY_COORDINATES.Default
                      ).country
                    }
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <p className="font-semibold text-sm md:text-base text-gray-700 mb-2">
                  Employees in {selectedCity}:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-40 md:max-h-48 overflow-y-auto">
                  {mapStats[selectedCity].employees
                    .slice(0, 10)
                    .map((emp, idx) => (
                      <div
                        key={idx}
                        className="bg-white p-2 rounded border border-purple-200 text-sm"
                      >
                        <p className="font-medium text-gray-700">{emp.name}</p>
                        <p className="text-purple-600">
                          ${(emp.salary / 1000).toFixed(1)}k
                        </p>
                      </div>
                    ))}
                  {mapStats[selectedCity].employees.length > 10 && (
                    <div className="col-span-1 md:col-span-2 text-center text-xs text-gray-500">
                      +{mapStats[selectedCity].employees.length - 10} more
                      employees
                    </div>
                  )}
                </div>
              </div>
            </div>
            <button
              onClick={() => setSelectedCity(null)}
              className="text-gray-500 hover:text-gray-700 font-bold text-xl ml-4 flex-shrink-0"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <div className="mt-6 p-3 md:p-4 bg-purple-100 rounded-lg border border-purple-300">
        <details className="cursor-pointer">
          <summary className="font-semibold text-sm md:text-base text-gray-700">
            🛠️ Technical Details: City-to-Coordinate Mapping
          </summary>
          <div className="mt-3 text-xs md:text-sm text-gray-600 space-y-2">
            <p>
              <strong>Mapping System:</strong> The component uses a hardcoded
              mapping dictionary (CITY_COORDINATES) that converts city names to
              GPS coordinates.
            </p>
            <p>
              <strong>Format:</strong> Each city entry contains: coordinates
              [latitude, longitude], region, and country information.
            </p>
            <p>
              <strong>Data Source:</strong> Coordinates verified via
              OpenStreetMap & Google Maps. Used for Leaflet.js map rendering.
            </p>
            <p>
              <strong>Dynamic Markers:</strong> Circle size = employee count × 5
              (scaling). Color indicates salary percentile (green=high,
              purple=medium, orange=low).
            </p>
            <p>
              <strong>Fallback:</strong> Unknown cities default to [20, 0]
              (world center).
            </p>
            <p className="font-semibold text-purple-600 mt-3">
              To add a new city: Edit CITY_COORDINATES object at the top of
              CityMap.jsx
            </p>
          </div>
        </details>
      </div>
    </div>
  );
}
