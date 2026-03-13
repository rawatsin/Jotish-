import useEmployees from "../hooks/useEmployees";
import EmployeeTable from "../components/EmployeeTable";

export default function List() {
  const { employees, loading, loadingMore, hasMore, loadMore } = useEmployees();

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-6">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="px-6 py-6 bg-blue-600 text-white">
          <h1 className="text-2xl font-bold">Employee Directory</h1>
        </div>

        <EmployeeTable 
          employees={employees} 
          loading={loading}
          loadingMore={loadingMore}
          hasMore={hasMore}
          loadMore={loadMore}
        />

        <div className="px-6 py-4 bg-gray-50">
          Total employees loaded: {employees.length}
          {hasMore && <span className="ml-2 text-sm text-gray-500">(Scroll to load more)</span>}
        </div>
      </div>
    </div>
  );
}