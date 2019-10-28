import loginReducers from '../Redux/Reducers/loginReducers';
import constants from '../Redux/constants';
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
const testToke = "e";
const error = "error";
const role = "ADMIN";

describe("Test that the login reducer reduces", () => {
    it("should return the initial state", () => {
        expect(loginReducers(initState, {}))
            .toEqual(initState);
    })
    it("should log in a user successfully", () => {
        const expectedState = {
            email: '',
            password: '',
            user: {},
            token: "e",
            role: '',
            redirect: false,
            err: '',
            creds: {}
        };
        expect(loginReducers(initState, {
            type: constants.INIT_LOGIN,
            data: testToke
        }))
            .toEqual(expectedState);
    })
    it("should get a user role", () => {
        const expectedState = {
            email: '',
            password: '',
            user: {},
            token: '',
            role: 'ADMIN',
            redirect: true,
            err: '',
            creds: {}
        };
        expect(loginReducers(initState, {
            type: constants.GET_ROLE,
            data: role
        }))
            .toEqual(expectedState);
    })
    it("should redirect a user", () => {
        const expectedState = {
            email: '',
            password: '',
            user: {},
            token: '',
            role: '',
            redirect: true,
            err: '',
            creds: {}
        };
        expect(loginReducers(initState, {
            type: constants.REDIRECT,
        }))
            .toEqual(expectedState);
    })
    it("should not redirect a user", () => {
        const startingState = {
            email: '',
            password: '',
            user: {},
            token: '',
            role: '',
            redirect: true,
            err: '',
            creds: {}
        };
        const expectedState = {
            email: '',
            password: '',
            user: {},
            token: '',
            role: '',
            redirect: false,
            err: '',
            creds: {}
        };
        expect(loginReducers(startingState, {
            type: constants.NO_REDIRECT
        }))
            .toEqual(expectedState);
    })
    it("should load an error", () => {
        const expectedState = {
            email: '',
            password: '',
            user: {},
            token: '',
            role: '',
            redirect: false,
            err: "error",
            creds: {}
        };
        expect(loginReducers(initState, {
            type: constants.LOAD_ERROR,
            payload: error
        }))
            .toEqual(expectedState);
    })
})