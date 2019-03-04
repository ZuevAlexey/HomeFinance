import React from 'react';
import {isNullOrUndefined} from "./maybe";
import {Text} from "react-native";
import {GetFullMoneyCellName, GetShortPersonName} from "./displayStringHelper";
import {Theme} from "../components/theme";

export const getTitleWithOwner = (people) => (moneyCell) => {
    let owner = null;
    if(!isNullOrUndefined(people)){
        owner = people.first(e => e.id === moneyCell.ownerId);
    }

    return [
        <Text key = 'name' style = {{textAlign: 'center'}}>
            {GetFullMoneyCellName(owner, moneyCell)}
        </Text>,
        <Text key = 'amount' style={{
            color: moneyCell.amount < 0 ? Theme.badColor : Theme.goodColor,
            textAlign: 'center'}}>
            {`${moneyCell.amount} RUB`}
        </Text>
    ];
};

export const getSimpleTitle = () => getTitleWithOwner(undefined);

export const GetInfoText = (title, value, displayValueCreator, colorPredicate) =>{
    let valueColor = isNullOrUndefined(colorPredicate)
        ? Theme.fontColor
        : colorPredicate(value)
            ? Theme.goodColor
            : Theme.badColor;
    return <Text
        style = {{
            color: Theme.fontColor,
            fontSize: 16
        }}
    >{title}:{' '}
        <Text
            style={{color: valueColor}}
        >
            {isNullOrUndefined(displayValueCreator)
                ? value
                : displayValueCreator(value)}
        </Text>
    </Text>
};