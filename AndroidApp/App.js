import React from 'react';
import PeopleList from "./app/components/peopleList";
import {View} from "react-native";
import {Sex} from "./app/constants/sex";

let people = [
    {
        id:'1',
        lastName: 'Зуев',
        firstName: 'Алексей',
        sex:Sex.MALE
    },
    {
        id:'2',
        lastName: 'Зуева',
        firstName: 'Наталья',
        sex:Sex.FEMALE
    }
];

export default class App extends React.Component {
  render() {
    return (
        <View>
          <PeopleList people={people}/>
        </View>
    );
  }
}