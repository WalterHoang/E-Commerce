import { put, takeEvery, call } from 'redux-saga/effects';
import constants from '../Redux/constants';
import { initLogin } from '../Redux/Actions/loginActions';
import { firstLogin, getRoleApi } from '../api/loginAPI';
import { getRole } from '../Redux/Actions/loginActions';
import { setError } from '../Redux/Actions/productActions';

/**
 * Handles api call to login
 */
export function* loginAsync(creds) {
    try {
        const data = yield call(firstLogin, creds);
        yield put(initLogin(data));
    } catch (err) {
        let error = []
        if (err === 500) {
            error.push('Database unavailable, please try again later.');
            yield put(setError(error));
        } else if (err === 409) {
            error.push('Conflict, try refreshing the page');
            yield put(setError(error));
        } else if (err === 403) {
            error.push('Forbidden, you shall not pass');
            yield put(setError(error));
        } else if (err === 401) {
            error.push('You are not authorized to perform this action');
            yield put(setError(error));
        } else if (err === 400) {
            error.push('Invalid Email or Password, please try again');
            yield put(setError(error));
        } else {
            error.push('An unexpected has error has occurred, please try again')
            yield put(setError(error));
        }
    }
}
/**
 * watches for any login async requests
 */
export function* watchLoginAsyn() {
    yield takeEvery(constants.INIT_LOGIN_ASYNC, loginAsync)
}
/**
 * Handles api call to get role
 * @param {*} data 
 */
export function* getRoleAsync(data) {
    try {
        const data1 = yield call(getRoleApi, data.data);
        yield put(getRole(data1));
    } catch (err) {
        yield put(setError(err));
    }
}
/**
 * watches for requests to get role
 */
export function* watchGetRole() {
    yield takeEvery(constants.GET_ROLE_ASYNC, getRoleAsync);
}