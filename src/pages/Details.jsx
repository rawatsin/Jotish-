import { useParams, Link } from "react-router-dom"
import useEmployees from "../hooks/useEmployees"
import EmployeeHeader from "../components/EmployeeHeader"
import PersonalInfo from "../components/PersonalInfo"
import EmploymentInfo from "../components/EmploymentInfo"
import EmployeeNotFound from "../components/EmployeeNotFound"

export default function Details() {
  const { id } = useParams()
  const { employees, loading } = useEmployees()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    )
  }

  const employee = employees.find(emp => emp[3] === id)

  if (!employee) return <EmployeeNotFound id={id} />

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-6">
      <div className="max-w-3xl mx-auto">

        <Link to="/" className="text-gray-600 mb-6 block">
          Back
        </Link>

        <div className="bg-white rounded-xl shadow-lg p-8">

          <EmployeeHeader employee={employee} />

          <div className="grid md:grid-cols-2 gap-6">
            <PersonalInfo employee={employee} />
            <EmploymentInfo employee={employee} />
          </div>

        </div>
      </div>
    </div>
  )
}