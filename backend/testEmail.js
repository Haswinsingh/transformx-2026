import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { generateRegistrationEmail } from "./emailTemplate.js";
import fs from "fs";
import path from "path";

dotenv.config();

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

async function runTest() {
  console.log("Generating test email HTML...");
  
  const testData = {
    teamId: "TFX-9999",
    teamName: "Cybertron Innovators",
    teamLeaderName: "Optimus Prime",
    problemStatementId: "AI-01",
    problemStatementTitle: "Autonomous Defense Systems",
    projectType: "Software",
    abstractFileName: "Cybertron_Defense_Abstract.pdf",
    presentationFileName: "Cybertron_Defense_Deck.pptx",
    presentationDriveLink: "https://drive.google.com/open?id=1234567890"
  };

  const html = generateRegistrationEmail(testData);

  // Optional: Save to local file for preview without sending
  fs.writeFileSync("test-email-preview.html", html);
  console.log("✅ Saved HTML preview to test-email-preview.html");

  console.log("Sending test email via SMTP...");
  try {
    const info = await transporter.sendMail({
      from: `"TransForMX Hackathon" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `TRANSFORMX 2026 | MISSION INITIALIZED | ${testData.teamId} [TEST]`,
      html: html
    });
    console.log("✅ Test email sent successfully! Message ID:", info.messageId);
  } catch (err) {
    console.error("❌ Failed to send test email:", err.message);
  }
}

runTest();
