import React from 'react';
import {Screen} from "../../components/screen/screen";

export const EditOrAddTransactionScreen = (props) => {
    return (
        <Screen
            {...props}
            headerTitle = {`Add New Transaction`}
        />
    );
};