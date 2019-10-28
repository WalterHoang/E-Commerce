import constants from '../constants';

const initState = {
    data: [],
    editing: false,
    errors: [],
    filteredData: [],
    searchBarData: [],
    infoToEdit: [],
    prodToEdit: {},
    modalInfo: {},
    open: false,
    searchInput: null,
    popular: []
}

/**
 * Modifies product store
 * @param {Object} state 
 * @param {Object} action 
 */
function productReducer(state = initState, action) {

    switch (action.type) {
        case constants.HANDLE_MODAL: {
            return Object.assign({}, state, {
                open: action.payload,
            })
        }

        case constants.SET_PRODUCTS: {
            return Object.assign({}, state, {
                data: [...action.payload],
            })
        }
        case constants.SET_EDITING: {
            return Object.assign({}, state, {
                editing: action.payload,
            })
        }
        case constants.SET_ADMIN: {
            return Object.assign({}, state, {
                admin: action.payload
            })
        }
        case constants.SET_ROLE: {
            return Object.assign({}, state, {
                role: action.payload
            })
        }
        case constants.SET_PRODUCT_TO_EDIT: {
            return Object.assign({}, state, {
                prodToEdit: action.payload
            })
        }
        case constants.SET_PRODUCT_INFO_TO_EDIT: {
            return Object.assign({}, state, {
                infoToEdit: action.payload
            })
        }
        case constants.SET_MODAL_INFO: {
            return Object.assign({}, state, {
                modalInfo: action.payload
            })
        }
        case constants.SET_ERROR: {
            return Object.assign({}, state, {
                errors: action.payload
            })
        }
        case constants.SET_FILTERED_DATA: {
            return Object.assign({}, state, {
                filteredData: action.payload
            })
        }
        case constants.SET_SEARCH_BAR_DATA: {
            return Object.assign({}, state, {
                searchBarData: action.payload,
                searchInput: null,
                errors: [],
            })
        }
        case constants.EMPTY_SEARCH_DATA: {
            return Object.assign({}, state, {
                searchBarData: [],
            })
        }

        case constants.SEARCH_INPUT_SET: {
            return Object.assign({}, state, {
                searchInput: action.payload,
            })
        }
        case constants.GET_POP: {
            return Object.assign({}, state, {
                popular: action.payload,
            })
        }
        default:
            return state
    }
}
export default productReducer;