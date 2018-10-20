import React from 'react';
import List from "./app/components/list/itemList";
import {View} from "react-native";
import {Sex} from "./app/constants/sex";
import {StatusBar} from "react-native";

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

export default class App extends React.Component {
  render() {
    return (
        <View style={{flex:1}}>
            <View style = {{height:StatusBar.currentHeight, backgroundColor: 'teal'}}>
                <StatusBar
                    barStyle='light-content'
                />
            </View>
            <View style = {{flex:1,backgroundColor:'red'}}>
            </View>
            <View style = {{flex:10}}>
                <List people={people}/>
            </View>
        </View>
    );
  }
}