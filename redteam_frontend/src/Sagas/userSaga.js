import {
    put,
    takeEvery,
    call
} from 'redux-saga/effects';
import constants from '../Redux/constants';
import {
    setUsers,
    setUserError,
    setUsersInfoToEdit
} from '../Redux/Actions/userActions'
import * as Api from '../api/api';



/**
 * watches for the set customer call
 */
export function* watchSetUsersAsync() {
    yield takeEvery(constants.SET_USERS_ASYNC, setUsersAsync);
    yield takeEvery(constants.SET_USER_TO_EDIT, setUserInfoAsync);
    yield takeEvery(constants.DELETE_USER_ASYNC, deleteUsersAsync);
}

/**
 * Sets product data obtained from fetch
 */
export function* setUsersAsync() {
    try {
        const data = yield call(Api.fetchUsers);
        yield put(setUsers(data));
    } catch (err) {
        let error = []
        if (err === 500) {
            error.push('Database unavailable, please try again later.');
            yield put(setUserError(error));
        } else if (err === 409) {
            error.push('Conflict, try refreshing the page.');
            yield put(setUserError(error));
        } else if (err === 403) {
            error.push('Forbidden, you shall not pass.');
            yield put(setUserError(error));
        } else if (err === 401) {
            error.push('You are not authorized to perform this action.');
            yield put(setUserError(error));
        } else if (err === 400) {
            error.push('Oops, something went wrong please try again.');
            yield put(setUserError(error));
        } else {
            error.push('An unexpected has error has occurred, please try again.')
            yield put(setUserError(error));
        }
    }
}

export function* setUserInfoAsync() {
    try {
        let email = sessionStorage.getItem("email");
        const data = yield call(Api.fetchUserByEmail, email);
        yield put(setUsersInfoToEdit(data));
    } catch (err) {
        let error = []
        if (err === 500) {
            error.push('Database unavailable, please try again later.');
            yield put(setUserError(error));
        } else if (err === 409) {
            error.push('Conflict, try refreshing the page.');
            yield put(setUserError(error));
        } else if (err === 403) {
            error.push('Forbidden, you shall not pass.');
            yield put(setUserError(error));
        } else if (err === 401) {
            error.push('You are not authorized to perform this action.');
            yield put(setUserError(error));
        } else if (err === 400) {
            error.push('Oops, something went wrong please try again.');
            yield put(setUserError(error));
        } else {
            error.push('An unexpected has error has occurred, please try again.')
            yield put(setUserError(error));
        }
    }
}

/**
 * Deletes a product in the database,
 * currently the id is needed, but we'll see.
 * @param {*} id 
 */
export function* deleteUsersAsync(action) {
    try {
        yield call(Api.deleteUser, action.payload);
    } catch (err) {
        let error = []
        if (err === 500) {
            error.push('Database unavailable, please try again later.');
            yield put(setUserError(error));
        } else if (err === 409) {
            error.push('Conflict, try refreshing the page.');
            yield put(setUserError(error));
        } else if (err === 403) {
            error.push('Forbidden, you shall not pass.');
            yield put(setUserError(error));
        } else if (err === 401) {
            error.push('You are not authorized to perform this action.');
            yield put(setUserError(error));
        } else if (err === 400) {
            error.push('Oops, something went wrong please try again.');
            yield put(setUserError(error));
        } else if (err === 404) {
            error.push('Could not find that user, are you sure it exists?');
            yield put(setUserError(error));
        } else {
            error.push('An unexpected has error has occurred, please try again.')
            yield put(setUserError(error));
        }
    }
}
    /**
     * Updates a user in the database,
     * currently the id is needed, but we'll see.
     * @param {*} id
     */
    export function* editUsersAsync(action) {
        try {
            yield call(Api.editUsers, action.payload);
        } catch (err) {
            let error = []
            if (err === 500) {
                error.push('Database unavailable, please try again later.');
                yield put(setUserError(error));
            } else if (err === 409) {
                error.push('Conflict, try refreshing the page.');
                yield put(setUserError(error));
            } else if (err === 403) {
                error.push('Forbidden, you shall not pass.');
                yield put(setUserError(error));
            } else if (err === 401) {
                error.push('You are not authorized to perform this action.');
                yield put(setUserError(error));
            } else if (err === 400) {
                error.push('Oops, something went wrong please try again.');
                yield put(setUserError(error));
            } else if (err === 404) {
                error.push('Could not find that user, are you sure it exists?');
                yield put(setUserError(error));
            } else {
                error.push('An unexpected has error has occurred, please try again.')
                yield put(setUserError(error));
            }
        }
    }
