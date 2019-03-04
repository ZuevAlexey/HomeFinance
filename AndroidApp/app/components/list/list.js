import React from 'react';
import {Button} from 'react-native-elements';
import {ListItem} from '../listItem/listItem';
import {View, ScrollView} from 'react-native';
import Styles from './style';
import {Theme} from '../theme';
import {isNullOrUndefined} from '../../helpers/maybe';

export const List = (props) => {
    let {items,
        titleFactory,
        avatarFactory,
        onItemPress,
        onItemEditPress,
        onItemDeletePress,
        addButtonInfo,
        comparer
    } = props;

    let sortedItems = isNullOrUndefined(comparer)
        ? items
        : items.sort(comparer);

    return (
        <View
            style = {Styles.container}
        >
            <View
                style={Styles.listContainer}
            >
                <ScrollView>
                   {
                       sortedItems.map((item) => (
                            <ListItem
                                title={titleFactory(item)}
                                key={item.id}
                                avatar = {avatarFactory(item)}
                                avatarStyle = {Theme.listAvatarStyle}
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