export default function EmployeeHeader({ employee }) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center">
        <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
          {employee[0].charAt(0)}
        </div>

        <div className="ml-4">
          <h2 className="text-2xl font-bold text-gray-800">{employee[0]}</h2>
          <p className="text-gray-600">{employee[1]}</p>
        </div>
      </div>

      <div className="bg-green-100 px-4 py-2 rounded-lg">
        ID: {employee[3]}
      </div>
    </div>
  );
}