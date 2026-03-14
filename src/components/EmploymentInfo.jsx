export default function EmploymentInfo({ employee }) {
  return (
    <div className="bg-gray-50 p-4 md:p-6 rounded-xl">
      <h3 className="text-xs md:text-sm font-semibold text-gray-500 mb-4">
        Employment Details
      </h3>

      <div className="space-y-3">
        <div>
          <p className="text-xs text-gray-500">Position</p>
          <p className="text-base md:text-lg font-medium text-gray-800">
            {employee[1]}
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-500">Salary</p>
          <p className="text-xl md:text-2xl font-bold text-green-600">
            {employee[5]}
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-500">Employee ID</p>
          <p className="text-base md:text-lg font-mono text-gray-800">
            {employee[3]}
          </p>
        </div>
      </div>
    </div>
  );
}
