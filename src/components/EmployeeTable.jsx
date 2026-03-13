import { Link } from "react-router-dom";

export default function EmployeeTable({ employees }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">ID</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Name</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Work</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">City</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Salary</th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {employees.map((employee, index) => (
            <tr key={index} className="hover:bg-gray-50 cursor-pointer group">
              <td className="px-6 py-4 text-sm font-medium text-gray-900">
                <Link to={`/details/${employee[3]}`} className="text-blue-600">
                  {employee[3]}
                </Link>
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">{employee[0]}</td>
              <td className="px-6 py-4 text-sm text-gray-700">{employee[1]}</td>
              <td className="px-6 py-4 text-sm text-gray-700">{employee[2]}</td>
              <td className="px-6 py-4 text-sm text-gray-700">{employee[4]}</td>
              <td className="px-6 py-4 text-sm font-medium text-green-600">{employee[5]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}