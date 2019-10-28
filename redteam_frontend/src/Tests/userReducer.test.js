import reducer from '../Redux/Reducers/userReducer';
import constants from '../Redux/constants';

const initState = {
    data: [],
    errors: [],
    infoToEdit: [],
    userToEdit: {},
    opener: false,
}
let user = {
    id: 1,
    firstName: "test",
    lastName: "user",
}
let user2 = {
    id: 2,
    firstName: "test",
    lastName: "user2",
}
let users = [{id: 1, name: 'guy'}, {id:2, name:'buddy'}];
let flag = "test flag";
let err = "err";
describe('user reducer', () => {
    it('should return the inital state', () => {
        expect(reducer(initState, {})).toEqual(initState)
    });
    it('should set an error', () => {
        const expectedState = {
            data: [],
            errors: [err],
            infoToEdit: [],
            userToEdit: {},
            opener: false,
            modalInfo: []
        }
        expect(reducer([], {
            type: constants.SET_USER_ERROR,
            payload: err
        })).toEqual({errors: err});
    })
    it('should set users', () => {
        expect(reducer([], {
            type: constants.SET_USERS,
            payload: users
        })).toEqual({ data: users })
    })
    it('should handle modal', () => {
        expect(reducer([], {
            type: constants.HANDLE_USER_MODAL,
            payload: flag
        })).toEqual({ opener: flag })
    })
    
    it('should set user info for editing', () => {
        expect(reducer([], {
            type: constants.SET_USER_INFO_TO_EDIT,
            payload: user
        })).toEqual({ infoToEdit: user })
    })
    
    it('should handle modal', () => {
        expect(reducer([], {
            type: constants.SET_MODAL_INFO,
            payload: user
        })).toEqual({ modalInfo: user })
    })
})