import React from 'react';
import {Screen} from "../../components/screen/screen";
import {MoneyCellType} from '../../constants/moneyCellType';
import {getEnumsFromList, getEnumsFromObject} from '../../helpers/getEnums';
import {MoneyCellStatus} from "../../constants/moneyCellStatus";
import {EditForm} from "../../components/editForm/editForm";
import {GetFullPersonName} from "../../helpers/displayStringHelper";
import {connect} from "react-redux";
import {isNullOrUndefined} from "../../helpers/maybe";

let t = require('tcomb-form-native');

class EditMoneyCellScreen extends React.Component {
    constructor(props){
        super(props);
        this.getType = this.getType.bind(this);
        let {moneyCellId} = this.props.navigation.state.params;
        let isNew = isNullOrUndefined(moneyCellId);

        let moneyCell;
        if(!isNew){
            moneyCell = props.moneyCells.filter(e => e.id === moneyCellId)[0];
        }

        let defaultValue = isNew
            ? {
                status: MoneyCellStatus.ACTIVE,
                startDate: new Date(),
                amount: 0
            }
            : {
                id: moneyCell.id,
                owner: GetFullPersonName(props.people.filter(e => e.id === moneyCell.ownerId)[0]),
                name: moneyCell.name,
                status: moneyCell.status,
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
            options['ownerId'] = getEnumsFromList(this.props.people, p => p.id, p => GetFullPersonName(p), 'People');
            options['moneyCellType'] = getEnumsFromObject(MoneyCellType, 'MoneyCellType');
            options['amount'] = t.maybe(t.Number);
            options['parentId'] = t.maybe(getEnumsFromList(this.props.moneyCells, mc => mc.id, mc => mc.name, 'MoneyCells'));
            options['startDate'] = t.maybe(t.Date);
            options['endDate'] = t.maybe(t.Date);
        } else {
            options['owner'] = t.String;
        }

        return t.struct(options);
    };

    render() {
        let type = this.getType();
        let isNew = this.state.isNew;
        let {action} = this.props.navigation.state.params;
        let moneyCell = this.state.value;
        let headerTitle = isNew ? 'Add new money cell' : moneyCell.name;
        return (
            <Screen
                {...this.props}
                headerTitle={headerTitle}
            >
                <EditForm
                    type={type}
                    options={getOptions(isNew)}
                    startValue={moneyCell}
                    action={action}
                    alertData = {{title: 'MoneyCell editing'}}
                />
            </Screen>
        );
    }
}

const getOptions = (isNew) => {
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
            }
        }
    };

    if(isNew){
        result.fields['ownerId'] = {label: 'Owner'};
        result.fields['moneyCellType'] = {label: 'Type'};
        result.fields['amount'] = {label: 'Amount', placeholder: 'Enter current money cell\'s amount'};
        result.fields['parentId'] = {label: 'Parent money cell'};
        result.fields['startDate'] = {label: 'Start date',mode: 'date',config: {format: date => date.toLocaleDateString('ru-Ru')}};
        result.fields['endDate'] = {label: 'End date',mode: 'date',config: {format: date => date.toLocaleDateString('ru-Ru')}};
    } else {
        result.fields['owner'] = {label: 'Owner', editable: false};
    }

    return result;
};

const mapStateToProps = (state) => ({
    people: state.people.filter(e => !e.isDeleted),
    moneyCells: state.moneyCells.filter(e => !e.isDeleted),
});

export default connect(mapStateToProps, undefined)(EditMoneyCellScreen);