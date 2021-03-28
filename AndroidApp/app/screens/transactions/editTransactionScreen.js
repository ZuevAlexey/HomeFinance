import React from 'react';
import {Screen} from '../../components/screen/screen';
import {getEnumsFromList} from '../../helpers/getEnums';
import {EditForm} from '../../components/editForm/editForm';
import {CommonConstants} from '../../constants/commonConstants';
import {isNullOrUndefined} from '../../helpers/maybe';
import {connect} from 'react-redux';
import {GetDropdownMoneyCellInfo} from '../../helpers/displayStringHelper';
import {getFullArticleName} from '../../helpers/transactionHelper';
import {articleComparer, getMoneyCellsComparer} from '../../helpers/sorter';
import {MoneyCellStatus} from "../../constants/moneyCellStatus";

let t = require('tcomb-form-native');

class EditTransactionScreen extends React.Component {
    constructor(props) {
        super(props);
        this.getType = this.getType.bind(this);
        this.getMoneyCellsEnums = this.getMoneyCellsEnums.bind(this);
        let {transactionId} = this.props.navigation.state.params;
        let isNew = isNullOrUndefined(transactionId);

        let startValue;
        if (isNew) {
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
        let transaction = this.state.value;
        return getEnumsFromList(this.props.getMoneyCells(transaction.fromId, transaction.toId),
            mc => mc.id,
            mc => GetDropdownMoneyCellInfo(this.props.people.first(e => e.id === mc.ownerId), mc),
            'MoneyCells',
            {key: CommonConstants.OUTSIDE_MONEY_CELL_ID, value: CommonConstants.OUTSIDE_MONEY_CELL_NAME},
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
            articleId: getEnumsFromList(this.props.articles, a => a.id, a => getFullArticleName(a), 'Articles', null, articleComparer),
            date: t.Date,
        });
    };

    render() {
        let type = this.getType();
        let {buttons, transactionId} = this.props.navigation.state.params;
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
                    buttons={buttons}
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
    getTransaction: (transactionId) => state.main.transactions.first(e => !e.isDeleted && e.id === transactionId),
    articles: state.main.articles,
    people: state.main.people.filter(e => !e.isDeleted),
    getMoneyCells: (fromId, toId) => state.main.moneyCells.filter(e => !e.isDeleted &&
        (
            e.status !== MoneyCellStatus.CLOSED ||
            fromId !== CommonConstants.OUTSIDE_MONEY_CELL_ID && e.id === fromId ||
            toId !== CommonConstants.OUTSIDE_MONEY_CELL_ID && e.id === toId
        )
    ),
});

export default connect(mapStateToProps, undefined)(EditTransactionScreen);