import React from 'react';
import {Screen} from "../../components/screen/screen";
let t = require('tcomb-form-native');
import {Sex} from '../../constants/sex';
import {EditForm} from "../../components/editForm/editForm";

export default class EditPersonScreen extends React.Component {
    constructor(props){
        super(props);
        let {person} = this.props.navigation.state.params;
        let defaultValue = person === undefined
            ? null
            : {
                firstName: person.firstName,
                lastName: person.lastName,
                sex: person.sex
            };

        this.state = {value: defaultValue};
    }

    render() {
        let {person, action} = this.props.navigation.state.params;
        let headerTitle = person === undefined ? 'Add New Person' : `${person.lastName} ${person.firstName}`;
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
};

let Person = t.struct({
    lastName: t.String,
    firstName: t.String,
    sex: t.enums({
        [Sex.MALE]: 'MALE',
        [Sex.FEMALE]: 'FEMALE'
    }, 'Sex')
});

let options = {
    fields:{
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