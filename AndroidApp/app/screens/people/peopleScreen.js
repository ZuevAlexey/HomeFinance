import React from 'react';
import {List} from "../../components/list/list";
import {Sex} from "../../constants/sex";
import {Alert, Text} from "react-native";
import {Theme} from "../../components/theme";
import {Screen} from "../../components/screen/screen";

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
                onItemDeletePress = {onPersonDeletePress}
                items = {people}
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
    navigation.push('AddNew')
};

const onPersonPress = navigation => (person) => {
    navigation.push('Person', {person : person})
};

const onPersonEditPress = navigation => person => {
    navigation.push('Edit', {person : person})
};

const onPersonDeletePress = (person) => {
    Alert.alert(`delete ${person.lastName}`)
};

const getTitle = (person) => {
    return (
        <Text>{person.lastName + ' ' + person.firstName}</Text>
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

let people = [
    {
        id:'1',
        lastName: 'Зуев',
        firstName: 'Алексей',
        sex: Sex.MALE
    },
    {
        id:'2',
        lastName: 'Зуева',
        firstName: 'Наталья',
        sex: Sex.FEMALE
    },
    {
        id:'3',
        lastName: 'Зуев',
        firstName: 'Алексей',
        sex: Sex.MALE
    },
    {
        id:'4',
        lastName: 'Зуева',
        firstName: 'Наталья',
        sex: Sex.FEMALE
    },
    {
        id:'5',
        lastName: 'Зуев',
        firstName: 'Алексей',
        sex: Sex.MALE
    },
    {
        id:'6',
        lastName: 'Зуева',
        firstName: 'Наталья',
        sex: Sex.FEMALE
    },
    {
        id:'7',
        lastName: 'Зуев',
        firstName: 'Алексей',
        sex: Sex.MALE
    },
    {
        id:'8',
        lastName: 'Зуева',
        firstName: 'Наталья',
        sex: Sex.FEMALE
    },
    {
        id:'9',
        lastName: 'Зуев',
        firstName: 'Алексей',
        sex: Sex.MALE
    },
    {
        id:'10',
        lastName: 'Зуева',
        firstName: 'Наталья',
        sex: Sex.FEMALE
    },
    {
        id:'11',
        lastName: 'Зуев',
        firstName: 'Алексей',
        sex: Sex.MALE
    },
    {
        id:'12',
        lastName: 'Зуева',
        firstName: 'Наталья',
        sex: Sex.FEMALE
    }
];