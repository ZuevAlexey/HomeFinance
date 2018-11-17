import React from 'react';
import {Screen} from "../../components/screen/screen";
import {TransactionsList} from "../../components/list/transactions/transactionsList";
import {Text, View, StyleSheet, Dimensions} from "react-native";
import State from "../../store/initialState";
import {GetFullName} from "../../helpers/peopleHelper";
import {Theme} from "../../components/theme";
import {MoneyCellStatus} from "../../constants/moneyCellStatus";

export const MoneyCellInfoScreen = (props) => {
    let {moneyCell} = props.navigation.state.params;
    let {navigation} = props;
    let people = State.people;
    let owner = people.filter(e => e.id === moneyCell.ownerId)[0];

    return (
        <Screen
            {...props}
            headerTitle = {`${moneyCell.name}`}
        >
            <View style ={styles.infoContainer} >
                <View style ={styles.halfInfoContainer} >
                    {GetInfoText('Owner', GetFullName(owner))}
                    {GetInfoText('Type', moneyCell.moneyCellType)}
                    {GetInfoText('Amount', moneyCell.amount, e => `${e} RUB`, e => e > 0)}
                </View>
                <View style ={styles.halfInfoContainer} >
                    {GetInfoText('Start date', moneyCell.startDate === null ? 'not set' : moneyCell.startDate, e => e.substring(0,10))}
                    {GetInfoText('End date', moneyCell.endDate === null ? 'not set' : moneyCell.endDate, e => e.substring(0,10))}
                    {GetInfoText('Status', moneyCell.status, null, e => e === MoneyCellStatus.ACTIVE)}
                </View>
            </View>
            <Text style = {styles.transactionsListTitle} >Current moneycell's transactions:</Text>
            <TransactionsList navigation={navigation} />
        </Screen>
    );
};

let {width} = Dimensions.get('window');
const styles = StyleSheet.create({
    infoContainer: {
        flexDirection: 'row',
        paddingLeft: Theme.mainPaddingLeft
    },
    halfInfoContainer: {
        width: width / 2
    },
    transactionsListTitle: {
        color: Theme.mainColor,
        fontSize: 18,
        marginTop: 10,
        paddingLeft: Theme.mainPaddingLeft
    }
});

const GetInfoText = (title, value, displayValueCreator, colorPredicate) =>{
    let valueColor = colorPredicate === undefined || colorPredicate === null
        ? Theme.fontColor
        : colorPredicate(value)
            ? Theme.goodColor
            : Theme.badColor;
    return <Text
        style = {{
            color: Theme.fontColor,
            fontSize: 16
        }}
    >{title}:{' '}
        <Text
            style={{color: valueColor}}
        >
            {displayValueCreator === undefined || displayValueCreator === null
                ? value
                : displayValueCreator(value)}
            </Text>
    </Text>
};