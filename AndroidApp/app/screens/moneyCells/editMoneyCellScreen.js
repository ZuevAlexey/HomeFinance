import React from 'react';
import {Screen} from "../../components/screen/screen";
import {MoneyCellType} from '../../constants/moneyCellType';
import {getEnumsFromList, getEnumsFromObject} from '../../helpers/getEnums';
import {MoneyCellStatus} from "../../constants/moneyCellStatus";
import {EditForm} from "../../components/editForm/editForm";
import {GetFullPersonName} from "../../helpers/displayStringHelper";

let t = require('tcomb-form-native');

export default class EditMoneyCellScreen extends React.Component {
    constructor(props){
        super(props);
        this.getType = this.getType.bind(this);
        let {moneyCell} = this.props.navigation.state.params;
        var isNew = moneyCell === undefined;
        let defaultValue = isNew
            ? {
                status: MoneyCellStatus.ACTIVE,
                startDate: new Date(),
                amount: 0
            }
            : {
                id: moneyCell.id,
                ownerId: moneyCell.ownerId,
                moneyCellType: moneyCell.moneyCellType,
                amount: moneyCell.amount,
                startDate: moneyCell.startDate && new Date(moneyCell.startDate),
                endDate: moneyCell.endDate && new Date(moneyCell.endDate),
                name: moneyCell.name,
                status: moneyCell.status,
                parentId: moneyCell.parentId
            };

        this.state = {value: defaultValue, isNew };
    }

    getType() {
        let options = {
            id: t.maybe(t.String),
            name: t.String,
            status: getEnumsFromObject(MoneyCellStatus, 'MoneyCellStatus'),
        };

        if(this.state.isNew){
            options['ownerId'] = getEnumsFromList(this.props.navigation.state.params.people, p => p.id, p => GetFullPersonName(p), 'People');
            options['moneyCellType'] = getEnumsFromObject(MoneyCellType, 'MoneyCellType');
            options['amount'] = t.maybe(t.Number);
            options['parentId'] = t.maybe(getEnumsFromList(this.props.navigation.state.params.moneyCells, mc => mc.id, mc => mc.name, 'MoneyCells'));
            options['startDate'] = t.maybe(t.Date);
            options['endDate'] = t.maybe(t.Date);
        }

        return t.struct(options);
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
                    alertData = {{title: 'MoneyCell editing'}}
                />
            </Screen>
        );
    }
};

const options = (isNew) => {
    let result = {
        fields: {
            id: {
                hidden: true,
            },
            name: {
                label: 'Name',
                placeholder: 'Enter money cell name'
            },
            status: {
                label: 'Status'
            },
        }
    };

    if(isNew){
        result.fields['ownerId'] = {label: 'Owner'};
        result.fields['moneyCellType'] = {label: 'Type'};
        result.fields['amount'] = {label: 'Amount', placeholder: 'Enter current money cell\'s amount'};
        result.fields['parentId'] = {label: 'Parent money cell'};
        result.fields['startDate'] = {label: 'Start date',mode: 'date',config: {format: date => date.toLocaleDateString('ru-Ru')}};
        result.fields['endDate'] = {label: 'End date',mode: 'date',config: {format: date => date.toLocaleDateString('ru-Ru')}};
    }

    return result;
};