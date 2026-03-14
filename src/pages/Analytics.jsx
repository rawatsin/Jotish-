import { useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import useEmployees from "../hooks/useEmployees"
import { useAuth } from "../context/AuthContext"
import VerifiedCard from "../components/VerifiedCard"
import SalaryChart from "../components/SalaryChart"
import CityMap from "../components/CityMap"

export default function Analytics() {

  const { employees, loading } = useEmployees()
  const { auditImage } = useAuth()
  const location = useLocation()
  const [verifiedData, setVerifiedData] = useState(null)

  useEffect(() => {
    const stored = localStorage.getItem("verifiedEmployee")

    if (stored) {
      setVerifiedData(JSON.parse(stored))
    } else if (location.state) {
      setVerifiedData(location.state)
    }
  }, [location.state])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading analytics...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-6 space-y-8 max-w-7xl mx-auto">

      <div className="bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold">
          Employee Analytics
        </h1>
      </div>

      <VerifiedCard verifiedData={verifiedData} />
      {auditImage && (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">📋 Audit Image</h2>
          <p className="text-gray-600 mb-6">
            This is the merged audit image containing the captured photo with the employee's signature overlay.
          </p>
          <div className="flex justify-center">
            <img
              src={auditImage}
              alt="Audit Image with Signature"
              className="max-w-2xl w-full rounded-lg shadow-md border-2 border-gray-200"
            />
          </div>
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800">
              ✓ This image serves as an official audit record combining the employee's photo capture and digital signature for verification purposes.
            </p>
          </div>
        </div>
      )}

      <SalaryChart employees={employees} />

      <CityMap employees={employees} />

    </div>
  )
}