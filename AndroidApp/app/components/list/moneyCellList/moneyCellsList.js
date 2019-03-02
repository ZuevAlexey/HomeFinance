import React from 'react';
import {Text} from 'react-native';
import {Theme} from '../../theme';
import {showOkCancelDialog} from '../../../helpers/dialog';

import {List} from '../list';
import {MoneyCellType} from '../../../constants/moneyCellType';
import {EditMoneyCell} from '../../../store/actions/editMoneyCell';
import {connect} from 'react-redux';
import {MarkDeleteMoneyCell} from '../../../store/actions/markDeleteMoneyCell';
import {AddMoneyCell} from '../../../store/actions/addMoneyCell';
import {isNullOrUndefined} from '../../../helpers/maybe';
import {GetShortPersonName} from '../../../helpers/displayStringHelper';
import {getMoneyCellsComparer} from '../../../helpers/sorter';

const MoneyCellsList = (props) => {
    let {navigation, moneyCells, add, save, getTitle, people, ownerId} = props;
    return (
        <List
            avatarFactory = {getAvatar}
            avatarStyle = {Theme.listAvatarStyle}
            titleFactory = {getTitle || getSimpleTitle()}
            onItemPress = {onMoneyCellPress(navigation)}
            onItemEditPress = {onMoneyCellEditPress(navigation, save)}
            onItemDeletePress = {onMoneyCellDeletePress(props.delete)}
            items = {moneyCells}
            comparer = {getMoneyCellsComparer(people)}
            addButtonInfo= {{
                icon: {
                    name: 'credit-card-plus',
                    type: 'material-community'
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
    navigation.push('EditMoneyCell', {
        moneyCellId: moneyCell.id,
        action: (newMoneyCell) => save(newMoneyCell)
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
        }
    }

    return {
        type: 'material-community',
        name
    };
};

const mapStateToProps = state => {
    return {
        people: state.people
    }
};

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

export default connect(mapStateToProps, mapDispatchToProps)(MoneyCellsList);

export const getTitleWithOwner = (people) => (moneyCell) => {
    let owner = null;
    if(!isNullOrUndefined(people)){
        owner = people.filter(e => e.id === moneyCell.ownerId)[0];
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
