import constants from '../constants';
/**
 * Creates a user
 * @param {Object} user 
 */
export const userSignup = (user) => {
    return {
        type: constants.USER_SIGNUP,
        payload: user
    }
}
/**
 * User creation async call
 * @param {Object} user 
 */
export const userSignupAsync = (user) => {
    return {
        type: constants.USER_SIGNUP_ASYNC,
        payload: user

    }
}
