import React from 'react';
import {List} from '../../components/list/list';
import {Sex} from '../../constants/sex';
import {Alert, Text} from 'react-native';
import {Theme} from '../../components/theme';
import {Screen} from '../../components/screen/screen';
import {showOkCancelDialog} from '../../helpers/okCancelDialog';

import state from '../../store/initialState';
import {GetFullName} from "../../helpers/peopleHelper";

export const PeopleScreen = (props) => {
    let {navigation} = props;
    return (
        <Screen
            {...props}
            headerTitle = 'People'
            headerStatus = {<Text style = {
                {
                    textAlign: 'center',
                    fontSize: 30,
                    color: Theme.goodColor
                }}
            >+400$</Text>}
        >
            <List
                avatarFactory = {getAvatar}
                avatarStyle = {Theme.listAvatarStyle}
                titleFactory = {getTitle}
                onItemPress = {onPersonPress(navigation)}
                onItemEditPress = {onPersonEditPress(navigation)}
                onItemDeletePress = {onPersonDeletePress(navigation)}
                items = {state.people}
                addButtonInfo= {{
                    icon: {
                        name: 'md-person-add',
                        type: 'ionicon'
                    },
                    title: 'Add new person',
                    onPress: addPersonPress(navigation)
                }}
            />
        </Screen>
    );
};

const addPersonPress = (navigation) => () => {
    navigation.push('EditPerson', {
        action: (newPerson) => Alert.alert(`Save new ${getDisplayName(newPerson)}`)
    })
};

const onPersonPress = navigation => (person) => {
    navigation.push('Person', {person})
};

const onPersonEditPress = navigation => person => {
    navigation.push('EditPerson', {
        person,
        action: (newPerson) => Alert.alert(`Save ${getDisplayName(newPerson)}`)})
};

const getDisplayName = (person) => `${person.lastName} ${person.firstName}`;

const onPersonDeletePress = (navigation) => (person) => {
    let displayName = getDisplayName(person);
    showOkCancelDialog(
        'Deleting person',
        `You want to delete a person '${displayName}'. Are you sure?`,
        'Delete',
        'Cancel',
        () => Alert.alert(`Delete '${displayName}'`)
    );
};

const getTitle = (person) => {
    return (
        <Text>{GetFullName(person)}</Text>
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