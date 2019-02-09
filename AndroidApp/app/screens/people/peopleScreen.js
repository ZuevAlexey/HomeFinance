import React from 'react';
import {List} from '../../components/list/list';
import {Text} from 'react-native';
import {Theme} from '../../components/theme';
import {Screen} from '../../components/screen/screen';
import {showOkCancelDialog} from '../../helpers/dialog';
import {Sex} from '../../constants/sex';
import {connect} from 'react-redux';
import {AddPerson} from '../../store/actions/addPerson';
import {EditPerson} from '../../store/actions/editPerson';
import {MarkDeletePerson} from '../../store/actions/markDeletePerson';

import {GetFullPersonName} from "../../helpers/displayStringHelper";
import {getStatusFromSummary} from "../../helpers/statusHelper";
import {getMoneyCellsSummary} from "../../helpers/calculator";

const PeopleScreen = (props) => {
    let {navigation, summary} = props;
    return (
        <Screen
            {...props}
            headerTitle = 'People'
            headerStatus = {getStatusFromSummary(summary)}
        >
            <List
                avatarFactory = {getAvatar}
                avatarStyle = {Theme.listAvatarStyle}
                titleFactory = {getTitle}
                onItemPress = {onPersonPress(navigation)}
                onItemEditPress = {onPersonEditPress(navigation, props.save)}
                onItemDeletePress = {onPersonDeletePress(navigation, props.delete)}
                items = {props.people}
                addButtonInfo= {{
                    icon: {
                        name: 'md-person-add',
                        type: 'ionicon'
                    },
                    title: 'Add new person',
                    onPress: addPersonPress(navigation, props.add)
                }}
            />
        </Screen>
    );
};

const addPersonPress = (navigation, add) => () => {
    navigation.push('EditPerson', {
        action: (newPerson) => add(newPerson)
    })
};

const onPersonPress = (navigation) => (person) => {
    navigation.push('Person', {person})
};

const onPersonEditPress = (navigation, save) => person => {
    navigation.push('EditPerson', {
        person,
        action: (newPerson) => {
            save(newPerson);
        }
    })
};

const onPersonDeletePress = (navigation, deleteAction) => (person) => {
    let displayName = GetFullPersonName(person);
    showOkCancelDialog(
        'Deleting person',
        `You want to delete a person '${displayName}'. Are you sure?`,
        () => deleteAction(person),
        'Yes, I do',
    );
};

const getTitle = (person) => {
    return (
        <Text>{GetFullPersonName(person)}</Text>
    );
};

const getAvatar = (person) => {
    let name;
    if(person.sex === Sex.FEMALE){
        name = 'female';
    } else {
        name = 'male';
    }

    return {
        type: 'font-awesome',
        name
    };
};

const mapStateToProps = state => {
    return {
        people: state.people.filter(e => !e.isDeleted),
        summary: getMoneyCellsSummary(state.moneyCells.filter(e => !e.isDeleted))
    }
};

const mapDispatchToProps = dispatch => {
    return {
        add: (person) => {
            dispatch(AddPerson(person.lastName, person.firstName, person.sex))
        },
        save: (person) => {
            dispatch(EditPerson(person.id, person.lastName, person.firstName, person.sex))
        },
        delete: (person) => {
            dispatch(MarkDeletePerson(person.id))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PeopleScreen)