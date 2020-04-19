import Styles from './style';
import {StyleSheet, View} from 'react-native';
import React from 'react';
import Theme from '../theme';
import {Ionicons} from "@expo/vector-icons";

export const Avatar = (props) => {
    let {
        style,
        avatar,
        onPress
    } = props;
    return (

        <View
            style={StyleSheet.flatten([Styles.avatarContainer, style])}
            onPress={onPress}
        >
            <Ionicons name={avatar.name} size={Theme.itemListAvatarIconSize} color={Theme.mainColor} />

        </View>
    );
};