import React from 'react';
import {Alert, Text} from "react-native";
import {Theme} from "../../theme";
import {showOkCancelDialog} from "../../../helpers/okCancelDialog";

import {List} from "../list";
import {MoneyCellType} from "../../../constants/moneyCellType";
import {EditMoneyCell} from "../../../store/actions/editMoneyCell";
import {connect} from "react-redux";
import {MarkDeleteMoneyCell} from "../../../store/actions/markDeleteMoneyCell";
import {AddMoneyCell} from "../../../store/actions/addMoneyCell";

const MoneyCellsList = (props) => {
    let {navigation, moneyCells, add, save, people} = props;
    return (
        <List
            avatarFactory = {getAvatar}
            avatarStyle = {Theme.listAvatarStyle}
            titleFactory = {getTitle}
            onItemPress = {onMoneyCellPress(navigation, moneyCells, people)}
            onItemEditPress = {onMoneyCellEditPress(navigation, save)}
            onItemDeletePress = {onMoneyCellDeletePress(props.delete)}
            items = {moneyCells}
            addButtonInfo= {{
                icon: {
                    name: 'credit-card-plus',
                    type: 'material-community'
                },
                title: 'Add new moneyCell',
                onPress: addMoneyCellPress(navigation, add, moneyCells, people)
            }}
        />
    );
};

const addMoneyCellPress = (navigation, add, moneyCells, people) => () => {
    navigation.push('EditMoneyCell', {
        moneyCells,
        people,
        action: (moneyCell) => add(moneyCell)
    });
};

const onMoneyCellPress = (navigation, moneyCells, people) => (moneyCell) => {
    navigation.push('MoneyCell', {moneyCell, moneyCells, people});
};

const onMoneyCellEditPress = (navigation, save) => (moneyCell) => {
    navigation.push('EditMoneyCell', {
        moneyCell,
        action: (newMoneyCell) => save(newMoneyCell)
    });
};

const onMoneyCellDeletePress = (deleteAction) => (moneyCell) => {
    showOkCancelDialog(
        'Deleting money cell',
        `You want to delete a money cell '${moneyCell.name}'. Are you sure?`,
        () => deleteAction(moneyCell),
        'Delete',
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

const getAvatar = (moneyCell) => {
    let name;
    switch (moneyCell.moneyCellType){
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

const mapStateToProps = state => ({
    people: state.people.filter(e => !e.isDeleted),
});

const mapDispatchToProps = dispatch => {
    return {
        add: (moneyCell) => {
            dispatch(AddMoneyCell(moneyCell.ownerId, moneyCell.moneyCellType, moneyCell.name, moneyCell.status, moneyCell.amount, moneyCell.isValid, moneyCell.startDate,
                moneyCell.endDate, moneyCell.roi, moneyCell.parentId))
        },
        save: (moneyCell) => {
            dispatch(EditMoneyCell(moneyCell.id, moneyCell.name, moneyCell.status))
        },
        delete: (moneyCell) => {
            dispatch(MarkDeleteMoneyCell(moneyCell.id))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MoneyCellsList)
