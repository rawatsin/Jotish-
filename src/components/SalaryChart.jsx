export default function SalaryChart({ employees }) {

  const getSalary = s => parseInt(s.replace(/[$,]/g, "")) || 0;

  const cityData = {};

  employees.forEach(e => {
    const city = e[2];
    const salary = getSalary(e[5]);

    if (!cityData[city]) cityData[city] = { total:0, count:0 };

    cityData[city].total += salary;
    cityData[city].count += 1;
  });

  const cities = Object.keys(cityData).map(city => ({
    city,
    avg: Math.round(cityData[city].total / cityData[city].count),
    count: cityData[city].count
  })).sort((a,b)=>b.avg-a.avg);

  const max = Math.max(...cities.map(c=>c.avg));

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <h2 className="text-xl font-semibold mb-6">Average Salary by City</h2>

      <svg width="800" height="350">
        {cities.map((c,i)=>{
          const h = (c.avg/max)*200
          const x = i*90 + 60
          const y = 250-h

          return (
            <g key={c.city}>
              <rect x={x} y={y} width="40" height={h} fill="#3b82f6" rx="4"/>
              <text x={x+20} y="270" textAnchor="middle">{c.city.slice(0,3)}</text>
              <text x={x+20} y={y-6} textAnchor="middle">${Math.round(c.avg/1000)}k</text>
            </g>
          )
        })}
      </svg>
    </div>
  );
}