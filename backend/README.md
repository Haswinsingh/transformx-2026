# Zenvyxx Registration Server

Express-based backend for processing the Zenvyxx Hackathon registrations and securely storing them straight into Google Sheets, while simultaneously dispatching an automatic welcome email out of a dedicated Gmail account.

## Setup Instructions

### 1. Google Sheets API Preparation

1.  Head to [Google Cloud Console](https://console.cloud.google.com).
2.  Enable the **Google Sheets API**.
3.  Create a **Service Account** under **APIs & Services > Credentials** and download the `credentials.json` JSON key file.
4.  Share your desired Google Sheet with the email of the Service Account (it looks like an email address, e.g., `something@project.iam.gserviceaccount.com`). Provide it with `Editor` access.

### 2. Environment Variables

Create a `.env` file in the root of this folder mirroring the structure of `.env.example`:

```env
PORT=5000
EMAIL_USER=yourmail@gmail.com
EMAIL_PASS=your_gmail_app_password
SHEET_ID=your_google_sheet_id
```
*(To use Gmail, you must enable 2-Step Verification and create an "App Password" to enter as `EMAIL_PASS`.)*

Make sure `credentials.json` is located in this specific directory (the root of this backend API) or pass it directly as a serialized string inside `GOOGLE_CREDENTIALS` env variable exactly as configured in the server file. 

### 3. Running Locally

```bash
npm install
npm run dev
```

### 4. Deploying to Render
1. Create a "Web Service" on [Render](https://render.com).
2. Connect this repository containing your backend API.
3. Use the following build setup:
    * **Build Command**: `npm install`
    * **Start Command**: `npm start`
4. Inject all your **Environment Variables** within the Render Dashboard (`PORT`, `EMAIL_USER`, `EMAIL_PASS`, `SHEET_ID`, and specifically `GOOGLE_CREDENTIALS` containing the raw JSON content of your Service Account to avoid committing it).
5. Deploy! Get your dynamic URL (e.g., `https://zenvyxx-api.onrender.com`)!

---

## Frontend Integration Tips
Inside your Vite project, add the URL you obtained from Render (e.g., `https://zenvyxx-api.onrender.com/register`) as a mapped environment variable:
```env
VITE_BACKEND_URL=https://zenvyxx-api.onrender.com/register
```

Build your React project as usual, maintaining the link to this backend instance organically!
