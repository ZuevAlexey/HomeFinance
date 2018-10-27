import React from 'react';
import {Button} from 'react-native-elements';
import {ListItem} from "../listItem/listItem";
import {Text, View, ScrollView} from "react-native";
import Styles from './style';
import {Theme} from "../theme";

export const ItemList = (props) => {
    let {items,
        titleFactory,
        avatarFactory,
        avatarStyle,
        onItemPress,
        onItemEditPress,
        onItemDeletePress,
        addItemPress
    } = props;
    return (
        <View
            style = {Styles.container}
        >
            <View
                style={Styles.listContainer}
            >
                <ScrollView>
                   {
                        items.map((item) => (
                            <ListItem
                                title={titleFactory(item)}
                                key={item.id}
                                avatar = {avatarFactory(item)}
                                avatarStyle = {avatarStyle}
                                onPress={() => onItemPress(item)}
                                onEditPress={() => onItemEditPress(item)}
                                onDeletePress={() => onItemDeletePress(item)}
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
                    onPress={() => addItemPress()}
                />
            </View>
        </View>
    )
};