import { Link } from "react-router-dom";
import { useRef } from "react";
import useVirtualEmployees from "../hooks/useVirtualEmployees";

export default function EmployeeTable({
  employees,
  loadingMore,
  hasMore,
  loadMore,
  loading,
}) {
  const containerRef = useRef(null);

  const {
    ROW_HEIGHT,
    CONTAINER_HEIGHT,
    startIndex,
    endIndex,
    visibleEmployees,
    handleScroll,
  } = useVirtualEmployees({
    employees,
    loadingMore,
    hasMore,
    loadMore,
    loading,
  });

  const SkeletonRow = () => (
    <tr className="hover:bg-gray-50" style={{ height: `${ROW_HEIGHT}px` }}>
      <td className="px-6 py-4"><div className="h-4 bg-gray-100 rounded w-12"></div></td>
      <td className="px-6 py-4"><div className="h-4 bg-gray-100 rounded w-32"></div></td>
      <td className="px-6 py-4"><div className="h-4 bg-gray-100 rounded w-24"></div></td>
      <td className="px-6 py-4"><div className="h-4 bg-gray-100 rounded w-20"></div></td>
      <td className="px-6 py-4"><div className="h-4 bg-gray-100 rounded w-24"></div></td>
      <td className="px-6 py-4"><div className="h-4 bg-gray-100 rounded w-20"></div></td>
    </tr>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-r-transparent mb-4"></div>
          <p className="text-sm text-gray-400">Loading employees...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="overflow-y-auto"
      style={{ height: `${CONTAINER_HEIGHT}px` }}
      onScroll={handleScroll}
    >
      <table className="w-full table-fixed divide-y divide-gray-200">
        <colgroup>
          <col className="w-[10%]" />
          <col className="w-[22%]" />
          <col className="w-[22%]" />
          <col className="w-[12%]" />
          <col className="w-[12%]" />
          <col className="w-[22%]" />
        </colgroup>
        <thead className="bg-gray-50 sticky top-0 z-10">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Work</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salary</th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          <tr style={{ height: `${startIndex * ROW_HEIGHT}px` }}>
            <td colSpan="6" />
          </tr>

          {visibleEmployees.map((employee, index) => (
            <tr
              key={startIndex + index}
              className="hover:bg-gray-50 transition-colors"
              style={{ height: `${ROW_HEIGHT}px` }}
            >
              <td className="px-6 py-4 text-sm font-mono truncate">
                <Link
                  to={`/details/${employee[3]}`}
                  className="text-blue-600 hover:text-blue-800 hover:underline"
                >
                  {employee[3]}
                </Link>
              </td>
              <td className="px-6 py-4 text-sm text-gray-700 truncate">{employee[0]}</td>
              <td className="px-6 py-4 text-sm text-gray-700 truncate">{employee[1]}</td>
              <td className="px-6 py-4 text-sm text-gray-700 truncate">{employee[2]}</td>
              <td className="px-6 py-4 text-sm text-gray-700 truncate">{employee[4]}</td>
              <td className="px-6 py-4 text-sm font-medium text-emerald-600 truncate">
                ${employee[5]?.toLocaleString()}
              </td>
            </tr>
          ))}

          {loadingMore &&
            Array.from({ length: 5 }).map((_, i) => (
              <SkeletonRow key={i} />
            ))}

          <tr
            style={{
              height: `${Math.max(
                0,
                (employees.length - endIndex) * ROW_HEIGHT
              )}px`,
            }}
          >
            <td colSpan="6" />
          </tr>

          {!hasMore && employees.length > 0 && (
            <tr style={{ height: `${ROW_HEIGHT}px` }}>
              <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-400">
                End of employee list
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}