import * as tcomb from 'tcomb-form-native';
import {isNullOrUndefined} from "./maybe";

export const getEnumsFromList = (objects, valueFactory, displayValueFactory, name, defaultValue, sortFunc) => {
    let sortedObjects = isNullOrUndefined(sortFunc)
        ? objects
        : objects.sort(sortFunc);
    let enumObject = sortedObjects.reduce((acc, cur) => {
        acc[valueFactory(cur)] = displayValueFactory(cur);
        return acc;
    }, {});

    if(!isNullOrUndefined(defaultValue)){
        enumObject[defaultValue.key]=defaultValue.value;
    }

    return tcomb.enums(enumObject, name)
};

export const getEnumsFromObject = (object, name, defaultValue) => getEnumsFromList(Object.keys(object), key => object[key], key => object[key], name, defaultValue);