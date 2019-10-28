import constants from '../constants';

const initState = {
    data: [],
    errors: [],
    infoToEdit: [],
    userToEdit: {},
    opener: false,
}


/**
 * Modifies user store
 * @param {Object} state 
 * @param {Object} action 
 */
function userReducer(state = initState, action) {
    
    switch (action.type) {
        case constants.HANDLE_USER_MODAL: {
            return Object.assign({}, state, {
                opener: action.payload,
            })
        }

        case constants.SET_USERS: {
            return Object.assign({}, state, {
                data: [...action.payload],
            })
        }
        case constants.SET_USER_INFO_TO_EDIT : {
            return Object.assign({}, state, {
                infoToEdit: action.payload
            })
        }
        case constants.SET_MODAL_INFO: {
            return Object.assign({}, state, {
                modalInfo: action.payload
            })
        }
        case constants.SET_USER_ERROR: {
            return Object.assign({}, state, {
                errors: action.payload
            })
        }
        default:
            return state
    }
}
export default userReducer;