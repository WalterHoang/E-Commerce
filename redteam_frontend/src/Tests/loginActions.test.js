import * as actions from '../Redux/Actions/loginActions';
import constants from '../Redux/constants';

describe('loginActions', () => {
    let credentials = {
        email: 'admin@catalyte.io',
        password: 'pass@word1'
    };
    let token = 'e';
    let error = 'error';
    it("should create a login action", () => {
        const expectedAction = {
            type: constants.INIT_LOGIN_ASYNC,
            data: credentials,
            email: credentials.email
        }
        expect(actions.initLoginAsync(credentials, credentials.email))
            .toEqual(expectedAction)
    })
    it('should create a login action', () => {
        const expectedAction = {
            type: constants.INIT_LOGIN,
            data: token
        };
        expect(actions.initLogin(token)).toEqual(expectedAction);
    })
    it('should set an error', () => {
        const expectedAction = {
            type: constants.LOAD_ERROR,
            payload: error
        };
        expect(actions.fetchError(error)).toEqual(expectedAction);
    })
    it('should create a redirect action', () => {
        const expectedAction = {
            type: constants.REDIRECT
        };
        expect(actions.redirect()).toEqual(expectedAction);
    })
    it('should create a no redirect action', () => {
        const expectedAction = {
            type: constants.NO_REDIRECT
        };
        expect(actions.noRedirect()).toEqual(expectedAction);
    })
})