import { Link } from "react-router-dom";

export default function EmployeeNotFound({ id }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow text-center">
        <h2 className="text-2xl font-bold mb-2">Employee Not Found</h2>
        <p className="mb-6">Employee with ID {id} does not exist</p>

        <Link to="/" className="px-4 py-2 bg-blue-600 text-white rounded">
          Back
        </Link>
      </div>
    </div>
  );
}