import React from 'react';
import {StyleSheet, TouchableNativeFeedback, View} from 'react-native';
import {Icon} from 'react-native-elements';
import Styles from './styles';
import {Avatar} from '../avatar/avatar';
import Theme from '../theme';

export const ListItem = (props) => {
    let {
        avatar,
        avatarStyle,
        title,
        onPress,
        onEditPress
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
                    <Icon
                        name='edit'
                        color={Theme.mainColor}
                        onPress={onEditPress}
                        reverse
                        size={Theme.listItemButtonSize}
                    />
                </View>
            </View>
        </TouchableNativeFeedback>
    );
};

