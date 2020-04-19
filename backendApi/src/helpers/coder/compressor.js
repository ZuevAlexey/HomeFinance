import {Base64} from "./base64";
import {zip_deflate} from "./rawdeflate"
import {zip_inflate} from "./rawinflate"

export const compress = (text) => {
    return Base64.toBase64(zip_deflate(Base64.utob(text)));
};

export const decompress = (text) => {
    return Base64.btou(zip_inflate(Base64.fromBase64(text)));
};