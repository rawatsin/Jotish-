import { useParams, Link } from "react-router-dom"
import { useState } from "react"
import useEmployees from "../hooks/useEmployees"
import { useAuth } from "../context/AuthContext"
import EmployeeHeader from "../components/EmployeeHeader"
import PersonalInfo from "../components/PersonalInfo"
import EmploymentInfo from "../components/EmploymentInfo"
import EmployeeNotFound from "../components/EmployeeNotFound"
import ImageCaptureDialog from "../components/ImageCaptureDialog"

export default function Details() {
  const { id } = useParams()
  const { employees, loading } = useEmployees()
  const { saveAuditImage, auditImage } = useAuth()
  const [showCaptureDialog, setShowCaptureDialog] = useState(false)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    )
  }

  const employee = employees.find(emp => emp[3] === id)

  if (!employee) return <EmployeeNotFound id={id} />

  const handleImageCapture = (mergedImageData) => {
    saveAuditImage(mergedImageData)
    setShowCaptureDialog(false)
  }

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

          <div className="mt-8 border-t pt-8">
            <div className="flex flex-col items-center gap-4">
              {auditImage ? (
                <div className="w-full">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">Audit Image (Photo + Signature)</h3>
                  <img 
                    src={auditImage} 
                    alt="Audit" 
                    className="w-full max-w-md mx-auto rounded-lg shadow-md"
                  />
                  <button
                    onClick={() => setShowCaptureDialog(true)}
                    className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition"
                  >
                    📸 Recapture Image
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowCaptureDialog(true)}
                  className="w-full max-w-md bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-6 rounded-lg transition flex items-center justify-center gap-2"
                >
                  📸 Capture Audit Image
                </button>
              )}
            </div>
          </div>

        </div>
      </div>


      <ImageCaptureDialog 
        isOpen={showCaptureDialog}
        onClose={() => setShowCaptureDialog(false)}
        onImageCapture={handleImageCapture}
      />
    </div>
  )
}