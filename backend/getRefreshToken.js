import { google } from "googleapis";
import readline from "readline";
import dotenv from "dotenv";

dotenv.config();

const CLIENT_ID = process.env.GOOGLE_OAUTH_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
const REDIRECT_URI = process.env.GOOGLE_OAUTH_REDIRECT_URI || "http://localhost:5000/oauth2callback"; // Or urn:ietf:wg:oauth:2.0:oob if using manual copy-paste

if (!CLIENT_ID || !CLIENT_SECRET) {
    console.error("Missing GOOGLE_OAUTH_CLIENT_ID or GOOGLE_OAUTH_CLIENT_SECRET in .env");
    process.exit(1);
}

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

const SCOPES = ["https://www.googleapis.com/auth/drive"];

const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
    prompt: "consent" // Ensure we always get a refresh token
});

console.log("Authorize this app by visiting this url:");
console.log(authUrl);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question("Enter the code from that page here: ", async (code) => {
    rl.close();
    try {
        const { tokens } = await oauth2Client.getToken(code);
        console.log("\n--- SUCCESS ---");
        console.log("Your tokens:");
        console.log(tokens);
        console.log("\nAdd this to your .env file:");
        console.log(`GOOGLE_REFRESH_TOKEN=${tokens.refresh_token}`);
        
        if (!tokens.refresh_token) {
            console.log("\nNOTE: No refresh token returned. This can happen if you already authorized the app. Go to your Google Account permissions, revoke access for this app, and try again.");
        }
    } catch (err) {
        console.error("Error retrieving access token", err);
    }
});
