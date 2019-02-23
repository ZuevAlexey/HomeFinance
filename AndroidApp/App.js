import React from 'react';
import {AppNavigator} from "./app/components/appNavigator/appNavigator";
import {Provider} from 'react-redux';
import {storeFactory} from './app/store/storefactory';
import { PersistGate } from 'redux-persist/lib/integration/react';

let {store, persistor} = storeFactory();

const App = (props) => (
    <Provider store = {store}>
        <PersistGate loading={null} persistor={persistor}>
            <AppNavigator {...props}/>
        </PersistGate>
    </Provider>
);

export default App;