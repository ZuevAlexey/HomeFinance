import React from 'react';
import {Screen} from '../../components/screen/screen';

import MoneyCellsList from '../../components/list/moneyCellList/moneyCellsList';
import {connect} from 'react-redux';
import {getMoneyCellsSummary} from '../../helpers/calculator';
import {getStatusFromSummary} from '../../helpers/statusHelper';
import {getTitleWithOwner} from "../../helpers/moneyCellsHelper";
import {MoneyCellStatus} from "../../constants/moneyCellStatus";

const MoneyCellsScreen = (props) => {
    let {moneyCells} = props;
    let summary = getMoneyCellsSummary(moneyCells);
    return (
        <Screen {...props}
                headerTitle='MoneyCells'
                headerStatus={getStatusFromSummary(summary)}
        >
            <MoneyCellsList
                navigation={props.navigation}
                moneyCells={moneyCells}
                getTitle={getTitleWithOwner(props.people)}
            />
        </Screen>
    );
};

const mapStateToProps = state => {
    return {
        moneyCells: state.main.moneyCells.filter(e => !e.isDeleted && e.status !== MoneyCellStatus.CLOSED),
        people: state.main.people.filter(e => !e.isDeleted),
    }
};

export default connect(mapStateToProps, undefined)(MoneyCellsScreen)