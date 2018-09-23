let fs = require('fs');

export const readObjectFromFile = (fileName) => {
    let fileData = fs.readFileSync(fileName, 'utf8');
    let result = JSON.parse(fileData);
    return result !== undefined ? result : {};
};

export const saveObjectToFile = (obj, fileName) => {
    fs.writeFile(fileName, JSON.stringify(obj, null, 2), function (err) {
        if (err) throw err;
    });
};

export const saveToFileSync = (obj, fileName) => {
    fs.writeFileSync(fileName, JSON.stringify(obj), function (err) {
        if (err) throw err;
    });
};

export const createFolderIfNeed = (directoryName) => {
    if (!fs.existsSync(directoryName)){
        fs.mkdirSync(directoryName);
    }
};

export const createFileIfNeed = (fileName, initialObject) => {
    if (!fs.existsSync(fileName)){
        saveToFileSync(initialObject, fileName);
    }
};