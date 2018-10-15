import React from 'react';
import {List} from 'react-native-elements';
import PeopleListItem from "./peopleListItem/peopleListItem";
import {Text, Alert} from "react-native";

export default class PeopleList extends React.Component {
    render() {
        return (
            <List>
            {
                this.props.people.map((person) => (
                    <PeopleListItem
                        infoContainer={
                            <Text>{person.lastName + ' ' + person.firstName}</Text>
                        }
                        key={person.id}
                        person = {person}
                        onEditPress={()=>Alert.alert(`edit ${person.lastName}`)}
                        onDeletePress={()=>Alert.alert(`delete ${person.lastName}`)}
                        onPress = {() => Alert.alert(`press ${person.lastName}`)}
                    />))
            }
            </List>
        )
    }
}