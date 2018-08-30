import ActionName from '../../constants/ActionName';

export default EditPerson = (lastName, firstName, sex) => {
    return {
        type : ActionName.EDIT_PERSON,
        lastName,
        firstName,
        sex
    }
}