import {isNullOrUndefined} from "./maybe";
import {Text} from "react-native";
import {GetShortPersonName} from "./displayStringHelper";
import {Theme} from "../components/theme";

export const getTitleWithOwner = (people) => (moneyCell) => {
    let owner = null;
    if(!isNullOrUndefined(people)){
        owner = people.first(e => e.id === moneyCell.ownerId);
    }

    let result = [
        <Text key = 'name'>
            {`${moneyCell.name}`}
        </Text>
    ];
    if(!isNullOrUndefined(owner)){
        result.push(<Text key = 'ownerName'>
            {`owner: ${GetShortPersonName(owner)}`}
        </Text>)
    }

    result.push(
        <Text key = 'amount' style={{color: moneyCell.amount < 0 ? Theme.badColor : Theme.goodColor}}>
            {`${moneyCell.amount} RUB`}
        </Text>);
    return result;
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