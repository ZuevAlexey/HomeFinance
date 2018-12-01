import React from 'react';
import {List} from '../../components/list/list';
import {Text} from 'react-native';
import {Theme} from '../../components/theme';
import {Screen} from '../../components/screen/screen';
import {showOkCancelDialog} from '../../helpers/okCancelDialog';
import {Sex} from '../../constants/sex';
import {connect} from 'react-redux';
import {AddPerson} from '../../store/actions/addPerson';
import {EditPerson} from '../../store/actions/editPerson';
import {MarkDeletePerson} from '../../store/actions/markDeletePerson';

import {GetFullName} from "../../helpers/peopleHelper";

const PeopleScreen = (props) => {
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
            navigation.goBack();
        }
    })
};

const onPersonDeletePress = (navigation, deleteAction) => (person) => {
    let displayName = GetFullName(person);
    showOkCancelDialog(
        'Deleting person',
        `You want to delete a person '${displayName}'. Are you sure?`,
        'Delete',
        'Cancel',
        () => deleteAction(person)
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

const mapStateToProps = state => {
    return {
        people: state.people.filter(e => !e.isDeleted)
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