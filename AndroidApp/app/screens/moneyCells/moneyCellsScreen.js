import React from 'react';
import {Screen} from "../../components/screen/screen";

import MoneyCellsList from "../../components/list/moneyCellList/moneyCellsList";
import {connect} from "react-redux";
import {getMoneyCellsSummary} from "../../helpers/calculator";
import {getStatusFromSummary} from "../../helpers/statusHelper";

const MoneyCellsScreen = (props) => {
    let {navigation, moneyCells} = props;
    let summary = getMoneyCellsSummary(moneyCells);
    return (
        <Screen {...props}
                headerTitle = 'MoneyCells'
                headerStatus = {getStatusFromSummary(summary)}
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