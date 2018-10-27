import React from "react";
import {View, StyleSheet, Alert, Text} from "react-native";
import {Avatar} from "../avatar/avatar";
import Styles from './style';

export const Header = (props) => {
    let {containerStyle, title, status} = props;
    return (
        <View style={StyleSheet.flatten([containerStyle, Styles.headerContainer])} >
            <Avatar
                style = {Styles.avatar}
                avatar = {{name:'menu'}}
                onPress = {() => Alert.alert('open the Menu')}
            />
            <View
                style = {Styles.titleContainer}
            >
                <Text style = {Styles.titleText}>{title}</Text>
            </View>
            <View style = {Styles.statusContainer} >
                {status}
            </View>
        </View>
    );
}