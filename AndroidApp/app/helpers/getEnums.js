import * as tcomb from 'tcomb-form-native';

export const getEnumsFromList = (objects, valueFactory, displayValueFactory, name) => {
    let enumObject = objects.reduce((acc, cur) => {
        acc[valueFactory(cur)] = displayValueFactory(cur);
        return acc;
    }, {});
    return tcomb.enums(enumObject, name)
};

export const getEnumsFromObject = (object, name) => getEnumsFromList(Object.keys(object), key => object[key], key => object[key], name);