import BottomNavbar from "../components/BottomNav";

export default function About() {
  return (
    <div className="min-h-screen bg-[#F5F7FA] pb-24">

      {/* Header */}

      <div className="bg-white rounded-b-3xl shadow-sm px-5 py-6 text-center">

        <div className="text-6xl">
          🌴
        </div>

        <h1 className="text-3xl font-bold text-green-700 mt-3">
          LankaGo
        </h1>

        <p className="text-gray-500 mt-2">
          Explore the beauty of Sri Lanka
        </p>

        <p className="text-sm text-gray-400 mt-2">
          Version 1.0
        </p>

      </div>

      {/* Cards */}

      <div className="p-5 space-y-4">

        <div className="bg-white rounded-2xl shadow p-4">

          <h2 className="font-bold text-lg">
            ℹ️ About Project
          </h2>

          <p className="text-gray-500 mt-2">
            LankaGo is a mobile travel guide
            designed to help users discover
            beautiful tourist destinations
            across Sri Lanka.
          </p>

        </div>

        <div className="bg-white rounded-2xl shadow p-4">

          <h2 className="font-bold text-lg">
            📧 Contact
          </h2>

          <p className="text-gray-500 mt-2">
            support@lankago.com
          </p>

        </div>

        <div className="bg-white rounded-2xl shadow p-4">

          <h2 className="font-bold text-lg">
            ⭐ Rate App
          </h2>

          <p className="text-gray-500 mt-2">
            Thank you for using LankaGo!
          </p>

        </div>

        <div className="bg-white rounded-2xl shadow p-4">

          <h2 className="font-bold text-lg">
            🔒 Privacy Policy
          </h2>

          <p className="text-gray-500 mt-2">
            Your preferences and favorites
            are stored locally on your device.
          </p>

        </div>

      </div>

      <BottomNavbar />

    </div>
  );
}