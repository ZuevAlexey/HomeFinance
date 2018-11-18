import React from 'react';
import {Screen} from "../../components/screen/screen";
import {MoneyCellType} from '../../constants/moneyCellType';
import state from '../../store/initialState';
import {getEnumsFromList, getEnumsFromObject} from '../../helpers/getEnums';
import {MoneyCellStatus} from "../../constants/moneyCellStatus";
import {EditForm} from "../../components/editForm/editForm";

let t = require('tcomb-form-native');

export default class EditMoneyCellScreen extends React.Component {
    constructor(props){
        super(props);
        this.getType = this.getType.bind(this);
        let {moneyCell} = this.props.navigation.state.params;
        let defaultValue = moneyCell === undefined
            ? {
                status: MoneyCellStatus.ACTIVE,
                startDate: new Date(),
                status: MoneyCellStatus.ACTIVE
            }
            : {
                ownerId: moneyCell.ownerId,
                moneyCellType: moneyCell.moneyCellType,
                amount: moneyCell.amount,
                startDate: moneyCell.startDate && new Date(moneyCell.startDate),
                endDate: moneyCell.endDate && new Date(moneyCell.endDate),
                name: moneyCell.name,
                status: moneyCell.status,
                parentId: moneyCell.parentId
            };

        this.state = {value: defaultValue};
    }

    getType = () => {
        return t.struct({
            ownerId: getEnumsFromList(state.people, p => p.id, p => `${p.lastName} ${p.firstName}`, 'People'),
            moneyCellType: getEnumsFromObject(MoneyCellType, 'MoneyCellType'),
            amount: t.maybe(t.Number),
            name: t.String,
            status: getEnumsFromObject(MoneyCellStatus, 'MoneyCellStatus'),
            parentId: t.maybe(getEnumsFromList(state.moneyCells, mc => mc.id, mc => mc.name, 'MoneyCells')),
            startDate: t.maybe(t.Date),
            endDate: t.maybe(t.Date)
        });
    };

    render() {
        let type = this.getType();
        let {moneyCell, action} = this.props.navigation.state.params;
        let headerTitle = moneyCell === undefined ? 'Add new money cell' : moneyCell.name;
        return (
            <Screen
                {...this.props}
                headerTitle={headerTitle}
            >
                <EditForm
                    type={type}
                    options={options}
                    startValue={this.state.value}
                    action={action}
                />
            </Screen>
        );
    }
};

const options = {
    fields: {
        ownerId: {
            label: 'Owner'
        },
        moneyCellType: {
            label: 'Type'
        },
        amount: {
            label: 'Amount',
            placeholder: 'Enter current money cell\'s amount'
        },
        name: {
            label: 'Name',
            placeholder: 'Enter money cell name'
        },
        status: {
            label: 'Status'
        },
        parentId: {
            label: 'Parent money cell'
        },
        startDate: {
            label: 'Start date',
            mode: 'date',
            config: {
                format: date => date.toLocaleDateString('ru-Ru')
            }
        },
        endDate: {
            label: 'End date',
            mode: 'date',
            config: {
                format: date => date.toLocaleDateString('ru-Ru')
            }
        }
    }
};