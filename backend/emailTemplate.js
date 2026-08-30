/**
 * Generates the HTML for the TRANSFORMX 2026 Registration Confirmation Email.
 * Designed with a futuristic Optimus Prime / command-center theme.
 * 
 * @param {Object} data 
 * @param {string} data.teamId - The generated Team ID
 * @param {string} data.teamName - Name of the team
 * @param {string} data.teamLeaderName - Name of the team leader
 * @param {string} data.problemStatementId - The problem statement ID or code
 * @param {string} data.problemStatementTitle - Title/Description of the problem statement
 * @param {string} data.projectType - Hardware or Software
 * @param {string} [data.abstractFileName] - Name of the uploaded abstract file (if any)
 * @param {string} data.presentationFileName - Name of the uploaded PPT file
 * @param {string} [data.presentationDriveLink] - Google Drive view link for the submission
 * @returns {string} - The full HTML string for the email
 */
export function generateRegistrationEmail(data) {
  const {
    teamId = "TBD",
    teamName = "TBD",
    teamLeaderName = "TBD",
    problemStatementId = "N/A",
    projectType = "N/A"
  } = data;

  const whatsappGroupUrl = process.env.WHATSAPP_GROUP_URL || "#";

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TRANSFORMX 2026 | MISSION INITIALIZED</title>
  <style>
    body, p, h1, h2, h3, h4, h5, h6 { margin: 0; padding: 0; }
    body { background-color: #02060b; font-family: 'Segoe UI', Arial, sans-serif; -webkit-font-smoothing: antialiased; }
    table { border-spacing: 0; border-collapse: collapse; width: 100%; }
    td { padding: 0; }
    a { text-decoration: none; }
    
    @media screen and (max-width: 600px) {
      .responsive-table { width: 100% !important; }
      .mobile-padding { padding: 20px 15px !important; }
      .full-width { display: block !important; width: 100% !important; box-sizing: border-box !important; }
      .m-mt-20 { margin-top: 20px !important; }
    }
  </style>
</head>
<body style="background-color: #02060b; color: #ffffff; padding: 20px 0;">
  
  <table role="presentation" align="center" class="responsive-table" width="600" style="margin: 0 auto; background-color: #070e17; border: 2px solid #00D9FF; box-shadow: 0 0 20px rgba(0,217,255,0.15);">
    
    <!-- HEADER SECTION -->
    <tr>
      <td class="mobile-padding" style="padding: 40px 30px; text-align: center; border-bottom: 1px solid #1a2533;">
        
        <h2 style="color: #aeb7c2; font-family: 'Courier New', Courier, monospace; letter-spacing: 4px; font-size: 16px; margin-bottom: 10px; text-transform: uppercase;">TRANSFORMX 2026</h2>
        <h1 style="color: #ffffff; font-family: 'Courier New', Courier, monospace; letter-spacing: 2px; font-size: 32px; font-weight: bold; margin-bottom: 15px; text-shadow: 0 0 15px rgba(255,255,255,0.4); text-transform: uppercase;">MISSION INITIALIZED</h1>
        
        <div style="margin-bottom: 40px;">
          <span style="background-color: rgba(0, 217, 255, 0.1); color: #00D9FF; font-family: 'Courier New', Courier, monospace; font-size: 12px; letter-spacing: 2px; padding: 5px 10px; border: 1px solid rgba(0,217,255,0.3); text-transform: uppercase;">TRANSMISSION // REGISTRATION CONFIRMED</span>
        </div>
        
        <!-- TEAM ID BADGE -->
        <div style="background-color: #040914; border: 2px solid #00D9FF; padding: 20px 30px; display: inline-block; margin-bottom: 40px; box-shadow: inset 0 0 15px rgba(0, 217, 255, 0.1), 0 0 15px rgba(0, 217, 255, 0.2);">
          <p style="font-family: 'Courier New', Courier, monospace; color: #E31B23; font-weight: bold; font-size: 28px; margin: 0; letter-spacing: 3px; text-shadow: 0 0 8px rgba(227, 27, 35, 0.4);">TEAM ID: ${teamId}</p>
        </div>

        <!-- COMMANDER MESSAGE -->
        <p style="color: #00D9FF; font-family: 'Courier New', Courier, monospace; font-size: 18px; margin-bottom: 15px; letter-spacing: 1px; text-transform: uppercase; text-align: left;">COMMANDER ${teamLeaderName},</p>
        <p style="color: #aeb7c2; font-size: 16px; line-height: 1.6; text-align: left;">Your registration for <strong style="color: #ffffff;">TRANSFORMX Hackathon 2026</strong> has been successfully recorded.</p>
        
      </td>
    </tr>
    
    <!-- MISSION PARAMETERS SECTION -->
    <tr>
      <td class="mobile-padding" style="padding: 30px; border-bottom: 1px solid #1a2533; background-color: #0b131e;">
        <h3 style="color: #00D9FF; font-family: 'Courier New', Courier, monospace; font-size: 18px; letter-spacing: 2px; margin-bottom: 25px; margin-top: 0; text-transform: uppercase; border-bottom: 1px solid rgba(0,217,255,0.3); padding-bottom: 10px;">MISSION PARAMETERS</h3>
        
        <table role="presentation" width="100%" style="font-family: 'Courier New', Courier, monospace; font-size: 15px; line-height: 1.8;">
          <tr>
            <td style="color: #6b7a90; width: 150px; padding-bottom: 10px; letter-spacing: 1px;">DESIGNATION:</td>
            <td style="color: #ffffff; padding-bottom: 10px; font-weight: bold;">${teamName}</td>
          </tr>
          <tr>
            <td style="color: #6b7a90; padding-bottom: 10px; letter-spacing: 1px;">TARGET PROTOCOL:</td>
            <td style="color: #ffffff; padding-bottom: 10px; font-weight: bold;">${problemStatementId}</td>
          </tr>
          <tr>
            <td style="color: #6b7a90; padding-bottom: 10px; letter-spacing: 1px;">SYSTEM TYPE:</td>
            <td style="color: #ffffff; padding-bottom: 10px; font-weight: bold;">${projectType}</td>
          </tr>
        </table>
      </td>
    </tr>
    
    <!-- EVENT TIMELINE SECTION -->
    <tr>
      <td class="mobile-padding" style="padding: 30px; border-bottom: 1px solid #1a2533; background-color: #070e17;">
        <h3 style="color: #E31B23; font-family: 'Courier New', Courier, monospace; font-size: 18px; letter-spacing: 2px; margin-bottom: 25px; margin-top: 0; text-transform: uppercase; border-bottom: 1px solid rgba(227,27,35,0.3); padding-bottom: 10px;">EVENT TIMELINE</h3>
        
        <table role="presentation" width="100%" style="font-family: 'Courier New', Courier, monospace; font-size: 15px;">
          <tr>
            <td width="30" valign="top" style="padding-bottom: 30px;">
              <div style="width: 12px; height: 12px; background-color: #E31B23; border-radius: 50%; margin-top: 4px; box-shadow: 0 0 10px #E31B23;"></div>
              <div style="width: 2px; height: 50px; background-color: rgba(227,27,35,0.3); margin-left: 5px; margin-top: 5px;"></div>
            </td>
            <td style="padding-bottom: 30px;">
              <div style="color: #ffffff; font-weight: bold; font-size: 18px; letter-spacing: 1px;">ROUND 1</div>
              <div style="color: #aeb7c2; font-size: 15px; margin-top: 5px;">Concept Review</div>
              <div style="color: #6b7a90; font-size: 13px; margin-top: 5px;">TBD</div>
            </td>
          </tr>
          <tr>
            <td width="30" valign="top">
              <div style="width: 12px; height: 12px; background-color: #E31B23; border-radius: 50%; margin-top: 4px; box-shadow: 0 0 10px #E31B23;"></div>
            </td>
            <td>
              <div style="color: #ffffff; font-weight: bold; font-size: 18px; letter-spacing: 1px;">FINAL</div>
              <div style="color: #aeb7c2; font-size: 15px; margin-top: 5px;">Execution Day</div>
              <div style="color: #6b7a90; font-size: 13px; margin-top: 5px;">TBD</div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    
    <!-- WHATSAPP CTA -->
    <tr>
      <td class="mobile-padding" style="padding: 40px 30px; border-bottom: 1px solid #1a2533; text-align: center; background-color: #040914;">
        <h3 style="color: #ffffff; font-family: 'Courier New', Courier, monospace; font-size: 20px; letter-spacing: 2px; margin-top: 0; margin-bottom: 15px; text-transform: uppercase;">JOIN OUR WHATSAPP COMMUNITY</h3>
        <p style="color: #aeb7c2; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
          Stay updated. Stay connected.<br>
          Let's build something legendary!
        </p>
        
        <a href="${whatsappGroupUrl}" style="background-color: transparent; color: #25D366; font-family: 'Courier New', Courier, monospace; font-size: 16px; font-weight: bold; text-decoration: none; padding: 15px 30px; border: 2px solid #25D366; display: inline-block; text-transform: uppercase; letter-spacing: 1px; box-shadow: 0 0 15px rgba(37, 211, 102, 0.15);">
          JOIN WHATSAPP GROUP
        </a>
      </td>
    </tr>
    
    <!-- FOOTER TEXT -->
    <tr>
      <td class="mobile-padding" style="padding: 40px 30px; text-align: center; background-color: #070e17;">
        
        <p style="color: #00D9FF; font-family: 'Courier New', Courier, monospace; font-style: italic; font-size: 16px; margin-bottom: 15px; letter-spacing: 1px;">"Together we innovate. Together we transform."</p>
        <p style="color: #ffffff; font-family: 'Courier New', Courier, monospace; font-weight: bold; font-size: 18px; letter-spacing: 2px; margin-bottom: 30px; text-transform: uppercase;">See you on the battlefield!</p>
        
        <div style="border-top: 1px solid #1a2533; padding-top: 30px;">
          <p style="color: #6b7a90; font-size: 14px; letter-spacing: 2px; font-family: 'Courier New', Courier, monospace; margin-bottom: 10px; text-transform: uppercase;">TransForMX Command Center</p>
          <p style="color: #4b5a70; font-size: 12px; letter-spacing: 1px; font-family: 'Courier New', Courier, monospace; text-transform: uppercase;">Code Club | Sri Sairam Engineering College</p>
        </div>
        
      </td>
    </tr>
  </table>
  
</body>
</html>
  `;
}
