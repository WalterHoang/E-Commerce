import constants from '../constants';
/**
 * handles modal
 * @param {*} flag 
 */
export const handleModal = (flag) => {
    return {
        type: constants.HANDLE_MODAL,
        payload: flag
    }
}

/**
 * handles editing
 * @param {*} flag 
 */
export const setEditing = (flag) => {
    return {
        type: constants.SET_EDITING,
        payload: flag
    }
}
/**
 * sets if admin
 * @param {*} flag 
 */
export const setAdmin = (flag) => {
    return {
        type: constants.SET_ADMIN,
        payload: flag
    }
}
/**
 * sets role
 * @param {*} role 
 */
export const setRole = (role) => {
    return {
        type: constants.SET_ROLE,
        payload: role
    }
}
/**
 * sets products data
 * @param {Array} data 
 */
export const setProducts = (data) => {

    return {
        type: constants.SET_PRODUCTS,
        payload: data
    }
}
/**
 * async call to fetch products
 */
export const setProductsAsync = () => {
    return {
        type: constants.SET_PRODUCTS_ASYNC
    }
}
/**
 * sets an error
 * @param {*} err 
 */
export const setError = (err) => {
    return {
        type: constants.SET_ERROR,
        payload: err
    }
}
/**
 * sets product to be edited
 * @param {*} data 
 */
export const setProductToEdit = (data) => {
    return {
        type: constants.SET_PRODUCT_TO_EDIT,
        payload: data
    }
}
/**
 * sets product info to be edited
 * @param {*} data 
 */
export const setProductInfoToEdit = (data) => {
    return {
        type: constants.SET_PRODUCT_INFO_TO_EDIT,
        payload: data
    }
}
/**
 * add new product async call
 * @param {*} product 
 */
export const addNewProductAsync = (product) => {
    return {
        type: constants.ADD_NEW_PRODUCT_ASYNC,
        payload: product
    }
}
/**
 * edit product async call
 * @param {*} product 
 */
export const editProductAsync = (product) => {
    return {
        type: constants.EDIT_PRODUCT_ASYNC,
        payload: product,
    }
}
/**
 * delete product async call
 * @param {*} id 
 */
export const deleteProductAsync = (id) => {
    return {
        type: constants.DELETE_PRODUCT_ASYNC,
        payload: id,
    }
}
/**
 * set new data from a filter
 * @param {*} data 
 */
export const setFilteredData = (data) => {
    return {
        type: constants.SET_FILTERED_DATA,
        payload: data,
    }
}
/**
 * set product modal info
 * @param {*} data 
 */
export const setModalInfo = (data) => {
    return {
        type: constants.SET_MODAL_INFO,
        payload: data,
    }
}
/**
 * set data from a search
 * @param {*} data 
 */
export const setSearchData = (data) => {
    return {
        type: constants.SET_SEARCH_BAR_DATA,
        payload: data,
    }
}
/**
 * clear search data 
 */
export const resetSearchData = () => {
    return {
        type: constants.EMPTY_SEARCH_DATA,
    }
}

/**
 * Sets the search term as an input value.
 * @param {*} input 
 */

export const searchDataInput = (input) => {
    return {
        type: constants.SEARCH_INPUT_SET,
        payload: input
    }
}

/**
 * calls the fetch from the backend.
 */

export const searchDataAsync = () => {
    return {
        type: constants.SEARCH_ASYNC,
    }
}
/**
 * sets popular products using data obtained from api fetch
 */
export const getPopular = (data) => {
    return {
        type: constants.GET_POP,
        payload: data
    }
}
/**
 * gets popular products from api (activates sagas)
 */
export const getPopularAsync = () => {
    return {
        type: constants.GET_POP_ASYNC,
    }
}