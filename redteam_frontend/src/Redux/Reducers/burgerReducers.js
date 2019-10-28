import constants from '../constants';
const initState = {
    flagM: null,
    flagW: null,
    flagC: null
}
/**
 * Modifies the burger state - opens or closes particular navigation menus
 * @param {Object} state 
 * @param {Object} action 
 */
export default function burgerReducer(state = initState, action) {
    switch (action.type) {
        case constants.SHOW_MEN: {
            return {
                ...state,
                flagM: action.payload
            }
        }
        case constants.SHOW_WOMEN: {
            return {
                ...state,
                flagW: action.payload
            }
        }
        case constants.SHOW_CHILDREN: {
            return {
                ...state,
                flagC: action.payload
            }
        }
        default: {
            return state;
        }
    }
}