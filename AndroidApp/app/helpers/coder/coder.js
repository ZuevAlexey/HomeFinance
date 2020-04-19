import {compress, decompress} from "./compressor";

const aesjs = require('aes-js');

let dataKey = "8bb4964bdf69474c035e0dec0e24fd0fabf2d5d2ed095b82afeaf3abeb4207783ef8da8afd4b5c487fb70f14d22902e5edc625cb0e5b04d59b9431d6ce51f3d2e5971bf5a079b664ad1532793677faafb491083937579a4ce76c6a390d4d1192";

export const DATA_TYPE = {
    KEY: 0,
    DATA: 1
};

export const encrypt = async (text, key, dataType) => {
    let key1 = await getKey(key, dataType);
    return await encryptWithKey(text, key1);
};

const encryptWithKey = async (text, key) => {
    return aesjs.utils.hex.fromBytes(new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5)).encrypt(aesjs.utils.utf8.toBytes(compress(text))));
};

export const decrypt = async (text, key, dataType) => {
    let s = await decryptWithKey(text, await getKey(key, dataType));
    if (dataType === DATA_TYPE.DATA) {
        return s;
    }

    let jsonKey = JSON.parse(s);
    return {
        token: jsonKey.token,
        credentials: jsonKey.credentials
    };
};

const decryptWithKey = async (text, key) => {
    return decompress(aesjs.utils.utf8.fromBytes(new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5)).decrypt(aesjs.utils.hex.toBytes(text))));
};

const getKey = async (key, dataType) => {
    switch (dataType) {
        case DATA_TYPE.DATA:
            return aesjs.utils.hex.toBytes(JSON.parse(await decryptWithKey(key, await getKey(null, DATA_TYPE.KEY))).key);
        case DATA_TYPE.KEY:
            return aesjs.utils.hex.toBytes(dataKey).slice(7, 39);
    }
};