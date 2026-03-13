import useEmployees from "../hooks/useEmployees";
import EmployeeTable from "../components/EmployeeTable";

export default function List() {
  const { employees, loading } = useEmployees();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading employees...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-6">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="px-6 py-6 bg-blue-600 text-white">
          <h1 className="text-2xl font-bold">Employee Directory</h1>
        </div>

        <EmployeeTable employees={employees} />

        <div className="px-6 py-4 bg-gray-50">
          Total employees: {employees.length}
        </div>
      </div>
    </div>
  );
}