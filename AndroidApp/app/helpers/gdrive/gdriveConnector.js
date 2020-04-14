import {debugObject} from "../dialog";
import accessToken from './token';
import credentials from "./credentials";


const getHFRootFolder = async () => {
    let filesUrl = 'https://www.googleapis.com/drive/v3/files'
        + "?q=mimeType='application/vnd.google-apps.folder' and name='HomeFinance'"
        + '&corpora=user'
        + '&pageSize=10'
        + '&fields=nextPageToken, files(id, name)';

    return await fetch(filesUrl, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + accessToken.access_token
        }
    });
};

const getChildFile = async (folderId, fileName) => {
    let filesUrl = 'https://www.googleapis.com/drive/v3/files'
        + "?q=name='" + fileName + "' and '" + folderId + "' in parents"
        + '&corpora=user'
        + '&pageSize=10'
        + '&fields=nextPageToken, files(id, name)';

    return await fetch(filesUrl, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + accessToken.access_token
        }
    });
};

const getFileContent = async (fileId) => {
    let exportFileUrl = 'https://www.googleapis.com/drive/v3/files/' + fileId
        + '?fields=*';

    return await fetch(exportFileUrl, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + accessToken.access_token
        }
    });
};


const refresh_token = async () => {
    let tokenUrl = 'https://oauth2.googleapis.com/token'
        + '?grant_type=refresh_token'
        + '&refresh_token=' + accessToken.refresh_token
        + '&client_id=' + credentials.installed.client_id
        + '&client_secret=' + credentials.installed.client_secret;
    let response = await fetch(tokenUrl, {
        method: 'POST'
    });

    if (response.status === 200) {
        accessToken.access_token = (await response.json()).access_token;
        return true;
    }

    return false;
};



export const getContentFromDrive = async () => {
    let response = await getHFRootFolder();
    if (response.status === 401) {
        if (! await refresh_token()) {
            return;
        }
    }

    response = await getHFRootFolder();
    let hfRootFolderId = (await response.json()).files[0].id;

    let filesResponse = await getChildFile(hfRootFolderId, 'state.json');
    let fileId = (await filesResponse.json()).files[0].id;
    let fileResponse = await getFileContent(fileId);
    let webContentUrl = (await (fileResponse).json()).webContentLink;

    let content = await fetch(webContentUrl, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + accessToken.access_token
        }
    });

    debugObject(await content.text())
};