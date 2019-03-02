import React from 'react';
import {Screen} from '../../components/screen/screen';
import {getEnumsFromList} from '../../helpers/getEnums';
import {EditForm} from '../../components/editForm/editForm';
import {CommonConstants} from '../../constants/commonConstants';
import {isNullOrUndefined} from '../../helpers/maybe';
import {connect} from 'react-redux';
import {GetShortPersonName} from '../../helpers/displayStringHelper';
import {articleComparer, getMoneyCellsComparer} from '../../helpers/sorter';

let t = require('tcomb-form-native');

class EditTransactionScreen extends React.Component {
    constructor(props){
        super(props);
        this.getType = this.getType.bind(this);
        this.getMoneyCellsEnums = this.getMoneyCellsEnums.bind(this);
        let {transactionId} = this.props.navigation.state.params;
        let isNew = isNullOrUndefined(transactionId);

        let startValue;
        if(isNew) {
            startValue = {
                date: new Date()
            };
        } else {
            let transaction = props.getTransaction(transactionId);
            startValue = {
                id: transaction.id,
                fromId: transaction.fromId,
                toId: transaction.toId,
                articleId: transaction.articleId,
                amount: transaction.amount,
                date: transaction.date && new Date(transaction.date),
                description: transaction.description
            }
        }

        this.state = {value: startValue};
    }

    getMoneyCellsEnums = () => {
        return getEnumsFromList(this.props.moneyCells,
            mc => mc.id,
            mc => `${mc.name} (${GetShortPersonName(this.props.people.first(e => e.id === mc.ownerId))})`,
            'MoneyCells',
            {key: CommonConstants.OUTSIDE_MONEY_CELL_ID, value: 'OUTSIDE'},
            getMoneyCellsComparer(this.props.people)
        );
    };

    getType = () => {
        return t.struct({
            id: t.maybe(t.String),
            amount: t.Number,
            description: t.maybe(t.String),
            fromId: this.getMoneyCellsEnums(),
            toId: this.getMoneyCellsEnums(),
            articleId: getEnumsFromList(this.props.articles, a => a.id, a => a.name, 'Articles', null, articleComparer),
            date: t.Date,
        });
    };

    render() {
        let type = this.getType();
        let {action, transactionId} = this.props.navigation.state.params;
        let transaction = this.state.value;
        let headerTitle = isNullOrUndefined(transactionId) ? 'Add new transaction' : transaction.description;
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
}

const options = {
    fields: {
        id: {
            hidden: true,
        },
        amount: {
            label: 'Amount',
            placeholder: 'Enter transaction\'s amount'
        },
        description: {
            label: 'Description',
            placeholder: 'Enter transaction\'s description'
        },
        fromId: {
            label: 'From'
        },
        toId: {
            label: 'To'
        },
        articleId: {
            label: 'Article'
        },
        date: {
            label: 'Transaction\'s date',
            mode: 'date',
            config: {
                format: date => date.toLocaleDateString('ru-Ru')
            }
        }
    }
};

const mapStateToProps = (state) => ({
    moneyCells: state.moneyCells.filter(e => !e.isDeleted),
    getTransaction: (transactionId) => state.transactions.first(e => !e.isDeleted && e.id === transactionId),
    articles: state.articles,
    people: state.people.filter(e => !e.isDeleted)
});

export default connect(mapStateToProps, undefined)(EditTransactionScreen);