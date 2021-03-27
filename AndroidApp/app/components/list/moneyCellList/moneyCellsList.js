import React from 'react';
import {debugObjectAsync, showMessageAsync, showOkCancelDialogAsync} from '../../../helpers/dialog';
import List from '../list';
import Theme from '../../theme';
import {MoneyCellType} from '../../../constants/moneyCellType';
import {EditMoneyCell} from '../../../store/actions/editMoneyCell';
import {connect} from 'react-redux';
import {MarkDeleteMoneyCell} from '../../../store/actions/markDeleteMoneyCell';
import {AddMoneyCell} from '../../../store/actions/addMoneyCell';
import {getMoneyCellsComparer} from '../../../helpers/sorter';
import {getSimpleTitle} from "../../../helpers/moneyCellsHelper";
import { Ionicons } from '@expo/vector-icons';
import {DIALOG_RESULT_CANCEL} from "../../../constants/dialogResult";
import {STOP_NAVIGATION} from "../../../constants/navigationSign";

const MoneyCellsList = (props) => {
    let {navigation, moneyCells, add, save, getTitle, people, ownerId} = props;
    return (
        <List
            avatarFactory={getAvatar}
            titleFactory={getTitle || getSimpleTitle()}
            onItemPress={onMoneyCellPress(navigation)}
            onItemEditPress={onMoneyCellEditPress(navigation, save, props.delete)}
            items={moneyCells}
            comparer={getMoneyCellsComparer(people)}
            addButtonInfo={{
                icon: <Ionicons name="md-add-circle-outline" size={Theme.mainButtonIconSize} color={Theme.buttonIconColor} />,
                title: 'Add new moneyCell',
                onPress: addMoneyCellPress(navigation, add, ownerId)
            }}
        />
    );
};

const addMoneyCellPress = (navigation, add, ownerId) => () => {
    navigation.push('EditMoneyCell', {
        saveAction: async (moneyCell) => add(moneyCell),
        ownerId: ownerId
    });
};

const onMoneyCellPress = (navigation) => (moneyCell) => {
    navigation.push('MoneyCell', {moneyCellId: moneyCell.id});
};

const onMoneyCellEditPress = (navigation, save, deleteAction) => (moneyCell) => {
    let oldMoneyCell = {
        amount: moneyCell.amount,
        moneyCellType: moneyCell.moneyCellType,
    };
    navigation.push('EditMoneyCell', {
        moneyCellId: moneyCell.id,
        saveAction: async (newMoneyCell) => save(newMoneyCell, oldMoneyCell),
        deleteAction: async (moneyCellToDelete) => {
            if (oldMoneyCell.amount > 0) {
                await showMessageAsync('Error during money cell deletion', 'Money cell with positive amount can\'t be deleted. Current amount is ' + oldMoneyCell.amount)
                return STOP_NAVIGATION;
            }

            let dialogResult = await showOkCancelDialogAsync(
                'Deleting money cell',
                `You want to delete a money cell '${moneyCellToDelete.name}'. Are you sure?`,
                'Yes, I do',
            );

            if (dialogResult === DIALOG_RESULT_CANCEL) {
                return STOP_NAVIGATION;
            }

            deleteAction(moneyCellToDelete)
        }
    });
};

const getAvatar = (moneyCell) => {
    let name;
    switch (moneyCell.moneyCellType) {
        case MoneyCellType.CARD: {
            name = 'md-card';
            break;
        }
        case MoneyCellType.CASH: {
            name = 'md-cash';
            break;
        }
        case MoneyCellType.DEPOSIT: {
            name = 'md-business';
            break;
        }
        case MoneyCellType.BROKER: {
            name = 'md-analytics';
            break;
        }
    }

    return {
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