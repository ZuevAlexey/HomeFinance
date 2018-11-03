import React from 'react';
import {Screen} from "../../components/screen/screen";

export const AddNewPersonScreen = (props) => {
    return (
        <Screen
            {...props}
            headerTitle = {`Add New Person`}
        />
    );
};