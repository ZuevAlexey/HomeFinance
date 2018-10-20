import Styles from "./style";
import {Icon} from "react-native-elements";
import {View} from "react-native";
import React from "react";

export const Avatar = (props) => {
    let {
        avatar,
        onPress
    } = props;
    return (
        <View
            style = {Styles.avatarContainer}
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