import React from 'react';
import {Screen} from '../../components/screen/screen';
import {Sex} from '../../constants/sex';
import {EditForm} from '../../components/editForm/editForm';
import {isNullOrUndefined} from '../../helpers/maybe';
import {connect} from 'react-redux';

let t = require('tcomb-form-native');

class EditPersonScreen extends React.Component {
    constructor(props) {
        super(props);
        let {personId} = this.props.navigation.state.params;
        let isNew = isNullOrUndefined(personId);

        let defaultValue;
        if (isNew) {
            defaultValue = null;
        } else {
            let person = props.gerPerson(personId);
            defaultValue = {
                id: person.id,
                firstName: person.firstName,
                lastName: person.lastName,
                sex: person.sex
            };
        }

        this.state = {value: defaultValue};
    }

    render() {
        let {personId, action} = this.props.navigation.state.params;
        let isNew = isNullOrUndefined(personId);
        let headerTitle;
        if (isNew) {
            headerTitle = 'Add New Person';
        } else {
            let person = this.props.gerPerson(personId);
            headerTitle = `${person.lastName} ${person.firstName}`;
        }

        return (
            <Screen
                {...this.props}
                headerTitle={headerTitle}
            >
                <EditForm
                    type={Person}
                    options={options}
                    startValue={this.state.value}
                    action={action}
                />
            </Screen>
        );
    }
}

let Person = t.struct({
    id: t.maybe(t.String),
    lastName: t.String,
    firstName: t.String,
    sex: t.enums({
        [Sex.MALE]: 'MALE',
        [Sex.FEMALE]: 'FEMALE'
    }, 'Sex')
});

let options = {
    fields: {
        id: {
            hidden: true
        },
        firstName: {
            label: 'First name',
            placeholder: 'Enter first name'
        },
        lastName: {
            label: 'Last name',
            placeholder: 'Enter last name'
        },
        sex: {
            label: 'Sex',
            placeholder: 'Enter sex'
        }
    }
};

const mapStateToProps = (state) => {
    return {
        gerPerson: (personId) => state.main.people.first(e => e.id === personId)
    };
};

export default connect(mapStateToProps, null)(EditPersonScreen)