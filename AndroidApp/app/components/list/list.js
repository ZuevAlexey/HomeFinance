import React from 'react';
import {Button} from 'react-native-elements';
import {ListItem} from "../listItem/listItem";
import {View, ScrollView} from "react-native";
import Styles from './style';
import {Theme} from "../theme";

export const List = (props) => {
    let {items,
        titleFactory,
        avatarFactory,
        avatarStyle,
        onItemPress,
        onItemEditPress,
        onItemDeletePress,
        addButtonInfo
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
            {addButtonInfo && <View
                    style = {Styles.buttonContainer}
                >
                    <Button
                        icon={addButtonInfo.icon}
                        title = {addButtonInfo.title}
                        backgroundColor = {Theme.mainColor}
                        onPress={() => addButtonInfo.onPress()}
                    />
                </View>
            }
        </View>
    )
};