import constants from '../constants';
/**
 * handles modal
 * @param {*} flag 
 */
export const handleModal = (flag) => {
    return {
        type: constants.HANDLE_USER_MODAL,
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
 * sets USERS data
 * @param {Array} data 
 */
export const setUsers = (data) => {

    return {
        type: constants.SET_USERS,
        payload: data
    }
}
/**
 * async call to fetch USERS
 */
export const setUsersAsync = () => {
    return {
        type: constants.SET_USERS_ASYNC
    }
}
/**
 * sets an error
 * @param {*} err 
 */
export const setUserError = (err) => {
    return {
        type: constants.SET_USER_ERROR,
        payload: err
    }
}
/**
 * sets users to be edited
 * @param {*} data 
 */
export const setUsersToEdit = () => {
    return {
        type: constants.SET_USER_TO_EDIT,
    }
}
/**
 * sets users info to be edited
 * @param {*} data 
 */
export const setUsersInfoToEdit = (data) => {
    return {
        type: constants.SET_USER_INFO_TO_EDIT,
        payload: data
    }
}
/**
 * add new users async call
 * @param {*} users 
 */
export const addNewUsersAsync = (users) => {
    return {
        type: constants.ADD_NEW_USER_ASYNC,
        payload: users
    }
}
/**
 * edit users async call
 * @param {*} users 
 */
export const editUsersAsync = (users) => {
    return {
        type: constants.EDIT_USER_ASYNC,
        payload: users,
    }
}
/**
 * delete users async call
 * @param {*} id 
 */
export const deleteUsersAsync = (id) => {
    return {
        type: constants.DELETE_USER_ASYNC,
        payload: id,
    }
}