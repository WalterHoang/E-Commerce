import { loginAsync, getRoleAsync } from '../Sagas/loginSagas';
import * as api from '../api/loginAPI';
import * as actions from '../Redux/Actions/loginActions';
import { setError } from '../Redux/Actions/productActions';
import sinon from 'sinon';
import { runSaga } from 'redux-saga';

describe('login saga test', () => {
    let credentials = { email: 'admin@catalyte.io', password: 'pass@word1' };
    let token = 'test-token';
    let role = "ADMIN";
    let error = "error";
    let dispatched = [];
    let stub;
    afterEach(() => {
        stub.restore();
        dispatched = [];
    })
    it('should dispatch loginAsync', async () => {
        stub = sinon.stub(api, 'firstLogin').callsFake(() => Promise.resolve(token));
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, loginAsync, actions.initLoginAsync(credentials)).done;
        expect(dispatched[0]).toEqual(actions.initLogin(token));
    })
    it('should dispatch an error on loginAsync', async () => {
        stub = sinon.stub(api, 'firstLogin').callsFake(() => Promise.reject());
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, loginAsync, actions.initLoginAsync(credentials)).done;
        expect(dispatched[0]).toEqual(setError(["An unexpected has error has occurred, please try again"]));
    })
    it('should return a database error', async () => {
        stub = sinon.stub(api, 'firstLogin').callsFake(() => Promise.reject(500));
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, loginAsync, actions.initLoginAsync(credentials)).done;
        expect(dispatched[0]).toEqual(setError(["Database unavailable, please try again later."]));
    })
    it('should return a conflict error', async () => {
        stub = sinon.stub(api, 'firstLogin').callsFake(() => Promise.reject(409));
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, loginAsync, actions.initLoginAsync(credentials)).done;
        expect(dispatched[0]).toEqual(setError(["Conflict, try refreshing the page"]));
    })
    it('should return a forbidden error', async () => {
        stub = sinon.stub(api, 'firstLogin').callsFake(() => Promise.reject(403));
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, loginAsync, actions.initLoginAsync(credentials)).done;
        expect(dispatched[0]).toEqual(setError(["Forbidden, you shall not pass"]));
    })
    it('should return a not authorized error', async () => {
        stub = sinon.stub(api, 'firstLogin').callsFake(() => Promise.reject(401));
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, loginAsync, actions.initLoginAsync(credentials)).done;
        expect(dispatched[0]).toEqual(setError(["You are not authorized to perform this action"]));
    })
    it('should return a bad request error', async () => {
        stub = sinon.stub(api, 'firstLogin').callsFake(() => Promise.reject(400));
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, loginAsync, actions.initLoginAsync(credentials)).done;
        expect(dispatched[0]).toEqual(setError(["Invalid Email or Password, please try again"]));
    })
    it('should dispatch getRoleAsync', async () => {
        stub = sinon.stub(api, 'getRoleApi').callsFake(() => Promise.resolve(role));
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, getRoleAsync, actions.getRoleAsync(token)).done;
        expect(dispatched[0]).toEqual(actions.getRole(role));
    })
    it('should return an error on getRoleAsync', async () => {
        stub = sinon.stub(api, 'getRoleApi').callsFake(() => Promise.reject(error));
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, getRoleAsync, actions.getRoleAsync(token)).done;
        expect(dispatched[0]).toEqual(setError(error));
    })
})