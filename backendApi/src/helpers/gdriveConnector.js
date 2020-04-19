import {isNullOrUndefined} from "./maybe";
import fetch from 'node-fetch';

export const updateFile = async (fileId, fileContent, token, credentials) => {
    let exportFileUrl = 'https://www.googleapis.com/upload/drive/v3/files/' + fileId
        + '?uploadType=media';

    let response = await fetchWithRefreshToken(token, credentials, exportFileUrl, {
        method: 'PATCH',
        headers: {
            'Authorization': 'Bearer ' + token.access_token,
            'Content-Type': 'plain/text'
        },
        body: fileContent
    });
    return await response.text();
};

export const getFileContent = async (fileId, token, credentials) => {
    let exportFileUrl = 'https://www.googleapis.com/drive/v3/files/' + fileId
        + '?alt=media';

    let response = await fetchWithRefreshToken(token, credentials, exportFileUrl, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token.access_token
        }
    });
    return await response.text();
};

export const initializeGDriveEnvironment = async (mainFolderName, backupFolderName, fileName, getFileContent, token, credentials) => {
    let mainFolderId = await initializeFolder(mainFolderName, null, token, credentials);
    let backupFolderId = await initializeFolder(backupFolderName, mainFolderId, token, credentials);

    let filesResponse = await getChildFile(mainFolderId, fileName, token, credentials);
    let filesJson = await filesResponse.json();
    let fileId = null;
    if (filesJson.files.length === 0) {
        let createFileResponse = await createFile(mainFolderId, fileName, await getFileContent(), token, credentials);
        let createdFile = await createFileResponse.json();
        fileId = createdFile.id
    } else {
        fileId = filesJson.files[0].id;
    }

    return {
        fileId,
        mainFolderId,
        backupFolderId
    };
};

export const createFile = async (folderId, fileName, fileContent, token, credentials) => {
    let filesUrl = "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart";
    const MULTIPART_DELIMITER = "fadf6c78-1026-4e43-862f-4e07fe9d397d";
    let body = "--" + MULTIPART_DELIMITER + "\n" +
        "Content-Type: application/json; charset=UTF-8\n" +
        "\n" +
        "{\n" +
        "  \"name\": \"" + fileName + "\",\n" +
        "  \"parents\": [\"" + folderId + "\"]\n" +
        "}\n" +
        "--" + MULTIPART_DELIMITER + "\n" +
        "Content-Type: plain/text\n" +
        "\n" +
        fileContent + "\n" +
        "--" + MULTIPART_DELIMITER + "--";

    return await fetchWithRefreshToken(token, credentials, filesUrl, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token.access_token,
            'Content-Type': 'multipart/related; boundary=' + MULTIPART_DELIMITER
        },
        body: body
    });
};

const initializeFolder = async (folderName, parentFolderId, token, credentials) => {
    let q = "mimeType='application/vnd.google-apps.folder' and name='" + folderName + "'";
    if (!isNullOrUndefined(parentFolderId)) {
        q = q + " and '" + parentFolderId + "' in parents";
    }
    let folderResponse = await getList(q, token, credentials);
    let folderJson = await folderResponse.json();
    if (folderJson.files.length === 0) {
        throw Error("The folder '" + folderName + "' doesn't exist. Create a folder with name '" + folderName + "' in your Google Drive and try again")
    }
    return folderJson.files[0].id;
};

const getChildFile = async (folderId, fileName, token, credentials) => {
    let q = "name='" + fileName + "' and '" + folderId + "' in parents"
    return getList(q, token, credentials);
};

const getList = async (q, token, credentials) => {
    let filesUrl = 'https://www.googleapis.com/drive/v3/files'
        + "?q=" + q
        + '&corpora=user'
        + '&pageSize=10'
        + '&fields=nextPageToken, files(id, name)';

    return await fetchWithRefreshToken(token, credentials, filesUrl, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token.access_token
        }
    });
};

const refresh_token = async (token, credentials) => {
    let tokenUrl = 'https://oauth2.googleapis.com/token'
        + '?grant_type=refresh_token'
        + '&refresh_token=' + token.refresh_token
        + '&client_id=' + credentials.installed.client_id
        + '&client_secret=' + credentials.installed.client_secret;

    let response = await fetch(tokenUrl, {
        method: 'POST'
    });

    if (response.status === 200) {
        token.access_token = (await response.json()).access_token;
        return true;
    }

    return false;
};

const fetchWithRefreshToken = async (token, credentials, url, fetchSettings) => {
    let response = await fetch(url, fetchSettings);
    if (response.status !== 401) {
        return response;
    }

    if (!await refresh_token(token, credentials)) {
        throw Error("Couldn't refresh an access token. Change the token manually and try again")
    }
    //set new access token
    fetchSettings.headers.Authorization = 'Bearer ' + token.access_token;
    return await fetch(url, fetchSettings);
};