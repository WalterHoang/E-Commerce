import { put, takeEvery } from 'redux-saga/effects'
import { setError } from '../Redux/Actions/productActions'
import constants from '../Redux/constants'
import * as Api from '../api/api';

/**
 * used for async fetches w/ no data to pass
 * @param {*} func 
 */
async function fetchAsync(func) {// eslint-disable-line no-unused-vars
    const response = await func();
    return response;
}
/**
 * used for async fetches with data to pass
 * @param {*} func 
 * @param {*} data 
 */
async function fetchAsyncSave(func, data) {
    const response = await func(data);
    return response;
}
/**
 * adds new product
 * @param {Object} action 
 */
export function* addNewUserAsync(action) {
    try {
        yield fetchAsyncSave(Api.addUser, action.payload);
    } catch (err) {
        let error = []
        if (err === 500) {
            error.push('Database unavailable, please try again later.');
            yield put(setError(error));
        } else if (err === 409) {
            error.push('Im sorry, its seems that email is already in use within our database');
            yield put(setError(error));
        } else if (err === 403) {
            error.push('Forbidden, you shall not pass');
            yield put(setError(error));
        } else if (err === 401) {
            error.push('You are not authorized to perform this action');
            yield put(setError(error));
        } else if (err === 400) {
            error.push('Oops, something went wrong please try again');
            yield put(setError(error));
        } else {
            error.push('An unexpected has error has occurred, please try again')
            yield put(setError(error));
        }
    }
}
/**
 * watches for product add call
 */
export function* watchAddNewUserAsync() {
    yield takeEvery(constants.USER_SIGNUP_ASYNC, addNewUserAsync);
}
