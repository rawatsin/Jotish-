export default function PersonalInfo({ employee }) {
  return (
    <div className="bg-gray-50 p-4 md:p-6 rounded-xl">
      <h3 className="text-xs md:text-sm font-semibold text-gray-500 mb-4">
        Personal Information
      </h3>

      <div className="space-y-3">
        <div>
          <p className="text-xs text-gray-500">Full Name</p>
          <p className="text-base md:text-lg font-medium text-gray-800">
            {employee[0]}
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-500">Date of Birth</p>
          <p className="text-base md:text-lg font-medium text-gray-800">
            {employee[4]}
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-500">Location</p>
          <p className="text-base md:text-lg font-medium text-gray-800">
            {employee[2]}
          </p>
        </div>
      </div>
    </div>
  );
}
