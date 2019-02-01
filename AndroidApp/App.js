import React from 'react';
import {AppNavigator} from "./app/components/appNavigator/appNavigator";
import {Provider} from 'react-redux';
import {storeFactory} from './app/store/storefactory';

const App = (props) => (
    <Provider store = {storeFactory()}>
        <AppNavigator {...props}/>
    </Provider>
);

export default App;