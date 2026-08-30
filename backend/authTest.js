const { google } = require("googleapis");
const fs = require("fs");

async function testAuth() {
  console.log("Starting Google Auth Test...");
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: "credentials.json",
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    console.log("Requesting access token...");
    const client = await auth.getClient();
    const token = await client.getAccessToken();
    
    if (token.token) {
      console.log("✅ Google authentication successful. Access token acquired.");
    } else {
      console.log("⚠️ Token request completed but no token returned.");
    }
  } catch (error) {
    console.error("❌ Authentication Failed!");
    console.error("Error Name:", error.name);
    console.error("Error Message:", error.message);
    
    if (error.message.includes("Invalid JWT Signature")) {
      console.log("\nDIAGNOSIS: The private key in credentials.json does not match the active keys for this service account in Google Cloud.");
      console.log("CAUSE: The key has been deleted/revoked in GCP, or the file was accidentally modified.");
      console.log("SOLUTION: Generate a new service-account JSON key from Google Cloud Console and replace credentials.json.");
    }
  }
}

testAuth();
