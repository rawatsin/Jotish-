import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

export default function EmployeeTable({
  employees,
  loadingMore,
  hasMore,
  loadMore,
  loading,
}) {
  const containerRef = useRef(null);
  const [scrollTop, setScrollTop] = useState(0);

  const ROW_HEIGHT = 57;
  const BUFFER_SIZE = 5;
  const CONTAINER_HEIGHT = 600;
  const SCROLL_THRESHOLD = 300;

  const totalRows = employees.length + (loadingMore ? 5 : 0); // tthis is for skeletons
  const TOTAL_HEIGHT = totalRows * ROW_HEIGHT;

  // To Visible Range Alter
  const visibleRows = Math.ceil(CONTAINER_HEIGHT / ROW_HEIGHT);
  const startIndex = Math.max(
    0,
    Math.floor(scrollTop / ROW_HEIGHT) - BUFFER_SIZE,
  );
  const endIndex = Math.min(
    employees.length,
    startIndex + visibleRows + BUFFER_SIZE * 2,
  );

  const visibleEmployees = employees.slice(startIndex, endIndex);

  // this will detect scroll and load more
  const handleScroll = (e) => {
    const scrollPosition = e.currentTarget.scrollTop;
    const scrollHeight = e.currentTarget.scrollHeight;
    const clientHeight = e.currentTarget.clientHeight;
    const distanceFromBottom = scrollHeight - (scrollPosition + clientHeight);

    setScrollTop(scrollPosition);

    if (
      distanceFromBottom < SCROLL_THRESHOLD &&
      hasMore &&
      !loadingMore &&
      !loading
    ) {
      loadMore();
    }
  };

  // Loading skeleton row
  const SkeletonRow = () => (
    <tr className="hover:bg-gray-50" style={{ height: `${ROW_HEIGHT}px` }}>
      <td className="px-6 py-4">
        <div className="h-4 bg-gray-300 rounded animate-pulse w-12"></div>
      </td>
      <td className="px-6 py-4">
        <div className="h-4 bg-gray-300 rounded animate-pulse w-32"></div>
      </td>
      <td className="px-6 py-4">
        <div className="h-4 bg-gray-300 rounded animate-pulse w-24"></div>
      </td>
      <td className="px-6 py-4">
        <div className="h-4 bg-gray-300 rounded animate-pulse w-20"></div>
      </td>
      <td className="px-6 py-4">
        <div className="h-4 bg-gray-300 rounded animate-pulse w-24"></div>
      </td>
      <td className="px-6 py-4">
        <div className="h-4 bg-gray-300 rounded animate-pulse w-20"></div>
      </td>
    </tr>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading employees...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="overflow-x-auto overflow-y-auto border border-gray-200 rounded-lg"
      style={{ height: `${CONTAINER_HEIGHT}px` }}
      onScroll={handleScroll}
    >
      <table
        className="min-w-full divide-y divide-gray-200"
        style={{ height: `${TOTAL_HEIGHT}px` }}
      >
        <thead className="bg-gray-50 sticky top-0 z-10">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
              ID
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
              Name
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
              Work
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
              City
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
              Date
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
              Salary
            </th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {/* visible range */}
          <tr style={{ height: `${startIndex * ROW_HEIGHT}px` }}>
            <td colSpan="6" />
          </tr>

          {/* Below are Visible rows */}
          {visibleEmployees.map((employee, index) => (
            <tr
              key={startIndex + index}
              className="hover:bg-gray-50 cursor-pointer group"
              style={{ height: `${ROW_HEIGHT}px` }}
            >
              <td className="px-6 py-4 text-sm font-medium text-gray-900">
                <Link to={`/details/${employee[3]}`} className="text-blue-600">
                  {employee[3]}
                </Link>
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">{employee[0]}</td>
              <td className="px-6 py-4 text-sm text-gray-700">{employee[1]}</td>
              <td className="px-6 py-4 text-sm text-gray-700">{employee[2]}</td>
              <td className="px-6 py-4 text-sm text-gray-700">{employee[4]}</td>
              <td className="px-6 py-4 text-sm font-medium text-green-600">
                {employee[5]}
              </td>
            </tr>
          ))}

          {loadingMore &&
            Array.from({ length: 5 }).map((_, index) => (
              <SkeletonRow key={`skeleton-${index}`} />
            ))}

          <tr
            style={{
              height: `${Math.max(0, (employees.length - endIndex) * ROW_HEIGHT)}px`,
            }}
          >
            <td colSpan="6" />
          </tr>

          {!hasMore && employees.length > 0 && (
            <tr style={{ height: `${ROW_HEIGHT}px` }}>
              <td
                colSpan="6"
                className="px-6 py-4 text-center text-gray-500 text-sm"
              >
                No more employees to load
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
