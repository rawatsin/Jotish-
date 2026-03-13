export default function VerifiedCard({ verifiedData }) {
  if (!verifiedData || !verifiedData.mergedImage) return null;

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <h2 className="text-xl font-semibold mb-4">Verification Record</h2>

      <div className="flex items-start space-x-6">
        <img
          src={verifiedData.mergedImage}
          alt="verified"
          className="w-64 rounded-lg border"
        />

        <div>
          <p><b>Employee:</b> {verifiedData.name}</p>
          <p><b>ID:</b> {verifiedData.id}</p>
          <p><b>Verified:</b> {new Date(verifiedData.timestamp).toLocaleString()}</p>

          <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full inline-block text-sm mt-2">
            ✓ Identity Verified
          </div>
        </div>
      </div>
    </div>
  );
}