import React from 'react';
import {Button, List} from 'react-native-elements';
import {ListItem} from "../listItem/listItem";
import {Text, Alert, View, ScrollView} from "react-native";
import {Sex} from "../../constants/sex";
import Styles from './style';
import {Theme} from "../theme";

export default class ItemList extends React.Component {
    getAvatar(sex) {
        let name;
        if(sex === Sex.FEMALE){
            name = 'female';
        } else {
            name = 'male';
        }

        return {
            type: 'font-awesome',
            name
        };
    };

    render() {
        return (
            <View
                style = {Styles.container}
            >
                <View
                    style={Styles.listContainer}
                >
                    <ScrollView>
                       {
                            this.props.people.map((person) => (
                                <ListItem
                                    title={
                                        <Text>{person.lastName + ' ' + person.firstName}</Text>
                                    }
                                    key={person.id}
                                    avatar = {this.getAvatar(person.sex)}
                                    onPress={() => Alert.alert(`press ${person.lastName}`)}
                                    onEditPress={() => Alert.alert(`edit ${person.lastName}`)}
                                    onDeletePress={() => Alert.alert(`delete ${person.lastName}`)}
                                />))
                       }
                    </ScrollView>
                </View>
                <View
                    style = {Styles.buttonContainer}
                >
                    <Button
                        icon={
                            {
                                name: 'person',
                                type: 'Octicons'
                            }
                        }
                        title = 'Add new person'
                        backgroundColor = {Theme.buttonColor}
                        onPress={() => Alert.alert(`add new person 1`)}
                    />
                </View>
            </View>
        )
    }
}