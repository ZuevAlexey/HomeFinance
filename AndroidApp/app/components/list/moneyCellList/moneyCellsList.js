import React from 'react';
import {showOkCancelDialog} from '../../../helpers/dialog';
import List from '../list';
import Theme from '../../theme';
import {MoneyCellType} from '../../../constants/moneyCellType';
import {EditMoneyCell} from '../../../store/actions/editMoneyCell';
import {connect} from 'react-redux';
import {MarkDeleteMoneyCell} from '../../../store/actions/markDeleteMoneyCell';
import {AddMoneyCell} from '../../../store/actions/addMoneyCell';
import {getMoneyCellsComparer} from '../../../helpers/sorter';
import {getSimpleTitle} from "../../../helpers/moneyCellsHelper";

const MoneyCellsList = (props) => {
    let {navigation, moneyCells, add, save, getTitle, people, ownerId} = props;
    return (
        <List
            avatarFactory = {getAvatar}
            titleFactory = {getTitle || getSimpleTitle()}
            onItemPress = {onMoneyCellPress(navigation)}
            onItemEditPress = {onMoneyCellEditPress(navigation, save)}
            onItemDeletePress = {onMoneyCellDeletePress(props.delete)}
            items = {moneyCells}
            comparer = {getMoneyCellsComparer(people)}
            addButtonInfo= {{
                icon: {
                    name: 'credit-card-plus',
                    type: 'material-community',
                    color: Theme.buttonIconColor
                },
                title: 'Add new moneyCell',
                onPress: addMoneyCellPress(navigation, add, ownerId)
            }}
        />
    );
};

const addMoneyCellPress = (navigation, add, ownerId) => () => {
    navigation.push('EditMoneyCell', {
        action: (moneyCell) => add(moneyCell),
        ownerId: ownerId
    });
};

const onMoneyCellPress = (navigation) => (moneyCell) => {
    navigation.push('MoneyCell', {moneyCellId: moneyCell.id});
};

const onMoneyCellEditPress = (navigation, save) => (moneyCell) => {
    let oldMoneyCell = {
        amount: moneyCell.amount,
        moneyCellType: moneyCell.moneyCellType,
    };
    navigation.push('EditMoneyCell', {
        moneyCellId: moneyCell.id,
        action: (newMoneyCell) => save(newMoneyCell, oldMoneyCell)
    });
};

const onMoneyCellDeletePress = (deleteAction) => (moneyCell) => {
    showOkCancelDialog(
        'Deleting money cell',
        `You want to delete a money cell '${moneyCell.name}'. Are you sure?`,
        () => deleteAction(moneyCell),
        'Yes, I do',
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
            break;
        }
        case MoneyCellType.BROKER:{
            name = 'finance'
            break;
        }
    }

    return {
        type: 'material-community',
        name
    };
};

const mapStateToProps = state => {
    return {
        people: state.main.people
    }
};

const mapDispatchToProps = dispatch => {
    return {
        add: (moneyCell) => {
            dispatch(AddMoneyCell(moneyCell.ownerId, moneyCell.moneyCellType, moneyCell.name, moneyCell.status, moneyCell.amount, moneyCell.isValid, moneyCell.startDate,
                moneyCell.endDate, moneyCell.roi, moneyCell.parentId))
        },
        save: (newMoneyCell, oldMoneyCell) => {
            dispatch(EditMoneyCell(newMoneyCell.id, newMoneyCell.name, newMoneyCell.status, newMoneyCell.amount, oldMoneyCell.amount, oldMoneyCell.moneyCellType))
        },
        delete: (moneyCell) => {
            dispatch(MarkDeleteMoneyCell(moneyCell.id))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MoneyCellsList);