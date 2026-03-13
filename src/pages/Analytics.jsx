import { useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import useEmployees from "../hooks/useEmployees"
import VerifiedCard from "../components/VerifiedCard"
import SalaryChart from "../components/SalaryChart"
import CityMap from "../components/CityMap"

export default function Analytics() {

  const { employees, loading } = useEmployees()
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

      <SalaryChart employees={employees} />

      <CityMap employees={employees} />

    </div>
  )
}