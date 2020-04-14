import {debugObject} from "../dialog";

const {google} = require('googleapis');


/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
export const authorize = (credentials, token) => {
    const {client_secret, client_id, redirect_uris} = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);
    oAuth2Client.setCredentials(token);
    listFiles(oAuth2Client);
};

function listFiles(auth) {
    const drive = google.drive({version: 'v3', auth});
    let folderId = null
    drive.files.list({
        q: "mimeType='application/vnd.google-apps.folder' and name='HomeFinance'",
        corpora: 'user',
        pageSize: 10,
        fields: 'nextPageToken, files(id, name)',
    }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        const files = res.data.files;
        if (files.length === 1) {
            const file = files[0]
            folderId = file.id
            debugObject(`${file.name} (${file.id})`);
        } else {
            debugObject('No files found or many ' + files.length);
        }

        if(folderId){
            createFile(auth, folderId)
        }
    });
}

function createFile(auth, folderId) {
    const drive = google.drive({version: 'v3', auth});
    debugObject(folderId)
    let fileMetadata = {
        name: 'state1.json',
        parents: [folderId]
    };
    let media = {
        mimeType: 'text/plain',
        body: "{}"
    };
    drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: 'id'
    }, function (err, file) {
        if (err) {
            // Handle error
            debugObject(err);
        } else {
            debugObject('File Id: ', file.data.id);
        }
    });
}