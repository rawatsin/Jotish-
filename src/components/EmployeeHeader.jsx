export default function EmployeeHeader({ employee }) {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 md:mb-8 gap-4">
      <div className="flex items-center gap-3 md:gap-4">
        <div className="w-12 md:w-16 h-12 md:h-16 bg-purple-500 rounded-full flex items-center justify-center text-white text-xl md:text-2xl font-bold flex-shrink-0">
          {employee[0].charAt(0)}
        </div>

        <div className="min-w-0">
          <h2 className="text-lg md:text-2xl font-bold text-gray-800 truncate">
            {employee[0]}
          </h2>
          <p className="text-sm md:text-base text-gray-600 truncate">
            {employee[1]}
          </p>
        </div>
      </div>

      <div className="bg-green-100 px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm whitespace-nowrap">
        ID: {employee[3]}
      </div>
    </div>
  );
}
