import accessToken from './token';
import credentials from "./credentials";


export const updateFile = async (fileId, fileContent) => {
    let exportFileUrl = 'https://www.googleapis.com/upload/drive/v3/files/' + fileId
        + '?uploadType=media';

    let response = await fetch(exportFileUrl, {
        method: 'PATCH',
        headers: {
            'Authorization': 'Bearer ' + accessToken.access_token,
            'Content-Type': 'plain/text'
        },
        body: fileContent
    });
    return await response.text();
};

export const getFileContent = async (fileId) => {
    let exportFileUrl = 'https://www.googleapis.com/drive/v3/files/' + fileId
        + '?alt=media';

    let response = await fetch(exportFileUrl, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + accessToken.access_token
        }
    });
    return await response.text();
};

export const initializeGDriveEnvironment = async (mainFolderName, backupFolderName, fileName, getFileContent) => {
    let mainFolderId = await initializeFolder(mainFolderName);
    let backupFolderId = await initializeFolder(backupFolderName, mainFolderId);

    let filesResponse = await getChildFile(mainFolderId, fileName);
    let filesJson = await filesResponse.json();
    let fileId = null;
    if (filesJson.files.length === 0) {
        let createFileResponse = await createFile(mainFolderId, fileName, getFileContent());
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

export const createFile = async (folderId, fileName, fileContent) => {
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
        "--" + MULTIPART_DELIMITER + "--"

    return await fetch(filesUrl, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + accessToken.access_token,
            'Content-Type': 'multipart/related; boundary=' + MULTIPART_DELIMITER
        },
        body: body
    });
};

const initializeFolder = async (folderName, parentFolderId) => {
    let folderResponse = await getFolder(folderName, parentFolderId);
    if (folderResponse.status === 401) {
        if (!await refresh_token()) {
            throw Error("Couldn't refresh a access token. Change the token manually and try again")
        }
    }

    folderResponse = await getFolder(folderName, parentFolderId);
    let folderJson = await folderResponse.json();
    if (folderJson.files.length === 0) {
        throw Error("The folder " + folderName + " doesn't exist. Create a folder with name HomeFinance in your Google Drive and try again")
    }
    return folderJson.files[0].id;
};

const getFolder = async (folderName, parentFolderId) => {
    let q = "mimeType='application/vnd.google-apps.folder' and name='" + folderName + "'";
    if (parentFolderId !== undefined) {
        q = q + " and '" + parentFolderId + "' in parents";
    }
    return getList(q);
};

const getChildFile = async (folderId, fileName) => {
    let q = "name='" + fileName + "' and '" + folderId + "' in parents"
    return getList(q);
};

const getList = async (q) => {
    let filesUrl = 'https://www.googleapis.com/drive/v3/files'
        + "?q=" + q
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