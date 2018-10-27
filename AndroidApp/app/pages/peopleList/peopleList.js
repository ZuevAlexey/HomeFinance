import React from 'react';
import {ItemList} from "../../components/list/itemList";
import {Sex} from "../../constants/sex";
import Styles from "./style";
import {Alert, Text} from "react-native";

export default class PeopleList extends React.Component {

  render() {
    return (
        <ItemList
            avatarFactory = {getAvatar}
            avatarStyle = {Styles.avatar}
            titleFactory = {getTitle}
            onItemPress = {onPersonPress}
            onItemEditPress = {onPersonEditPress}
            onItemDeletePress = {onPersonDeletePress}
            addItemPress = {addPersonPress}
            items = {people}
        />
    );
  }
}

const addPersonPress = () => {
    Alert.alert(`add new person`)
};

const onPersonPress = (person) => {
    Alert.alert(`press ${person.lastName}`)
};

const onPersonEditPress = (person) => {
    Alert.alert(`edit ${person.lastName}`)
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