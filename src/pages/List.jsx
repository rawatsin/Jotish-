import useEmployees from "../hooks/useEmployees";
import EmployeeTable from "../components/EmployeeTable";

export default function List() {
  const { employees, loading, loadingMore, hasMore, loadMore } = useEmployees();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-light text-gray-900 tracking-tight">
              Employee Directory
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              Manage and view employee information
            </p>
          </div>
        </div>
      </div>

     
      <div className="flex-1 max-w-7xl w-full mx-auto px-6 py-8">
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium text-gray-700">All Employees</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                {employees.length} total
              </span>
            </div>
            {hasMore && (
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <span>↓</span> Scroll to load more
              </span>
            )}
          </div>

          <EmployeeTable 
            employees={employees} 
            loading={loading}
            loadingMore={loadingMore}
            hasMore={hasMore}
            loadMore={loadMore}
          />
        </div>
      </div>
    </div>
  );
}