import constants from '../constants';
/**
 * This function creates a login action object
 * to retrive a token
 * @param {Object} creds user credentials 
 * @param {String} email 
 */
export function initLoginAsync(creds, email) {
    return {
        type: constants.INIT_LOGIN_ASYNC,
        data: creds,
        email: email

    };
}
/**
 * This function creates a login action object
 * @param {String} token 
 */
export function initLogin(token) {
    return {
        type: constants.INIT_LOGIN,
        data: token,
    };
}
/**
 * This function creates an error action object
 * @param {*} err 
 */
export function fetchError(err) {
    return {
        type: constants.LOAD_ERROR,
        payload: err
    };
}
/**
 * This function creates a getRole action object
 * to retrieve a role from the api
 * @param {String} token 
 */
export function getRoleAsync(token) {
    return {
        type: constants.GET_ROLE_ASYNC,
        data: token
    };
}
/**
 * This function creates a getRole action object
 * @param {String} token 
 */
export function getRole(token) {
    return {
        type: constants.GET_ROLE,
        data: token,

    };
}
/**
 * This function creates a redirect action object
 */
export function redirect() {
    return {
        type: constants.REDIRECT,
    };
}
/**
 * This function creates a noRedirect action object
 */
export function noRedirect() {
    return {
        type: constants.NO_REDIRECT,
    };
}