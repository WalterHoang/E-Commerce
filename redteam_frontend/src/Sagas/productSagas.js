import { put, takeEvery, call, select } from 'redux-saga/effects';
import { setProducts, setError, setSearchData, getPopular } from '../Redux/Actions/productActions'
import constants from '../Redux/constants';
import * as Api from '../api/api';
import filter from '../Components/filter';
import * as selector from './selector';
/**
 * used for async fetches w/ no data to pass
 */
async function fetchAsync(func) { // eslint-disable-line no-unused-vars
    const response = await func();
    return response;
}
/**
 * used for async fetches with data to pass
 */
async function fetchAsyncSave(func, data) { // eslint-disable-line no-unused-vars
    const response = await func(data);
    return response;
}
/**
 * Sets product data obtained from fetch
 */
export function* setProductsAsync() {
    try {
        const data = yield call(Api.fetchProducts);
        yield put(setProducts(data));
    } catch (err) {
        let error = []
        if (err === 500) {
            error.push('Database unavailable, please try again later.');
            yield put(setError(error));
        } else if (err === 409) {
            error.push('Conflict, try refreshing the page.');
            yield put(setError(error));
        } else if (err === 403) {
            error.push('Forbidden, you shall not pass.');
            yield put(setError(error));
        } else if (err === 401) {
            error.push('You are not authorized to perform this action.');
            yield put(setError(error));
        } else if (err === 400) {
            error.push('Oops, something went wrong please try again.');
            yield put(setError(error));
        } else {
            error.push('An unexpected has error has occurred, please try again.')
            yield put(setError(error));
        }
    }
}

/**
 * calls the backend to fetch all the products, 
 * calls the search-by value,
 * sorts through the data to get the data associated with the search
 * sets the searched-through filter to the db.
 */

export function* setSearchProductsAsync() {
    try {
        const data = yield call(Api.fetchProducts);
        const input = yield select(selector.searchBarInput);
        const searchData = filter.filterAll(input, data);
        yield put(setSearchData(searchData));
    } catch (err) {
        yield put(setError(err))
    }
}

/**
 * adds a product to the database,
 * but will add an error if the database responds with a 
 * status code other than "204"
 * 
 * currently, you must input a product, but we'll see.
 * @param {*} action 
 */
export function* addProductsAsync(action) {
    try {
        let product = action.payload;

        yield call(Api.addProd, product);

        // let data = yield call(Api.fetchProducts);
        // yield put(setProducts(data));
    } catch (err) {
        let error = []
        if (err === 500) {
            error.push('Database unavailable, please try again later.');
            yield put(setError(error));
        } else if (err === 409) {
            error.push('Conflict, try refreshing the page.');
            yield put(setError(error));
        } else if (err === 403) {
            error.push('Forbidden, you shall not pass.');
            yield put(setError(error));
        } else if (err === 401) {
            error.push('You are not authorized to perform this action.');
            yield put(setError(error));
        } else if (err === 400) {
            error.push('Oops, something went wrong please try again.');
            yield put(setError(error));
        } else {
            error.push('An unexpected has error has occurred, please try again.')
            console.log(err);
            yield put(setError(error));
        }
    }
}

/**
 * edits a product in the database.
 * the id is currently being inputted, however it will
 * change on later installments.
 * @param {*} id 
 */
export function* editProductsAsync(action) {
    try {
        yield call(Api.editProduct, action.payload);
    } catch (err) {
        let error = []
        if (err === 500) {
            error.push('Database unavailable, please try again later.');
            yield put(setError(error));
        } else if (err === 409) {
            error.push('Conflict, try refreshing the page.');
            yield put(setError(error));
        } else if (err === 403) {
            error.push('Forbidden, you shall not pass.');
            yield put(setError(error));
        } else if (err === 401) {
            error.push('You are not authorized to perform this action.');
            yield put(setError(error));
        } else if (err === 400) {
            error.push('Oops, something went wrong please try again.');
            yield put(setError(error));
        } else if (err === 404) {
            error.push('Could not find that product, are you sure it exists?');
            yield put(setError(error));
        } else {
            error.push('An unexpected has error has occurred, please try again.')
            yield put(setError(error));
        }
    }
}

/**
 * Deletes a product in the database,
 * currently the id is needed, but we'll see.
 * @param {*} id 
 */
export function* deleteProductsAsync(action) {
    try {
        yield call(Api.deleteProduct, action.payload);
        // let data = yield call(Api.fetchProducts);
        // yield put(setProducts(data));
    } catch (err) {
        let error = []
        if (err === 500) {
            error.push('Database unavailable, please try again later.');
            yield put(setError(error));
        } else if (err === 409) {
            error.push('Conflict, try refreshing the page.');
            yield put(setError(error));
        } else if (err === 403) {
            error.push('Forbidden, you shall not pass.');
            yield put(setError(error));
        } else if (err === 401) {
            error.push('You are not authorized to perform this action.');
            yield put(setError(error));
        } else if (err === 400) {
            error.push('Oops, something went wrong please try again.');
            yield put(setError(error));
        } else if (err === 404) {
            error.push('Could not find that product, are you sure it exists?');
            yield put(setError(error));
        } else {
            error.push('An unexpected has error has occurred, please try again.')
            yield put(setError(error));
        }
    }
}

/**
 * watches for the set customer call
 */
export function* watchSetProductsAsync() {
    yield takeEvery(constants.SET_PRODUCTS_ASYNC, setProductsAsync);
    yield takeEvery(constants.SEARCH_ASYNC, setSearchProductsAsync);
    yield takeEvery(constants.ADD_NEW_PRODUCT_ASYNC, addProductsAsync);
    yield takeEvery(constants.EDIT_PRODUCT_ASYNC, editProductsAsync);
    yield takeEvery(constants.DELETE_PRODUCT_ASYNC, deleteProductsAsync);
}
/**
 * calls api to fetche popular products from database
 */
export function* getPopularAsync() {
    try {
        const data1 = yield call(Api.getPop);
        yield put(getPopular(data1));
    } catch (err) {
        yield put(setError(err));
    }
}
/**
 * watches for get popular call
 */
export function* watchGetPopularAsync() {
    yield takeEvery(constants.GET_POP_ASYNC, getPopularAsync);
}