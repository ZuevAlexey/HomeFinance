import Styles from "./style";
import {Icon} from "react-native-elements";
import {StyleSheet, View} from "react-native";
import React from "react";

export const Avatar = (props) => {
    let {
        style,
        avatar,
        onPress
    } = props;
    return (

        <View
            style = {StyleSheet.flatten([Styles.avatarContainer, style])}
            onPress = {onPress}
            >
            <Icon
                color = 'teal'
                size = {35}
                {...avatar}
                onPress = {onPress}
            />
        </View>
    );
}