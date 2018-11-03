import React from 'react';
import {List} from "../../components/list/list";
import {MoneyCellType} from "../../constants/moneyCellType";
import {MoneyCellStatus} from "../../constants/moneyCellStatus";
import {Alert, Text} from "react-native";
import {Theme} from "../../components/theme";
import {Screen} from "../../components/screen/screen";

export const TransactionsScreen = (props) => {
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
                items = {moneyCells}
                addButtonInfo= {{
                    icon: {
                        name: 'credit-card-plus',
                        type: 'material-community'
                    },
                    title: 'Add new transaction',
                    onPress: addMoneyCellPress(navigation)
                }}
            />
        </Screen>
    );
};

const addMoneyCellPress = (navigation) => () => {
    navigation.push('AddNew');
};

const onMoneyCellPress = (navigation) => (moneyCell) => {
    navigation.push('MoneyCell', {moneyCell});
};

const onMoneyCellEditPress = (navigation) => (moneyCell) => {
    navigation.push('Edit', {moneyCell});
};

const onMoneyCellDeletePress = (moneyCell) => {
    Alert.alert(`delete ${moneyCell.name}`)
};

const getTitle = (moneyCell) => {
    return (
        [<Text key = 'name'>
            {`${moneyCell.name}`}
        </Text>,
        <Text key = 'amount' style={{color: moneyCell.amount < 0 ? Theme.badColor : Theme.goodColor}}>
            {`${moneyCell.amount}`}
        </Text>]
    );
};

const getAvatar = (transaction) => {
    let name;
    switch (transaction.moneyCellType){
        case MoneyCellType.CARD:{
            name = 'credit-card';
            break;
        }
        case MoneyCellType.CASH:{
            name = 'cash-100';
            break;
        }
        case MoneyCellType.DEPOSIT:{
            name = 'bank';
        }
    }

    return {
        type: 'material-community',
        name
    };
};

let moneyCells = [
    {
        id: '1',
        ownerId: '1',
        moneyCellType: MoneyCellType.CARD,
        amount: 1300,
        startDate: '2018-11-01T12:20:00.000Z',
        endDate: '2018-11-01T12:20:00.000Z',
        name: "Зарплатная карта",
        status: MoneyCellStatus.ACTIVE,
        parentId: null,
        isValid: true,
        roi: null,
        lastModificationTime: '2018-11-01T12:20:00.000Z',
        creationTime: '2018-11-01T12:20:00.000Z',
        isDeleted: false
    },
    {
        id: '2',
        ownerId: '1',
        moneyCellType: MoneyCellType.CASH,
        amount: 10500,
        startDate: '2018-11-01T12:20:00.000Z',
        endDate: '2018-11-01T12:20:00.000Z',
        name: "Наличные",
        status: MoneyCellStatus.ACTIVE,
        parentId: null,
        isValid: true,
        roi: null,
        lastModificationTime: '2018-11-01T12:20:00.000Z',
        creationTime: '2018-11-01T12:20:00.000Z',
        isDeleted: false
    },
    {
        id: '3',
        ownerId: '1',
        moneyCellType: MoneyCellType.DEPOSIT,
        amount: 1100000,
        startDate: '2018-11-01T12:20:00.000Z',
        endDate: '2018-11-01T12:20:00.000Z',
        name: "Вклад Восточный",
        status: MoneyCellStatus.ACTIVE,
        parentId: null,
        isValid: true,
        roi: null,
        lastModificationTime: '2018-11-01T12:20:00.000Z',
        creationTime: '2018-11-01T12:20:00.000Z',
        isDeleted: false
    },
    {
        id: '4',
        ownerId: '1',
        moneyCellType: MoneyCellType.CARD,
        amount: -14300,
        startDate: '2018-11-01T12:20:00.000Z',
        endDate: '2018-11-01T12:20:00.000Z',
        name: "Кредитка",
        status: MoneyCellStatus.ACTIVE,
        parentId: null,
        isValid: true,
        roi: null,
        lastModificationTime: '2018-11-01T12:20:00.000Z',
        creationTime: '2018-11-01T12:20:00.000Z',
        isDeleted: false
    }
];