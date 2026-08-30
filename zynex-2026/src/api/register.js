const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const submitRegistration = async (data) => {
  console.log("🚀 Initializing backend uplink...");
  console.log(`[Target Vector]: ${API_URL}/register`);

  try {
    let body;
    let headers = {};

    // If data is a FormData instance (meaning it contains files), don't set Content-Type header
    // fetch will automatically set it to multipart/form-data with the correct boundary
    if (data instanceof FormData) {
      body = data;
    } else {
      headers["Content-Type"] = "application/json";
      body = JSON.stringify(data);
    }

    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers,
      body,
    });

    // 🔥 Check if response is valid JSON
    let result;
    try {
      result = await response.json();
    } catch {
      throw new Error("Invalid JSON response from server");
    }

    // 🔥 Handle server errors properly
    if (!response.ok) {
      console.error("❌ Server Error:", result);
      throw new Error(result?.error || "Server responded with an error");
    }

    console.log("✅ Success:", result);
    return result;

  } catch (error) {
    console.error("❌ Network/Fetch Error:", error);

    // 🔥 Better error message
    if (error.message.includes("Failed to fetch")) {
      throw new Error(
        "Server unreachable ⚠️ (Render may be sleeping or CORS issue)"
      );
    }

    throw error;
  }
};