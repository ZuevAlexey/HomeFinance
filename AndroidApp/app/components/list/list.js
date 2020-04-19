import React from 'react';
import {Button} from 'react-native-elements';
import {ListItem} from '../listItem/listItem';
import {FlatList, View} from 'react-native';
import Styles from './style';
import Theme from '../theme';
import {isNullOrUndefined} from '../../helpers/maybe';

const startPageSize = 20;
const offset = 50;

export default class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {count: startPageSize}
        this.onEndReachedHandler = this.onEndReachedHandler.bind(this);
    }

    onEndReachedHandler = () => {
        if (this.state.count >= this.props.items.length) {
            return;
        }

        this.setState({count: this.state.count + offset});
    };

    render() {
        let {
            items,
            titleFactory,
            avatarFactory,
            onItemPress,
            onItemEditPress,
            onItemDeletePress,
            addButtonInfo,
            comparer
        } = this.props;

        let sortedItems = (isNullOrUndefined(comparer)
            ? items
            : items.sort(comparer)).slice(0, this.state.count);

        return (
            <View
                style={Styles.container}
            >
                <View
                    style={Styles.listContainer}
                >
                    <FlatList
                        data={sortedItems}
                        onEndReached={this.onEndReachedHandler}
                        onEndReachedThreshold={0.1}
                        keyExtractor={(item) => item.id}
                        renderItem={(item) => (
                            <ListItem
                                title={titleFactory(item.item)}
                                avatar={avatarFactory(item.item)}
                                avatarStyle={Theme.listAvatarStyle}
                                onPress={() => onItemPress(item.item)}
                                onEditPress={() => onItemEditPress(item.item)}
                                onDeletePress={() => onItemDeletePress(item.item)}
                            />)}
                    />
                </View>
                {addButtonInfo && <View
                    style={Styles.buttonContainer}
                >
                    <Button
                        icon={addButtonInfo.icon}
                        title={addButtonInfo.title}
                        buttonStyle={Theme.mainButtonStyle}
                        onPress={() => addButtonInfo.onPress()}
                    />
                </View>
                }
            </View>
        )
    }
};

