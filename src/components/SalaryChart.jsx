import { useState } from "react";

export default function SalaryChart({ employees }) {
  const [chartType, setChartType] = useState("bars");
  const [hoveredCity, setHoveredCity] = useState(null);

  const getSalary = (s) => parseInt(s.replace(/[$,]/g, "")) || 0;

  const cityData = {};

  employees.forEach((e) => {
    const city = e[2];
    const salary = getSalary(e[5]);

    if (!cityData[city])
      cityData[city] = { total: 0, count: 0, min: Infinity, max: -Infinity };

    cityData[city].total += salary;
    cityData[city].count += 1;
    cityData[city].min = Math.min(cityData[city].min, salary);
    cityData[city].max = Math.max(cityData[city].max, salary);
  });

  const cities = Object.keys(cityData)
    .map((city) => ({
      city,
      avg: Math.round(cityData[city].total / cityData[city].count),
      count: cityData[city].count,
      min: cityData[city].min,
      max: cityData[city].max,
      total: cityData[city].total,
    }))
    .sort((a, b) => b.avg - a.avg);

  const max = Math.max(...cities.map((c) => c.avg));
  const min = Math.min(...cities.map((c) => c.avg));
  const range = max - min || 1;

  const SVG_WIDTH = 1000;
  const SVG_HEIGHT = 450;
  const PADDING = 60;
  const CHART_WIDTH = SVG_WIDTH - PADDING * 2;
  const CHART_HEIGHT = SVG_HEIGHT - PADDING * 2;

  const renderBarChart = () => {
    const barWidth = CHART_WIDTH / cities.length;
    const barSpacing = barWidth * 0.15;
    const actualBarWidth = barWidth - barSpacing;

    return (
      <>
        {[0, 25, 50, 75, 100].map((percent) => {
          const salary = min + (range * percent) / 100;
          const y = PADDING + CHART_HEIGHT - (CHART_HEIGHT * percent) / 100;
          return (
            <g key={`grid-${percent}`}>
              <line
                x1={PADDING}
                y1={y}
                x2={SVG_WIDTH - PADDING}
                y2={y}
                stroke="#e5e7eb"
                strokeWidth="1"
              />
              <text
                x={PADDING - 10}
                y={y + 4}
                textAnchor="end"
                fontSize="12"
                fill="#666"
              >
                ${Math.round(salary / 1000)}k
              </text>
            </g>
          );
        })}

        <line
          x1={PADDING}
          y1={PADDING + CHART_HEIGHT}
          x2={SVG_WIDTH - PADDING}
          y2={PADDING + CHART_HEIGHT}
          stroke="#374151"
          strokeWidth="2"
        />

        <line
          x1={PADDING}
          y1={PADDING}
          x2={PADDING}
          y2={PADDING + CHART_HEIGHT}
          stroke="#374151"
          strokeWidth="2"
        />

        {cities.map((c, i) => {
          const barHeight = (CHART_HEIGHT * (c.avg - min)) / range;
          const x = PADDING + i * barWidth + barSpacing / 2;
          const y = PADDING + CHART_HEIGHT - barHeight;
          const isHovered = hoveredCity === c.city;

          return (
            <g
              key={c.city}
              onMouseEnter={() => setHoveredCity(c.city)}
              onMouseLeave={() => setHoveredCity(null)}
              className="cursor-pointer"
            >
              <rect
                x={x}
                y={y}
                width={actualBarWidth}
                height={barHeight}
                fill={isHovered ? "#6d28d9" : "#9333ea"}
                rx="4"
                className="transition-all duration-200"
              />

              <text
                x={x + actualBarWidth / 2}
                y={PADDING + CHART_HEIGHT + 25}
                textAnchor="middle"
                fontSize="13"
                fontWeight="500"
                fill="#1f2937"
              >
                {c.city}
              </text>

              {isHovered && (
                <text
                  x={x + actualBarWidth / 2}
                  y={y - 10}
                  textAnchor="middle"
                  fontSize="14"
                  fontWeight="bold"
                  fill="#6d28d9"
                >
                  ${Math.round(c.avg / 1000)}k
                </text>
              )}

              <text
                x={x + actualBarWidth / 2}
                y={PADDING + CHART_HEIGHT + 42}
                textAnchor="middle"
                fontSize="11"
                fill="#6b7280"
              >
                n={c.count}
              </text>
            </g>
          );
        })}
      </>
    );
  };

  const renderCircleChart = () => {
    const rows = 2;
    const cols = Math.ceil(cities.length / rows);
    const circleSpacing = CHART_WIDTH / (cols + 1);
    const rowSpacing = CHART_HEIGHT / (rows + 1);

    return (
      <>
        {cities.map((c, i) => {
          const row = i % rows;
          const col = Math.floor(i / rows);
          const cx = PADDING + circleSpacing * (col + 1);
          const cy = PADDING + rowSpacing * (row + 1);

          const minRadius = 20;
          const maxRadius = 60;
          const radius =
            minRadius + ((c.avg - min) / range) * (maxRadius - minRadius);

          const isHovered = hoveredCity === c.city;

          return (
            <g
              key={c.city}
              onMouseEnter={() => setHoveredCity(c.city)}
              onMouseLeave={() => setHoveredCity(null)}
              className="cursor-pointer"
            >
              <circle
                cx={cx}
                cy={cy}
                r={radius}
                fill={isHovered ? "#6d28d9" : "#9333ea"}
                fillOpacity={isHovered ? 0.9 : 0.7}
                stroke="#6d28d9"
                strokeWidth="2"
                className="transition-all duration-200"
              />

              <text
                x={cx}
                y={cy - 10}
                textAnchor="middle"
                fontSize="13"
                fontWeight="bold"
                fill="white"
                pointerEvents="none"
              >
                {c.city}
              </text>

              <text
                x={cx}
                y={cy + 8}
                textAnchor="middle"
                fontSize="14"
                fontWeight="bold"
                fill="white"
                pointerEvents="none"
              >
                ${Math.round(c.avg / 1000)}k
              </text>

              <text
                x={cx}
                y={cy + 24}
                textAnchor="middle"
                fontSize="12"
                fill="white"
                pointerEvents="none"
              >
                ({c.count} emp)
              </text>

              {isHovered && (
                <g>
                  <rect
                    x={cx - 70}
                    y={cy - radius - 60}
                    width="140"
                    height="54"
                    fill="#1f2937"
                    rx="4"
                  />
                  <text
                    x={cx}
                    y={cy - radius - 40}
                    textAnchor="middle"
                    fontSize="12"
                    fill="white"
                    fontWeight="bold"
                  >
                    {c.city}
                  </text>
                  <text
                    x={cx}
                    y={cy - radius - 25}
                    textAnchor="middle"
                    fontSize="11"
                    fill="#e5e7eb"
                  >
                    Avg: ${Math.round(c.avg / 1000)}k
                  </text>
                  <text
                    x={cx}
                    y={cy - radius - 12}
                    textAnchor="middle"
                    fontSize="11"
                    fill="#e5e7eb"
                  >
                    Range: ${c.min / 1000}k - ${c.max / 1000}k
                  </text>
                </g>
              )}
            </g>
          );
        })}
      </>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-4 md:p-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">
            Salary Distribution by City
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            Average salary visualization across {cities.length} cities
          </p>
        </div>

        <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setChartType("bars")}
            className={`px-3 md:px-4 py-2 rounded transition font-medium text-sm md:text-base ${
              chartType === "bars"
                ? "bg-purple-600 text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`}
          >
            📊 Bars
          </button>
          <button
            onClick={() => setChartType("circles")}
            className={`px-3 md:px-4 py-2 rounded transition font-medium text-sm md:text-base ${
              chartType === "circles"
                ? "bg-purple-600 text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`}
          >
            ◯ Circles
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
        <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
          <p className="text-xs md:text-sm text-gray-600">Highest</p>
          <p className="text-lg md:text-xl font-bold text-purple-600">
            ${Math.round(max / 1000)}k
          </p>
          <p className="text-xs text-gray-600">{cities[0].city}</p>
        </div>
        <div className="bg-green-50 p-3 rounded-lg border border-green-200">
          <p className="text-xs md:text-sm text-gray-600">Lowest</p>
          <p className="text-lg md:text-xl font-bold text-green-600">
            ${Math.round(min / 1000)}k
          </p>
          <p className="text-xs text-gray-600">
            {cities[cities.length - 1].city}
          </p>
        </div>
        <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
          <p className="text-xs md:text-sm text-gray-600">Overall Avg</p>
          <p className="text-lg md:text-xl font-bold text-purple-600">
            $
            {Math.round(
              cities.reduce((a, c) => a + c.avg, 0) / cities.length / 1000,
            )}
            k
          </p>
          <p className="text-xs text-gray-600">All cities</p>
        </div>
        <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
          <p className="text-xs md:text-sm text-gray-600">Total Wage</p>
          <p className="text-lg md:text-xl font-bold text-orange-600">
            ${Math.round(cities.reduce((a, c) => a + c.total, 0) / 1000000)}M
          </p>
          <p className="text-xs text-gray-600">
            {cities.reduce((a, c) => a + c.count, 0)} employees
          </p>
        </div>
      </div>

      <div className="overflow-x-auto -mx-4 md:-mx-8 px-4 md:px-8">
        <svg width={SVG_WIDTH} height={SVG_HEIGHT} style={{ minWidth: "100%" }}>
          <text
            x={SVG_WIDTH / 2}
            y={30}
            textAnchor="middle"
            fontSize="14"
            md:fontSize="16"
            fontWeight="bold"
            fill="#1f2937"
          >
            {chartType === "bars"
              ? "Average Salary per City (Bar Chart)"
              : "Salary Distribution by City (Bubble Chart)"}
          </text>

          {chartType === "bars" ? renderBarChart() : renderCircleChart()}
        </svg>
      </div>

      <div className="mt-6 p-3 md:p-4 bg-purple-50 rounded-lg border border-purple-200">
        <p className="text-xs md:text-sm text-gray-700">
          <span className="font-semibold">💡 Chart Info:</span>
          {chartType === "bars"
            ? " Bar height represents average salary. Hover over bars to see exact values."
            : " Circle size represents salary level. Larger circles = higher average salary."}
        </p>
        <p className="text-xs text-gray-600 mt-2">
          n = number of employees in city | Range = min-max salary in that city
        </p>
      </div>
    </div>
  );
}
