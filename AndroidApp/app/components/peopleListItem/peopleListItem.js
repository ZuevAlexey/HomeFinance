import React from 'react';
import {View, Text} from 'react-native';
import {Sex} from "../../constants/sex";
import {Icon, ListItem} from "react-native-elements";
import Styles from './styles';

export default class PeopleListItem extends React.Component {
  render() {
      let person = this.props.person;
      return (
          <ListItem
              containerStyle = {Styles.listItemContainer}
              avatar={getAvatarForPerson(person)}
              title={
                  <View style={Styles.titleContainer}>
                      {this.props.infoContainer !== undefined &&
                          <View style={Styles.listItemTitleInfoContainer}>
                              {this.props.infoContainer}
                          </View>
                      }
                      <View style={Styles.listItemEditIconContainer}>
                          <Icon
                              name = 'edit'
                              color = 'teal'
                              onPress = {this.props.onEditPress}
                              reverse
                          />
                          <Icon
                              name = 'delete'
                              color = 'teal'
                              onPress = {this.props.onDeletePress}
                              reverse
                          />
                      </View>
                  </View>
              }
              onPress = {this.props.onPress}
              hideChevron={true}
          />
      );
  }
}

const getAvatarForPerson = (person) => {
    switch (person.sex){
        case Sex.MALE:{
            return require('../../content/images/male.png');
        }
        case Sex.FEMALE:{
            return require('../../content/images/female.png');
        }
    }
};