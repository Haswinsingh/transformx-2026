import { google } from "googleapis";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import http from "http";
import url from "url";

dotenv.config();

const CLIENT_ID = process.env.GOOGLE_OAUTH_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
const REDIRECT_URI = "http://localhost:5050/oauth2callback";

if (!CLIENT_ID || !CLIENT_SECRET) {
    console.error("Missing GOOGLE_OAUTH_CLIENT_ID or GOOGLE_OAUTH_CLIENT_SECRET in .env");
    process.exit(1);
}

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

const SCOPES = [
    "https://www.googleapis.com/auth/drive"
];

const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
    prompt: "consent"
});

console.log("\nOpen this URL in your browser to authorize Google Drive:\n\n" + authUrl + "\n");
console.log("Waiting for authorization on port 5050...");

const server = http.createServer(async (req, res) => {
    try {
        const parsedUrl = url.parse(req.url, true);
        if (parsedUrl.pathname === "/oauth2callback") {
            const code = parsedUrl.query.code;
            if (!code) {
                res.writeHead(400, { "Content-Type": "text/html" });
                res.end("<h1>Authorization Failed</h1><p>No code returned.</p>");
                return;
            }

            const { tokens } = await oauth2Client.getToken(code);
            
            if (tokens.refresh_token) {
                const envPath = path.resolve(process.cwd(), ".env");
                let envContent = "";
                if (fs.existsSync(envPath)) {
                    envContent = fs.readFileSync(envPath, "utf-8");
                }
                
                if (envContent.includes("GOOGLE_REFRESH_TOKEN=")) {
                    envContent = envContent.replace(/GOOGLE_REFRESH_TOKEN=.*/g, "GOOGLE_REFRESH_TOKEN=" + tokens.refresh_token);
                } else {
                    if (envContent && !envContent.endsWith("\n")) {
                        envContent += "\n";
                    }
                    envContent += "GOOGLE_REFRESH_TOKEN=" + tokens.refresh_token + "\n";
                }
                fs.writeFileSync(envPath, envContent);
                
                console.log("\n--- SUCCESS ---");
                console.log("Refresh token securely stored in .env file.");
                
                res.writeHead(200, { "Content-Type": "text/html" });
                res.end("<h1>Authorization Successful!</h1><p>You can close this tab and return to the terminal.</p>");
                
                setTimeout(() => {
                    server.close();
                    process.exit(0);
                }, 1000);
            } else {
                console.log("\nNo refresh token returned. You may need to revoke access and authorize again.");
                res.writeHead(200, { "Content-Type": "text/html" });
                res.end("<h1>Authorization Failed</h1><p>No refresh token returned. Please revoke app access and try again.</p>");
                
                setTimeout(() => {
                    server.close();
                    process.exit(1);
                }, 1000);
            }
        }
    } catch (err) {
        console.error("Error retrieving access token:", err);
        res.writeHead(500, { "Content-Type": "text/html" });
        res.end("<h1>Internal Server Error</h1><p>Check the terminal logs.</p>");
        setTimeout(() => {
            server.close();
            process.exit(1);
        }, 1000);
    }
});

server.listen(5050, () => {
    // Server running
});
