import React from 'react';
import {AppNavigator} from "./app/components/appNavigator/appNavigator";
import {Provider} from 'react-redux';
import {initialState} from './app/store/initialState';
import {storeFactory} from './app/store/storefactory';

const App = (props) => (
    <Provider store = {storeFactory(initialState)}>
        <AppNavigator {...props}/>
    </Provider>
);

export default App;