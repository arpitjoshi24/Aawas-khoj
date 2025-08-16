import { useState } from "react";
import Map from "../components/Map";

export default function Maps() {
  const [location, setLocation] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!location) {
      alert("⚠️ Please select a location on the map first!");
      return;
    }

    const data = { location };
    await fetch("http://localhost:5000/api/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    alert("✅ Location saved successfully!");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-xl mt-10">
      {/* Header */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-3">
        📍 Choose Your Location
      </h2>

      {/* Map */}
      <div className="rounded-xl overflow-hidden border border-gray-200 shadow-md">
        <Map setLocation={setLocation} />
      </div>

      {/* Selected coords */}
      <div className="mt-4">
        {location ? (
          <p className="text-sm bg-green-100 border border-green-300 px-4 py-2 rounded-lg text-green-800 shadow-sm">
            ✅ Selected Location:{" "}
            <span className="font-semibold">
              {location.lat.toFixed(5)}, {location.lng.toFixed(5)}
            </span>
          </p>
        ) : (
          <p className="text-sm text-gray-500 italic">
            Click anywhere on the map to select a location
          </p>
        )}
      </div>

      {/* Submit button */}
      <button
        onClick={handleSubmit}
        className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold shadow-lg transition"
      >
        💾 Save Location
      </button>
    </div>
  );
}
