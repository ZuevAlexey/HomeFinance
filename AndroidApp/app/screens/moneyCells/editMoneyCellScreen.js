import React from 'react';
import {Screen} from '../../components/screen/screen';
import {MoneyCellType} from '../../constants/moneyCellType';
import {getEnumsFromList, getEnumsFromObject} from '../../helpers/getEnums';
import {MoneyCellStatus} from '../../constants/moneyCellStatus';
import {EditForm} from '../../components/editForm/editForm';
import {GetDropdownMoneyCellInfo, GetFullPersonName} from '../../helpers/displayStringHelper';
import {connect} from 'react-redux';
import {isNullOrUndefined} from '../../helpers/maybe';
import {getMoneyCellsComparer, peopleComparer} from '../../helpers/sorter';

let t = require('tcomb-form-native');

class EditMoneyCellScreen extends React.Component {
    constructor(props){
        super(props);
        this.getType = this.getType.bind(this);
        let {moneyCellId, ownerId} = this.props.navigation.state.params;
        let isNew = isNullOrUndefined(moneyCellId);

        let defaultValue;
        if(isNew){
            defaultValue = {
                status: MoneyCellStatus.ACTIVE,
                    startDate: new Date(),
                ownerId: ownerId
            };
            if(!isNullOrUndefined(ownerId)){
                defaultValue['ownerId'] = ownerId;
            }
        } else {
            let moneyCell = props.moneyCells.first(e => e.id === moneyCellId);
            defaultValue = {
                id: moneyCell.id,
                owner: GetFullPersonName(props.people.first(e => e.id === moneyCell.ownerId)),
                name: moneyCell.name,
                status: moneyCell.status,
            }
        }

        this.state = {value: defaultValue, isNew };
    }

    getType() {
        let options = {
            id: t.maybe(t.String),
            name: t.String,
            status: getEnumsFromObject(MoneyCellStatus, 'MoneyCellStatus'),
        };

        if(this.state.isNew) {
            options['ownerId'] = getEnumsFromList(this.props.people, p => p.id, p => GetFullPersonName(p), 'People', null, peopleComparer);
            options['moneyCellType'] = getEnumsFromObject(MoneyCellType, 'MoneyCellType');
            options['amount'] = t.maybe(t.Number);
            options['parentId'] = t.maybe(getEnumsFromList(this.props.moneyCells, mc => mc.id, mc => GetDropdownMoneyCellInfo(this.props.people.first(e => e.id === mc.ownerId), mc), 'MoneyCells', null, getMoneyCellsComparer(this.props.people)));
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
    people: state.main.people.filter(e => !e.isDeleted),
    moneyCells: state.main.moneyCells.filter(e => !e.isDeleted),
});

export default connect(mapStateToProps, undefined)(EditMoneyCellScreen);