import GDrive from "./wrapper/GDrive";
import {debugObject} from "../dialog";

GDrive.init();

const defaultAccessToken = 'ya29.a0Ae4lvC3UK_cfiFB_l9R2CwOXkK4X89tGGjt7oNHNXwAl7yWsHTavjwsYFHAG7AlcdTnoyaE95X7BQuq68J3LEnxmgqYHt7tX8r3UIU3EddXr57g9nl9_TmEfxL5Iizns31yXwOf6t23SU4UDfOPZfQeMuu0i66yB_os';

export const getContentFromDrive = async (accessToken) => {
    accessToken = accessToken === undefined ? defaultAccessToken : accessToken;
    GDrive.setAccessToken(accessToken);
    let queryParams = {
        q: "mimeType='application/vnd.google-apps.folder' and name='HomeFinance'",
        corpora: 'user',
        pageSize: 10,
        fields: 'nextPageToken, files(id, name)',
    };
    let response = await GDrive.files.list(queryParams);
    if(response.status === 401) {

    }

    debugObject(response);
};