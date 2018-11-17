import React from 'react';
import {List} from "../../components/list/list";
import {Alert, Text} from "react-native";
import {Theme} from "../../components/theme";
import {Screen} from "../../components/screen/screen";
import {showOkCancelDialog} from "../../helpers/okCancelDialog";

import state from '../../store/initialState';
import {getAvatar} from "../../helpers/moneyCellsHelper";

export const MoneyCellsScreen = (props) => {
    let {navigation} = props;
    return (
        <Screen {...props}
                headerTitle = 'MoneyCells'
                headerStatus = {<Text style = {
                {
                    textAlign: 'center',
                    fontSize: 30,
                    color: Theme.badColor
                }}
            >-400$</Text>}
        >
            <List
                avatarFactory = {getAvatar}
                avatarStyle = {Theme.listAvatarStyle}
                titleFactory = {getTitle}
                onItemPress = {onMoneyCellPress(navigation)}
                onItemEditPress = {onMoneyCellEditPress(navigation)}
                onItemDeletePress = {onMoneyCellDeletePress}
                items = {state.moneyCells}
                addButtonInfo= {{
                    icon: {
                        name: 'credit-card-plus',
                        type: 'material-community'
                    },
                    title: 'Add new moneyCell',
                    onPress: addMoneyCellPress(navigation)
                }}
            />
        </Screen>
    );
};

const addMoneyCellPress = (navigation) => () => {
    navigation.push('EditMoneyCell', {});
};

const onMoneyCellPress = (navigation) => (moneyCell) => {
    navigation.push('MoneyCell', {moneyCell});
};

const onMoneyCellEditPress = (navigation) => (moneyCell) => {
    navigation.push('EditMoneyCell', {moneyCell});
};

const onMoneyCellDeletePress = (moneyCell) => {
    showOkCancelDialog(
        'Deleting money cell',
        `You want to delete a money cell '${moneyCell.name}'. Are you sure?`,
        'Delete',
        'Cancel',
        () => Alert.alert(`Delete '${moneyCell.name}'`)
    );
};

const getTitle = (moneyCell) => {
    return (
        [<Text key = 'name'>
            {`${moneyCell.name}`}
        </Text>,
        <Text key = 'amount' style={{color: moneyCell.amount < 0 ? Theme.badColor : Theme.goodColor}}>
            {`${moneyCell.amount} RUB`}
        </Text>]
    );
};
