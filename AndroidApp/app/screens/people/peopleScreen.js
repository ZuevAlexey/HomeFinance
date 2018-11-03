import React from 'react';
import {List} from "../../components/list/list";
import {Sex} from "../../constants/sex";
import {Alert, Text} from "react-native";
import {Theme} from "../../components/theme";
import {Screen} from "../../components/screen/screen";

class PeopleScreen extends React.Component {
  render() {
    let {navigation} = this.props;
    return (
        <Screen
            {...this.props}
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
                onItemEditPress = {onPersonEditPress}
                onItemDeletePress = {onPersonDeletePress}
                items = {people}
                addButtonInfo= {{
                    icon: {
                        name: 'md-person-add',
                        type: 'ionicon'
                    },
                    title: 'Add new person',
                    onPress: addPersonPress()
                }}
            />
        </Screen>
    );
  }
}

const addPersonPress = () => () => {
    Alert.alert(`add new person`)
};

const onPersonPress = navigation => (person) => {
    navigation.push('Person', {person : person})
};

const onPersonEditPress = person => {
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

export default PeopleScreen;

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