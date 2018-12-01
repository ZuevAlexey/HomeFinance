import React from 'react';
import {Text} from "react-native";
import {Theme} from "../../components/theme";
import {Screen} from "../../components/screen/screen";

import MoneyCellsList from "../../components/list/moneyCellList/moneyCellsList";
import {connect} from "react-redux";

const MoneyCellsScreen = (props) => {
    let {navigation, moneyCells} = props;
    return (
        <Screen {...props}
                headerTitle = 'MoneyCells'
                headerStatus = {<Text style = {
                {
                    textAlign: 'center',
                    fontSize: 30,
                    color: Theme.badColor
                }}
            >-400$</Text>}
        >
            <MoneyCellsList navigation = {navigation} moneyCells = {moneyCells} />
        </Screen>
    );
};

const mapStateToProps = state => {
    return {
        moneyCells: state.moneyCells.filter(e => !e.isDeleted)
    }
};

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(MoneyCellsScreen)