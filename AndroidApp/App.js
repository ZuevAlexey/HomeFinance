import React from 'react';
import {Text, View} from "react-native";
import {StatusBar} from "react-native";
import {Header} from "./app/components/header/header";
import {Theme} from "./app/components/theme";
import PeopleList from "./app/pages/peopleList/peopleList";

export default class App extends React.Component {
  render() {
    return (
        <View style={{flex:1}}>
            <View style = {
                {
                    height:StatusBar.currentHeight,
                    backgroundColor: Theme.statusBarColor
                }
            }>
                <StatusBar
                    barStyle='light-content'
                />
            </View>
            <Header
                containerStyle = {
                    {
                        flex:1,
                        borderWidth:1,
                        borderColor: Theme.borderColor,
                        borderLeftColor: Theme.noBorderColor,
                        borderRightColor: Theme.noBorderColor,
                        borderBottomColor: Theme.noBorderColor
                }}
                title = 'People'
                status = {<Text style = {
                    {
                    textAlign: 'center',
                    fontSize: 30,
                    color: Theme.goodColor
                    }}
                >+400$</Text>}
            />
            <View style = {{flex:10}}>
                <PeopleList />
            </View>
        </View>
    );
  }
}