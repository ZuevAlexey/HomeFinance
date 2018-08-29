import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default class List extends React.Component {
    render() {
        var caption = this.props.caption;
        var data = this.props.data;
        var name = this.props.name;

        return (
            <View>
                <Text style={styles.main}>{caption}</Text>
                {Object.keys(data).map(e => {
                    return <Text style={styles.line}>{name}.{e}={data[e]}</Text>
                })}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main:{
        color: 'green',
        fontSize: 25
    },
    line:{
        color: 'black',
        fontSize: 14
    }
})