import * as actions from '../Redux/Actions/userActions';
import constants from '../Redux/constants';

describe('user actions', () => {
    let user = {
        id: 1,
        firstName: "test",
        lastName: "user",
    }
    let user2 = {
        id: 2,
        firstName: "test",
        lastName: "user2",
    }
    let users = [user, user2];
    let flag = "test flag";
    let err = "err";
    it('should handle the user modal', () => {
        const expectedAction = {
            type: constants.HANDLE_USER_MODAL,
            payload: flag
        };
        expect(actions.handleModal(flag)).toEqual(expectedAction);
    })

    it('should handle edits', () => {
        const expectedAction = {
            type: constants.SET_EDITING,
            payload: flag
        };
        expect(actions.setEditing(flag)).toEqual(expectedAction);
    })

    it('should set users', () => {
        const expectedAction = {
            type: constants.SET_USERS,
            payload: users
        };
        expect(actions.setUsers(users)).toEqual(expectedAction);
    })
    it('should set users with an async request', () => {
        const expectedAction = {
            type: constants.SET_USERS_ASYNC
        };
        expect(actions.setUsersAsync()).toEqual(expectedAction);
    })
    it('should set an error', () => {
        const expectedAction = {
            type: constants.SET_USER_ERROR,
            payload: err
        };
        expect(actions.setUserError(err)).toEqual(expectedAction);
    })
    it('should set users to edit', () => {
        const expectedAction = {
            type: constants.SET_USER_TO_EDIT,
        };
        expect(actions.setUsersToEdit()).toEqual(expectedAction);
    })
    it('should set user info to edit', () => {
        const expectedAction = {
            type: constants.SET_USER_INFO_TO_EDIT,
            payload: user
        };
        expect(actions.setUsersInfoToEdit(user)).toEqual(expectedAction);
    })
    it('should add a new user', () => {
        const expectedAction = {
            type: constants.ADD_NEW_USER_ASYNC,
            payload: user2
        };
        expect(actions.addNewUsersAsync(user2)).toEqual(expectedAction);
    })
    it('should edit a user', () => {
        const expectedAction = {
            type: constants.EDIT_USER_ASYNC,
            payload: user,
        };
        expect(actions.editUsersAsync(user)).toEqual(expectedAction);
    })
    it('should delete a user', () => {
        const expectedAction = {
            type: constants.DELETE_USER_ASYNC,
            payload: user.id
        };
        expect(actions.deleteUsersAsync(user.id)).toEqual(expectedAction);
    })
})