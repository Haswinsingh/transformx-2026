import express from "express";
import cors from "cors";
import { google } from "googleapis";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import fs from "fs";
import multer from "multer";
import path from "path";
import { generateRegistrationEmail } from "./emailTemplate.js";

dotenv.config();

const app = express();
const frontendUrl = process.env.FRONTEND_URL ? process.env.FRONTEND_URL.replace(/\/+$/, "") : null;
const allowedOrigins = frontendUrl 
  ? [frontendUrl, "http://localhost:5173", "http://localhost:3000"] 
  : "*";

app.use(cors({ 
  origin: allowedOrigins,
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200
}));
app.use(express.json());

// Set up secure file storage for PPT uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "./uploads";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    // Prevent directory traversal attacks and enforce unique names
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `team-${uniqueSuffix}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 25 * 1024 * 1024 }, // 25MB limit
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = [
      "application/vnd.ms-powerpoint",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      "application/pdf"
    ];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only PPT, PPTX, or PDF allowed."));
    }
  },
});

// Validate Environment Variables
if (!process.env.EMAIL_USER) console.error("Missing EMAIL_USER");
if (!process.env.EMAIL_PASS) console.error("Missing EMAIL_PASS");
if (!process.env.SHEET_ID) console.error("Missing SHEET_ID");
if (!process.env.DRIVE_FOLDER_ID) console.error("Missing DRIVE_FOLDER_ID");

console.log("Email user configured:", Boolean(process.env.EMAIL_USER));
console.log("Email password configured:", Boolean(process.env.EMAIL_PASS));

app.get("/", (req, res) => res.send("API running"));

// Global Nodemailer Transporter Configuration (SMTP Port 587)
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify SMTP connection on startup
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ SMTP verification failed:", error.message);
  } else {
    console.log("✅ SMTP server ready");
  }
});

// using credentials.json for Google Service Account (Sheets only)
const sheetsAuth = new google.auth.GoogleAuth({
  keyFile: "credentials.json",
  scopes: [
    "https://www.googleapis.com/auth/spreadsheets"
  ],
});

// OAuth2 Client for Google Drive
const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_OAUTH_CLIENT_ID,
    process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    process.env.GOOGLE_OAUTH_REDIRECT_URI
);

if (!process.env.GOOGLE_REFRESH_TOKEN) {
    console.log("\nGoogle Drive OAuth authorization is required.\n\nRun:\n\nnpm run authorize-drive\n\nor:\n\nnode authorize-drive.js\n");
    process.exit(0);
}

oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN
});

const SHEET_ID = process.env.SHEET_ID;
const DRIVE_FOLDER_ID = process.env.DRIVE_FOLDER_ID;

const globalDrive = google.drive({ version: "v3", auth: oauth2Client });

// Verify Shared Drive destination on startup
async function verifyDriveFolder() {
    try {
        const response = await globalDrive.files.get({
            fileId: process.env.DRIVE_FOLDER_ID,
            fields: "id,name,mimeType,parents",
        });

        console.log("========== GOOGLE DRIVE ==========");
        console.log("Drive OAuth: OK");
        console.log("Folder:", response.data.name);
        console.log("Drive access: OK");
        console.log("==================================");

        return response.data;
    } catch (error) {
        console.error("========== GOOGLE DRIVE DIAGNOSTIC ==========");
        console.error("Folder ID:", process.env.DRIVE_FOLDER_ID);
        console.error("HTTP Status:", error.response?.status);
        console.error("Error:", error.response?.data?.error?.message || error.message);
        console.error("==============================================");

        throw error;
    }
}
verifyDriveFolder();



// Support multipart/form-data for the file upload
async function getExistingRegistrations(sheets, sheetId) {
  const getRows = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: "Sheet1",
  });
  return getRows.data.values || [];
}

// Support multipart/form-data for the file upload
app.post("/register", upload.single("ppt"), async (req, res) => {
  try {
    // Force the correct deadline in case of stale OS environment variables
    const REGISTRATION_DEADLINE = new Date("2026-09-19T23:59:59+05:30");
    const now = new Date();

    console.log("========== REGISTRATION DEADLINE DEBUG ==========");
    console.log("Current UTC:", now.toISOString());
    console.log("Deadline UTC:", REGISTRATION_DEADLINE.toISOString());
    console.log("Registration open:", now <= REGISTRATION_DEADLINE);
    console.log("===============================================");

    if (now > REGISTRATION_DEADLINE) {
      return res.status(403).json({ success: false, error: "Registration deadline exceeded" });
    }

    // Since it's multipart/form-data, req.body fields might be strings.
    // If 'members' is passed, it needs to be parsed from JSON.
    const data = req.body;
    if (data.members && typeof data.members === 'string') {
      try {
        data.members = JSON.parse(data.members);
      } catch(e) {
        console.error("Failed to parse members JSON:", e);
      }
    }

    if (!data || !data.email) {
      return res.status(400).json({ success: false, error: "Invalid registration payload: Missing email" });
    }

    console.log("Receiving registration request for:", data.email);



    // Initialize Google API Clients
    const client = await sheetsAuth.getClient();
    const sheets = google.sheets({ version: "v4", auth: client });
    const drive = google.drive({ version: "v3", auth: oauth2Client });

    let rows = [];
    try {
      rows = await getExistingRegistrations(sheets, SHEET_ID);
    } catch (sheetError) {
      console.error("❌ Error fetching existing registrations:", sheetError.message);
      return res.status(500).json({ success: false, error: "Unable to verify existing registrations" });
    }



    // GENERATE TEAM ID
    let teamId = "TFX-1001";
    let maxId = 1000;
    for (const row of rows) {
      if (row[0] && row[0].startsWith("TFX-")) {
        const num = parseInt(row[0].replace("TFX-", ""), 10);
        if (!isNaN(num) && num > maxId) {
          maxId = num;
        }
      }
    }
    teamId = `TFX-${maxId + 1}`;
    console.log(`✅ Generated Team ID: ${teamId}`);

    // VALIDATE DRIVE FOLDER
    try {
      const folderRes = await drive.files.get({
        fileId: process.env.DRIVE_FOLDER_ID,
        fields: "id,name,mimeType,parents",
      });
      // We no longer require a Shared Drive.
    } catch (err) {
      console.error("Drive verification failed:", err.message);
      if (err.message && (err.message.includes("invalid_grant") || err.message.includes("No access, refresh token") || err.message.includes("invalid request"))) {
        return res.status(500).json({ success: false, error: "Google Drive authentication failed" });
      }
      return res.status(500).json({ success: false, error: "Google Drive submission folder is not accessible" });
    }

    // UPLOAD TO GOOGLE DRIVE
    let driveFileId = "N/A";
    let driveLink = "N/A";
    let finalFileName = req.file ? req.file.originalname : "No File";

    if (req.file) {
      const ext = path.extname(req.file.originalname);
      finalFileName = `${teamId}${ext}`;

      try {
        const driveResponse = await drive.files.create({
          requestBody: {
            name: finalFileName,
            parents: [process.env.DRIVE_FOLDER_ID],
          },
          media: {
            mimeType: req.file.mimetype,
            body: fs.createReadStream(req.file.path),
          },
          fields: "id,name,webViewLink",
        });

        driveFileId = driveResponse.data.id;
        driveLink = driveResponse.data.webViewLink;

        console.log(`✅ Successfully uploaded ${finalFileName} to Google Drive`);
      } catch (driveError) {
        console.error("❌ Google Drive Error:", driveError.message);
        if (driveError.message && (driveError.message.includes("invalid_grant") || driveError.message.includes("No access, refresh token") || driveError.message.includes("invalid request"))) {
          return res.status(500).json({ success: false, error: "Google Drive authentication failed" });
        }
        return res.status(500).json({ success: false, error: "Failed to upload presentation to Google Drive" });
      } finally {
        // Clean up the local file to save space
        if (fs.existsSync(req.file.path)) {
          fs.unlinkSync(req.file.path);
        }
      }
    }

    const driveHyperlink = driveLink !== "N/A" ? `=HYPERLINK("${driveLink}", "OPEN SUBMISSION")` : "N/A";

    // Create an ordered array of values to ensure they match google sheet columns
    const rowValues = [
      teamId,
      data.teamName || "N/A",
      data.leaderName || "N/A",
      data.college || "N/A",
      data.yearDept || "N/A",
      data.studentId || "N/A",
      data.email || "N/A",
      data.phone || "N/A",
      data.teamSize || "1",
      data.problemStatement || "N/A",
      data.projectType || "N/A",
      data.abstract || "N/A",
      finalFileName,
      driveFileId,
      driveHyperlink,
      new Date().toISOString()
    ];

    // Add members sequentially
    if (data.members && Array.isArray(data.members)) {
      data.members.forEach((member) => {
        rowValues.push(member.name || "");
        rowValues.push(member.email || "");
        rowValues.push(member.phone || "");
        rowValues.push(member.yearDept || "");
        rowValues.push(member.studentId || "");
      });
    }

    // Google Sheets Integration
    try {
      await sheets.spreadsheets.values.append({
        spreadsheetId: SHEET_ID,
        range: "Sheet1!A1",
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [rowValues],
        },
      });
      console.log("✅ Data successfully injected into Google Sheets");
    } catch (sheetError) {
      console.error("❌ Google Sheets Error:", sheetError);
      
      // If sheets fail, try to delete the orphaned Drive file
      if (driveFileId !== "N/A") {
        try {
          await drive.files.delete({ 
            fileId: driveFileId
          });
          console.log(`🧹 Cleaned up orphaned Drive file ${driveFileId}`);
        } catch (delErr) {
          console.error("Failed to cleanup Drive file after Sheets error:", delErr.message);
        }
      }
      
      throw new Error(`Google Sheets integration failed: ${sheetError.message}`);
    }


    // Email Service with independent try-catch
    try {

      const emailHtml = generateRegistrationEmail({
        teamId: teamId,
        teamName: data.teamName || "N/A",
        teamLeaderName: data.leaderName || "Commander",
        problemStatementId: data.problemStatement || "N/A",
        problemStatementTitle: data.problemStatementTitle || "N/A",
        projectType: data.projectType || "N/A",
        abstractFileName: data.abstract || "N/A",
        presentationFileName: finalFileName,
        presentationDriveLink: driveLink !== "N/A" ? driveLink : ""
      });

      await transporter.sendMail({
        from: `"TransForMX Hackathon" <${process.env.EMAIL_USER}>`,
        to: data.email,
        subject: `TRANSFORMX 2026 | MISSION INITIALIZED | ${teamId}`,
        html: emailHtml
      });
      console.log("✅ Confirmation email sent to:", data.email);
      return res.json({ success: true, message: "Registration successful", teamId, fileName: finalFileName });
    } catch (emailError) {
      console.error("❌ Email Service Error:", emailError);
      return res.json({ success: true, message: "Registration successful (email failed)", teamId, fileName: finalFileName });
    }
  } catch (error) {
    console.error("FULL ERROR:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;
