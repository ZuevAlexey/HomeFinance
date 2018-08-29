import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import actionsName from './app/constants/ActionsName';
import List from './app/components/List';
import moneyCellState from './app/constants/MoneyCellStates';
import moneyCellTypes from './app/constants/MoneyCellTypes';
import sex from './app/constants/SEX';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <List name = 'actions' caption = 'Action Names' data = {actionsName} />
        <Text></Text>
        <List name = 'states' caption = 'MoneyCell States' data = {moneyCellState} />
        <Text></Text>
        <List name = 'types' caption = 'MoneyCell Types' data = {moneyCellTypes} />
        <Text></Text>
        <List name = 'sex' caption = 'Sex' data = {sex} />
        <Text></Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
