import { addNewUserAsync } from '../Sagas/signUpSagas';
import * as api from '../api/api';
import * as actions from '../Redux/Actions/signUpActions';
import { setError } from '../Redux/Actions/productActions';
import sinon from 'sinon';
import { runSaga } from 'redux-saga';

describe('signup saga', () => {
    let testCustomer = {
        firstName: 'Walter',
        lastName: 'Hoang',
        phone: '303-668-0548',
        email: 'customer@catalyte.io',
        password: 'pass@word1'
    }
    let error = "error";
    let dispatched = [];
    let stub;
    afterEach(() => {
        stub.restore();
        dispatched = [];
    })
    it('should return a database error', async () => {
        stub = sinon.stub(api, 'addUser').callsFake(() => Promise.reject(500));
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, addNewUserAsync, actions.userSignupAsync(testCustomer)).done;
        expect(dispatched[0]).toEqual(setError(["Database unavailable, please try again later."]));
    })
    it('should return a conflict error', async () => {
        stub = sinon.stub(api, 'addUser').callsFake(() => Promise.reject(409));
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, addNewUserAsync, actions.userSignupAsync(testCustomer)).done;
        expect(dispatched[0]).toEqual(setError(["Im sorry, its seems that email is already in use within our database"]));
    })
    it('should return a forbidden error', async () => {
        stub = sinon.stub(api, 'addUser').callsFake(() => Promise.reject(403));
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, addNewUserAsync, actions.userSignupAsync(testCustomer)).done;
        expect(dispatched[0]).toEqual(setError(["Forbidden, you shall not pass"]));
    })
    it('should return a not authorized error', async () => {
        stub = sinon.stub(api, 'addUser').callsFake(() => Promise.reject(401));
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, addNewUserAsync, actions.userSignupAsync(testCustomer)).done;
        expect(dispatched[0]).toEqual(setError(["You are not authorized to perform this action"]));
    })
    it('should return a 400 error', async () => {
        stub = sinon.stub(api, 'addUser').callsFake(() => Promise.reject(400));
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, addNewUserAsync, actions.userSignupAsync(testCustomer)).done;
        expect(dispatched[0]).toEqual(setError(["Oops, something went wrong please try again"]));
    })
    it('should return an unexpected error', async () => {
        stub = sinon.stub(api, 'addUser').callsFake(() => Promise.reject(error));
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, addNewUserAsync, actions.userSignupAsync(testCustomer)).done;
        expect(dispatched[0]).toEqual(setError(["An unexpected has error has occurred, please try again"]));
    })
})