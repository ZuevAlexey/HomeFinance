import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeRouter, Route, Link, Redirect, withRouter } from 'react-router-native'


import ActionName from './app/constants/ActionName';
import List from './app/components/List';
import MoneyCellStatus from './app/constants/MoneyCellStatus';
import MoneyCellType from './app/constants/MoneyCellTypes';
import Sex from './app/constants/Sex';

export default class App extends React.Component {
  render() {
    return (
        <NativeRouter>
            <View style={styles.container}>
                <Link
                    to="/actions"
                    style={styles.navItem}
                    underlayColor='#f0f4f7'>
                    <Text>Actions</Text>
                </Link>
                <Link
                    to="/states"
                    style={styles.navItem}
                    underlayColor='#f0f4f7'>
                    <Text>States</Text>
                </Link>
                <Link
                    to="/types"
                    style={styles.navItem}
                    underlayColor='#f0f4f7'>
                    <Text>Types</Text>
                </Link>
                <Link
                    to="/sex"
                    style={styles.navItem}
                    underlayColor='#f0f4f7'>
                    <Text>Sex</Text>
                </Link>
                <Route path='/actions' component={<List name = 'actions' caption = 'Action Names' data = {ActionName} />} />
                <Route path='/states' component={<List name = 'states' caption = 'MoneyCell States' data = {MoneyCellStatus} />} />
                <Route path='/types' component={<List name = 'types' caption = 'MoneyCell Types' data = {MoneyCellType} />} />
                <Route path='/sex' component={<List name = 'sex' caption = 'Sex' data = {Sex} />} />
            </View>
        </NativeRouter>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
      marginTop: 25,
      padding: 10,
  },
    header: {
        fontSize: 20,
    },
    nav: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    navItem: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
    },
    btn: {
        width: 200,
        backgroundColor: '#E94949',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginTop: 10,
    }
});