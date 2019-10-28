import constants from '../constants';
const initState = {
    email: '',
    password: '',
    user: {},
    token: '',
    role: '',
    redirect: false,
    err: '',
    creds: {}
}
/**
 * Modifies the login store
 * @param {Object} state 
 * @param {Object} action 
 */
export default function loginReducer(state = initState, action) {
    switch (action.type) {
        case constants.INIT_LOGIN: {
            return {
                ...state,
                token: action.data,
            }
        }
        case constants.GET_ROLE: {
            return {
                ...state,
                role: action.data,
                redirect: true
            }
        }
        case constants.REDIRECT: {
            return {
                ...state,
                redirect: true
            }
        }
        case constants.NO_REDIRECT: {
            return {
                ...state,
                redirect: false
            }
        }
        case constants.LOAD_ERROR: {
            return {
                ...state,
                err: action.payload
            }
        }
        default: {
            return state;
        }
    }
}