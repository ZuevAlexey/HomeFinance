import React from 'react';
import List from '../../components/list/list';
import {Text} from 'react-native';
import Theme from '../../components/theme';
import {Screen} from '../../components/screen/screen';
import {showOkCancelDialogAsync} from '../../helpers/dialog';
import {Sex} from '../../constants/sex';
import {connect} from 'react-redux';
import {AddPerson} from '../../store/actions/addPerson';
import {EditPerson} from '../../store/actions/editPerson';
import {MarkDeletePerson} from '../../store/actions/markDeletePerson';

import {GetFullPersonName} from '../../helpers/displayStringHelper';
import {getStatusFromSummary} from '../../helpers/statusHelper';
import {getPeopleSummary} from '../../helpers/calculator';
import {createMoneyCellsIdsSet} from '../../helpers/transactionHelper';
import {peopleComparer} from '../../helpers/sorter';
import {Ionicons} from "@expo/vector-icons";
import {DIALOG_RESULT_CANCEL} from "../../constants/dialogResult";
import {STOP_NAVIGATION} from "../../constants/navigationSign";
import {DELETE_BUTTON_NAME, SAVE_BUTTON_NAME} from "../../constants/editFormButtonNames";
import {MoneyCellStatus} from "../../constants/moneyCellStatus";

const PeopleScreen = (props) => {
    let {navigation, peopleSummary} = props;
    return (
        <Screen
            {...props}
            headerTitle='People'
            headerStatus={getStatusFromSummary(Object.keys(peopleSummary).reduce((acc, el) => acc += peopleSummary[el], 0))}
        >
            <List
                avatarFactory={getAvatar}
                avatarStyle={Theme.listAvatarStyle}
                titleFactory={getTitle(peopleSummary)}
                onItemPress={onPersonPress(navigation)}
                onItemEditPress={onPersonEditPress(navigation, props.save, props.delete, props.getMoneyCellsIds)}
                items={props.people}
                comparer={peopleComparer}
                addButtonInfo={{
                    icon: <Ionicons name="md-person-add" size={Theme.mainButtonIconSize} color={Theme.buttonIconColor} />,
                    title: 'Add new person',
                    onPress: addPersonPress(navigation, props.add)
                }}
            />
        </Screen>
    );
};

const addPersonPress = (navigation, add) => () => {
    navigation.push('EditPerson', {
        buttons: [
            {
                title: SAVE_BUTTON_NAME,
                saveAction: async (newPerson) => add(newPerson)
            }
        ]
    })
};

const onPersonPress = (navigation) => (person) => {
    navigation.push('Person', {personId: person.id})
};

const onPersonEditPress = (navigation, save, deleteAction, getMoneyCellsIds) => person => {
    navigation.push('EditPerson', {
        personId: person.id,
        buttons: [
            {
                title: SAVE_BUTTON_NAME,
                action: async (newPerson) => {
                    save(newPerson);
                },
            },
            {
                title: DELETE_BUTTON_NAME,
                action: async (personToDelete) => {
                    let displayName = GetFullPersonName(personToDelete);
                    let dialogResult = await showOkCancelDialogAsync(
                        'Deleting person',
                        `You want to delete a person '${displayName}'. Are you sure?`,
                        'Yes, I do',
                    );

                    if (dialogResult === DIALOG_RESULT_CANCEL) {
                        return STOP_NAVIGATION;
                    }

                    let moneyCellsIdsSet = getMoneyCellsIds(personToDelete.id);
                    deleteAction(personToDelete, moneyCellsIdsSet)
                }
            }
        ]
    })
};

const getTitle = (peopleSummary) => (person) => {
    return [
        <Text key='name' style={{textAlign: 'center'}}>{GetFullPersonName(person)}</Text>,
        <Text key='amount' style={{
            color: peopleSummary[person.id] < 0 ? Theme.badColor : Theme.goodColor,
            textAlign: 'center'
        }}>
            {`${peopleSummary[person.id]} RUB`}
        </Text>
    ];
};

const getAvatar = (person) => {
    let name;
    if (person.sex === Sex.FEMALE) {
        name = 'md-woman';
    } else {
        name = 'md-man';
    }

    return {
        type: 'font-awesome',
        name
    };
};

const mapStateToProps = state => {
    return {
        people: state.main.people.filter(e => !e.isDeleted),
        getMoneyCellsIds: (personId) => createMoneyCellsIdsSet(state.main.moneyCells.filter(e => !e.isDeleted && e.status !== MoneyCellStatus.INACTIVE && e.ownerId === personId)),
        peopleSummary: getPeopleSummary(state.main.moneyCells.filter(e => !e.isDeleted && e.status !== MoneyCellStatus.INACTIVE))
    }
};

const mapDispatchToProps = dispatch => {
    return {
        add: (person) => {
            dispatch(AddPerson(person.lastName, person.firstName, person.sex))
        },
        save: (person) => {
            dispatch(EditPerson(person.id, person.lastName, person.firstName, person.sex))
        },
        delete: (person, moneyCellsIdsSet) => {
            dispatch(MarkDeletePerson(person.id, moneyCellsIdsSet))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PeopleScreen)