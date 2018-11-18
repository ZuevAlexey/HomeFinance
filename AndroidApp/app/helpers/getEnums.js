import * as tcomb from 'tcomb-form-native';

export const getEnumsFromList = (objects, valueFactory, displayValueFactory, name, defaultValue) => {
    let enumObject = objects.reduce((acc, cur) => {
        acc[valueFactory(cur)] = displayValueFactory(cur);
        return acc;
    }, {});

    if(defaultValue !== undefined){
        enumObject[defaultValue.key]=defaultValue.value;
    }

    return tcomb.enums(enumObject, name)
};

export const getEnumsFromObject = (object, name, defaultValue) => getEnumsFromList(Object.keys(object), key => object[key], key => object[key], name, defaultValue);