import React from 'react';
import {TouchableNativeFeedback, View} from 'react-native';
import {Icon} from "react-native-elements";
import Styles from './styles';
import {Avatar} from '../avatar/avatar';
import {Theme} from '../theme';

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
          <TouchableNativeFeedback
              onPress = {onPress}
          >
              <View
                  style = {Styles.container}
              >
                  <Avatar
                      avatar = {avatar}
                      style = {avatarStyle}
                  />
                  <View
                      style={Styles.titleContainer}
                  >
                      {title}
                  </View>
                  <View
                      style={Styles.editContainer}
                  >
                      <Icon
                          name = 'edit'
                          color = {Theme.mainColor}
                          onPress = {onEditPress}
                          reverse
                      />
                      <Icon
                          name = 'delete'
                          color = {Theme.mainColor}
                          onPress = {onDeletePress}
                          reverse
                      />
                  </View>
              </View>
          </TouchableNativeFeedback>
      );
};

