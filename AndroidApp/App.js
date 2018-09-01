import React from 'react';
import {View, Text} from 'react-native';

export default class App extends React.Component {

  render() {
    let data = [1,2,3,4,5].map(e => e * 2);
    return (
        <View>
            {data.map((el, index) =>{
              return <Text key={index}>{el}</Text>
            })}
        </View>
    );
  }
}