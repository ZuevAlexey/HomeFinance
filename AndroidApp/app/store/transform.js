import createTransform from 'redux-persist/es/createTransform';
import {convertArticles, convertMoneyCells, convertPeople, convertTransactions} from '../helpers/convert';

export const articlesTransform = createTransform(
    (inboundState, key) => {
        return [...inboundState];
    },
    (outboundState, key) => {
        return convertArticles(outboundState);
    },
    { whitelist: ['articles'] }
);

export const peopleTransform = createTransform(
    (inboundState, key) => {
        return [ ...inboundState];
    },
    (outboundState, key) => {
        return convertPeople(outboundState);
    },
    { whitelist: ['people'] }
);

export const moneyCellsTransform = createTransform(
    (inboundState, key) => {
        return [ ...inboundState];
    },
    (outboundState, key) => {
        return convertMoneyCells(outboundState);
    },
    { whitelist: ['moneyCells'] }
);

export const transactionsTransform = createTransform(
    (inboundState, key) => {
        return [ ...inboundState];
    },
    (outboundState, key) => {
        return convertTransactions(outboundState);
    },
    { whitelist: ['transactions'] }
);

export const systemDataTransform = createTransform(
    (inboundState, key) => {
        return { ...inboundState};
    },
    (outboundState, key) => {
        return {
            lastSynchronizationTime: new Date(outboundState.lastSynchronizationTime),
            serverAddress: outboundState.serverAddress
        };
    },
    { whitelist: ['systemData'] }
);
