import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config();

const sheetsAuth = new google.auth.GoogleAuth({
  keyFile: "credentials.json",
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

async function run() {
  const client = await sheetsAuth.getClient();
  const sheets = google.sheets({ version: "v4", auth: client });

  const getRows = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: "Sheet1",
  });
  
  const rows = getRows.data.values || [];
  console.log(`Found ${rows.length} rows`);
  
  // Just print emails and names
  rows.forEach((row, idx) => {
    console.log(`--- Row ${idx} (${row[0]}) ---`);
    console.log(`Team Name: ${row[1]}`);
    console.log(`Leader Name: ${row[2]}`);
    console.log(`Leader Email: ${row[6]}`);
    
    for (let i = 16; i < row.length; i += 5) {
       console.log(`Member Name: ${row[i]}`);
       console.log(`Member Email: ${row[i+1]}`);
    }
  });
}

run();
