
const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

const CLIENT_ID = '361764141766-4p95eoqqjfjia22skurluia2h0d2d4lr.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

const REFRESH_TOKEN = '1//047aEEXR9L0_eCgYIARAAGAQSNwF-L9Ir57edEPsx2-OPWEUS2HgbwI_2tRbv8e8FfZWUyEUQ7G9XpYv4RvQz9T2inlMjQgMrXhs';

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oauth2Client.setCredentials({refresh_token: REFRESH_TOKEN });


const drive = google.drive({
  version: 'v3',
  auth: oauth2Client,
});

const filePath = path.join(__dirname, 'nishtha.jpg')

async function uploadFile() {
    try {
      const response = await drive.files.create({
        requestBody: {
          name: 'nishtha.jpg', 
          mimeType: 'image/jpg',
        },
        media: {
          mimeType: 'image/jpg',
          body: fs.createReadStream(filePath),
        },
      });
  
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  //uploadFile();

  async function generatePublicUrl() {
    try {
      const fileId = '1RQM4_NYSGx3POJJthqQKjO9XibEsbILj';
      await drive.permissions.create({
        fileId: fileId,
        requestBody: {
          role: 'reader',
          type: 'anyone',
        },
      });

      const result = await drive.files.get({
        fileId: fileId,
        fields: 'webViewLink, webContentLink',
      });
      console.log(result.data);
    } catch (error) {
      console.log(error.message);
    }
  }
  
  generatePublicUrl();   