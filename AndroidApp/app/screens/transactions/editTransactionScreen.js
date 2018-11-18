import React from 'react';
import {Screen} from "../../components/screen/screen";
import state from '../../store/initialState';
import {getEnumsFromList} from '../../helpers/getEnums';
import {EditForm} from "../../components/editForm/editForm";
import {CommonConstants} from "../../constants/commonConstants";

let t = require('tcomb-form-native');

export default class EditTransactionScreen extends React.Component {
    constructor(props){
        super(props);
        this.getType = this.getType.bind(this);
        this.getMoneyCellsEnums = this.getMoneyCellsEnums.bind(this);
        let {transaction} = this.props.navigation.state.params;
        let startValue = transaction === undefined
            ? {
                date: new Date()
            }
            : {
                fromId: transaction.fromId,
                toId: transaction.toId,
                articleId: transaction.articleId,
                amount: transaction.amount,
                date: transaction.date && new Date(transaction.date),
                description: transaction.description
            };

        this.state = {value: startValue};
    }

    getMoneyCellsEnums = () => {
        return getEnumsFromList(state.moneyCells, mc => mc.id, mc => mc.name, 'MoneyCells',
            {key: CommonConstants.OUTSIDE_MONEY_CELL_ID, value: 'OUTSIDE'}
        );
    };

    getType = () => {
        return t.struct({
            fromId: this.getMoneyCellsEnums(),
            toId: this.getMoneyCellsEnums(),
            articleId: getEnumsFromList(state.articles, a => a.id, a => a.name, 'Articles'),
            amount: t.Number,
            date: t.Date,
            description: t.String
        });
    };

    render() {
        let type = this.getType();
        let {transaction, action} = this.props.navigation.state.params;
        let headerTitle = transaction === undefined ? 'Add new transaction' : transaction.description;
        return (
            <Screen
                {...this.props}
                headerTitle={headerTitle}
            >
                <EditForm
                    type={type}
                    options={options}
                    startValue={this.state.value}
                    action={action}
                />
            </Screen>
        );
    }
};

const options = {
    fields: {
        fromId: {
            label: 'From'
        },
        toId: {
            label: 'To'
        },
        articleId: {
            label: 'Article'
        },
        amount: {
            label: 'Amount',
            placeholder: 'Enter transaction\'s amount'
        },
        date: {
            label: 'Transaction\'s date',
            mode: 'date',
            config: {
                format: date => date.toLocaleDateString('ru-Ru')
            }
        },
        description: {
            label: 'Description',
            placeholder: 'Enter transaction\'s description'
        }
    }
};