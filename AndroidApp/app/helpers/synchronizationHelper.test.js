import {synchronize, getInfoForSynchronize} from "./synchronizationHelper";

it(`Synchronization function test`, () => {
    const elem1 = {id:1, data: "data1"};
    const elem2 = {id:2, data: "data2"};
    const elem3 = {id:3, data: "data3"};
    const elem4 = {id:4, data: "data4"};
    const elem5 = {id:5, data: "data5"};
    const elem6 = {id:6, data: "data6"};
    const elem7 = {id:7, data: "data7"};
    const anotherElem4 = {id:4, data: "anotherData4"};
    const anotherElem5 = {id:5, data: "anotherData5"};

    const startState = [elem1, elem2, elem3, elem4, elem5];
    const diff = {
        add: [elem6, elem7],
        edit: [anotherElem4, anotherElem5],
        remove: [2,3],
    };
    expect(synchronize(startState, diff))
        .toEqual([elem1, elem6, elem7, anotherElem4, anotherElem5]);
});

it(`getInfoForSynchronize function test`, () => {
    const elem1 = {id:1, lastModificationTime: new Date(2018, 11, 1, 8, 23, 4, 23)};
    const elem2 = {id:2, lastModificationTime: new Date(2018, 11, 2, 8, 23, 4, 23)};
    const elem3 = {id:3, lastModificationTime: new Date(2018, 11, 3, 8, 23, 4, 23)};
    const elem4 = {id:4, lastModificationTime: new Date(2018, 11, 3, 8, 33, 4, 23)};
    const elem5 = {id:5, lastModificationTime: new Date(2018, 11, 5, 8, 23, 4, 23)};

    const startState = [elem1, elem2, elem3, elem4, elem5];
    let lastSynchronizationTime = new Date(2018, 11, 3, 8, 28, 4, 23);
    expect(getInfoForSynchronize(startState, lastSynchronizationTime))
        .toEqual([elem4, elem5]);
});