import createTransform from 'redux-persist/es/createTransform';
import {convertMain} from '../helpers/convert';

export const mainTransform = createTransform(
    (inboundState, key) => {
        return {...inboundState};
    },
    (outboundState, key) => {
        return convertMain(outboundState);
    },
    {whitelist: ['main']}
);