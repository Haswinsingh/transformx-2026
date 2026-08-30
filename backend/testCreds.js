const fs = require('fs');

try {
  const creds = JSON.parse(fs.readFileSync('d:/Zynex/backend/credentials.json', 'utf8'));
  
  console.log("type:", creds.type);
  console.log("project_id:", creds.project_id);
  console.log("client_email:", creds.client_email);
  console.log("private_key_id:", creds.private_key_id ? "Exists" : "Missing");
  
  const pk = creds.private_key;
  if (!pk) {
    console.log("private_key: Missing");
  } else {
    console.log("private_key starts with:", pk.substring(0, 27));
    console.log("private_key ends with:", pk.substring(pk.length - 25));
    console.log("private_key contains newlines:", pk.includes('\\n') || pk.includes('\n'));
    console.log("private_key is malformed literal \\n:", pk.includes('\\\\n'));
  }
} catch (e) {
  console.error("Error reading credentials:", e.message);
}
