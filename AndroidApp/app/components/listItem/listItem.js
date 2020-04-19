import React from 'react';
import {StyleSheet, TouchableNativeFeedback, View, TouchableOpacity} from 'react-native';
import Styles from './styles';
import {Avatar} from '../avatar/avatar';
import Theme from '../theme';
import {Ionicons} from "@expo/vector-icons";

export const ListItem = (props) => {
    let {
        avatar,
        avatarStyle,
        title,
        onPress,
        onEditPress,
        onDeletePress
    } = props;
    return (
        <TouchableNativeFeedback onPress={onPress}>
            <View style={Styles.container}>
                <Avatar
                    avatar={avatar}
                    style={StyleSheet.flatten(avatarStyle, Styles.avatarContainer)}
                />
                <View style={Styles.titleContainer}>
                    {title}
                </View>
                <View style={Styles.editContainer}>
                    <TouchableOpacity  style={Theme.roundButtonContainer} onPress={onEditPress}>
                        <Ionicons name="md-create" size={Styles.editDeleteIconSize} color={Theme.buttonIconColor} />
                    </TouchableOpacity >
                    <TouchableOpacity  style={Theme.roundButtonContainer} onPress={onDeletePress}>
                        <Ionicons name="md-trash" size={Styles.editDeleteIconSize} color={Theme.buttonIconColor} />
                    </TouchableOpacity >
                </View>
            </View>
        </TouchableNativeFeedback>
    );
};

