import {setUsersAsync, setUserInfoAsync, deleteUsersAsync, editUsersAsync} from '../Sagas/userSaga'
import constants from '../Redux/constants'
import * as actions from '../Redux/Actions/userActions'
import sinon from 'sinon'
import {runSaga} from 'redux-saga'
import * as api from '../api/api'

describe('user saga test', ()=> {
    let user = {name: 'Joe'};
    let userList = [{id: 1, name: 'Joe'}, {id: 2, name: 'Kay'}, {id: 3, name: 'Bobby'}];
    let token = 'test-token'
    let error = 'test-error'
    let dispatched = [];
    let stub;
    afterEach(() => {
        stub.restore();
        dispatched = [];
    })
    //Fetch users
    it('should dispatch setUsersAsync', async () => {
        stub = sinon.stub(api, 'fetchUsers').callsFake(() => Promise.resolve(userList));
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, setUsersAsync, actions.setUsersAsync()).done;
        expect(dispatched[0]).toEqual(actions.setUsers(userList))
    })

    it('should return a database error', async () => {
        stub = sinon.stub(api, 'fetchUsers').callsFake(() => Promise.reject(500));
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, setUsersAsync, actions.setUsersAsync()).done;
        expect(dispatched[0]).toEqual(actions.setUserError(['Database unavailable, please try again later.']));
    })
    it('should return a conflict error', async () => {
        stub = sinon.stub(api, 'fetchUsers').callsFake(() => Promise.reject(409));
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, setUsersAsync, actions.setUsersAsync()).done;
        expect(dispatched[0]).toEqual(actions.setUserError(["Conflict, try refreshing the page."]));
    })
    it('should return a forbidden error', async () => {
        stub = sinon.stub(api, 'fetchUsers').callsFake(() => Promise.reject(403));
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, setUsersAsync, actions.setUsersAsync()).done;
        expect(dispatched[0]).toEqual(actions.setUserError(["Forbidden, you shall not pass."]));
    })
    it('should return a not authorized error', async () => {
        stub = sinon.stub(api, 'fetchUsers').callsFake(() => Promise.reject(401));
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, setUsersAsync, actions.setUsersAsync()).done;
        expect(dispatched[0]).toEqual(actions.setUserError(["You are not authorized to perform this action."]));
    })
    it('should return a 400 error', async () => {
        stub = sinon.stub(api, 'fetchUsers').callsFake(() => Promise.reject(400));
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, setUsersAsync, actions.setUsersAsync()).done;
        expect(dispatched[0]).toEqual(actions.setUserError(["Oops, something went wrong please try again."]));
    })
    it('should give an unexpected error', async () => {
        stub = sinon.stub(api, 'fetchUsers').callsFake(() => Promise.reject(error));
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, setUsersAsync, actions.setUsersAsync()).done;
        expect(dispatched[0]).toEqual(actions.setUserError(['An unexpected has error has occurred, please try again.']));
    })
    //delete a user
    it('should give a database error on deleting a user', async () => {
        stub = sinon.stub(api, 'deleteUser').throws(500);
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, deleteUsersAsync, actions.deleteUsersAsync(1)).done;
        expect(dispatched[0]).toEqual(actions.setUserError(['Database unavailable, please try again later.']))
    })
    it('should throw a conflict error on deleting a user', async () => {
        stub = sinon.stub(api, 'deleteUser').throws(409);
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, deleteUsersAsync, actions.deleteUsersAsync(1)).done;
        expect(dispatched[0]).toEqual(actions.setUserError(['Conflict, try refreshing the page.']))
    })
    it('should throw a forbidden error on deleting a user', async () => {
        stub = sinon.stub(api, 'deleteUser').throws(404);
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, deleteUsersAsync, actions.deleteUsersAsync(1)).done;
        expect(dispatched[0]).toEqual(actions.setUserError(['Could not find that user, are you sure it exists?']))
    })
    it('should throw a forbidden error on deleting a user', async () => {
        stub = sinon.stub(api, 'deleteUser').throws(403);
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, deleteUsersAsync, actions.deleteUsersAsync(1)).done;
        expect(dispatched[0]).toEqual(actions.setUserError(['Forbidden, you shall not pass.']))
    })
    it('should throw a not authorized error on deleting a user', async () => {
        stub = sinon.stub(api, 'deleteUser').throws(401);
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, deleteUsersAsync, actions.deleteUsersAsync(1)).done;
        expect(dispatched[0]).toEqual(actions.setUserError(['You are not authorized to perform this action.']))
    })
    it('should throw a 400 error on deleting a user', async () => {
        stub = sinon.stub(api, 'deleteUser').throws(400);
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, deleteUsersAsync, actions.deleteUsersAsync(1)).done;
        expect(dispatched[0]).toEqual(actions.setUserError(['Oops, something went wrong please try again.']))
    })
    it('should have a unexpected error on deleting a user', async () => {
        stub = sinon.stub(api, 'deleteUser').throws(error)
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, deleteUsersAsync, actions.deleteUsersAsync(1)).done;
        expect(dispatched[0]).toEqual(actions.setUserError(['An unexpected has error has occurred, please try again.']))
    })
        // edit users
        it('should give a database error on edit a user', async () => {
            stub = sinon.stub(api, 'editUsers').throws(500);
            await runSaga({
                dispatch: (action) => dispatched.push(action)
            }, editUsersAsync, actions.editUsersAsync(user)).done;
            expect(dispatched[0]).toEqual(actions.setUserError(['Database unavailable, please try again later.']))
        })
        it('should throw a conflict error on edit a user', async () => {
            stub = sinon.stub(api, 'editUsers').throws(409);
            await runSaga({
                dispatch: (action) => dispatched.push(action)
            }, editUsersAsync, actions.editUsersAsync(user)).done;
            expect(dispatched[0]).toEqual(actions.setUserError(['Conflict, try refreshing the page.']))
        })
        it('should throw a forbidden error on edit a user', async () => {
            stub = sinon.stub(api, 'editUsers').throws(404);
            await runSaga({
                dispatch: (action) => dispatched.push(action)
            }, editUsersAsync, actions.editUsersAsync(user)).done;
            expect(dispatched[0]).toEqual(actions.setUserError(['Could not find that user, are you sure it exists?']))
        })
        it('should throw a forbidden error on edit a user', async () => {
            stub = sinon.stub(api, 'editUsers').throws(403);
            await runSaga({
                dispatch: (action) => dispatched.push(action)
            }, editUsersAsync, actions.editUsersAsync(user)).done;
            expect(dispatched[0]).toEqual(actions.setUserError(['Forbidden, you shall not pass.']))
        })
        it('should throw a not authorized error on edit a user', async () => {
            stub = sinon.stub(api, 'editUsers').throws(401);
            await runSaga({
                dispatch: (action) => dispatched.push(action)
            }, editUsersAsync, actions.editUsersAsync(user)).done;
            expect(dispatched[0]).toEqual(actions.setUserError(['You are not authorized to perform this action.']))
        })
        it('should throw a 400 error on edit a user', async () => {
            stub = sinon.stub(api, 'editUsers').throws(400);
            await runSaga({
                dispatch: (action) => dispatched.push(action)
            }, editUsersAsync, actions.editUsersAsync(user)).done;
            expect(dispatched[0]).toEqual(actions.setUserError(['Oops, something went wrong please try again.']))
        })
        it('should have a unexpected error on edit a user', async () => {
            stub = sinon.stub(api, 'editUsers').throws(error)
            await runSaga({
                dispatch: (action) => dispatched.push(action)
            }, editUsersAsync, actions.editUsersAsync(user)).done;
            expect(dispatched[0]).toEqual(actions.setUserError(['An unexpected has error has occurred, please try again.']))
        })
        ///set user info
        it('should give a database error on edit a user', async () => {
            stub = sinon.stub(api, 'fetchUserByEmail').throws(500);
            await runSaga({
                dispatch: (action) => dispatched.push(action)
            }, setUserInfoAsync, actions.setUsersInfoToEdit(user)).done;
            expect(dispatched[0]).toEqual(actions.setUserError(['Database unavailable, please try again later.']))
        })
        it('should throw a conflict error on edit a user', async () => {
            stub = sinon.stub(api, 'fetchUserByEmail').throws(409);
            await runSaga({
                dispatch: (action) => dispatched.push(action)
            }, setUserInfoAsync, actions.setUsersInfoToEdit(user)).done;
            expect(dispatched[0]).toEqual(actions.setUserError(['Conflict, try refreshing the page.']))
        })
        it('should throw a forbidden error on edit a user', async () => {
            stub = sinon.stub(api, 'fetchUserByEmail').throws(403);
            await runSaga({
                dispatch: (action) => dispatched.push(action)
            }, setUserInfoAsync, actions.setUsersInfoToEdit(user)).done;
            expect(dispatched[0]).toEqual(actions.setUserError(['Forbidden, you shall not pass.']))
        })
        it('should throw a not authorized error on edit a user', async () => {
            stub = sinon.stub(api, 'fetchUserByEmail').throws(401);
            await runSaga({
                dispatch: (action) => dispatched.push(action)
            }, setUserInfoAsync, actions.setUsersInfoToEdit(user)).done;
            expect(dispatched[0]).toEqual(actions.setUserError(['You are not authorized to perform this action.']))
        })
        it('should throw a 400 error on edit a user', async () => {
            stub = sinon.stub(api, 'fetchUserByEmail').throws(400);
            await runSaga({
                dispatch: (action) => dispatched.push(action)
            }, setUserInfoAsync, actions.setUsersInfoToEdit(user)).done;
            expect(dispatched[0]).toEqual(actions.setUserError(['Oops, something went wrong please try again.']))
        })
        it('should have a unexpected error on edit a user', async () => {
            stub = sinon.stub(api, 'fetchUserByEmail').throws(error)
            await runSaga({
                dispatch: (action) => dispatched.push(action)
            }, setUserInfoAsync, actions.setUsersInfoToEdit(user)).done;
            expect(dispatched[0]).toEqual(actions.setUserError(['An unexpected has error has occurred, please try again.']))
        })
})