import * as actions from '../Redux/Actions/burgerActions';
import constants from '../Redux/constants';
import { isTSAnyKeyword } from '@babel/types';

describe('burgerActions', () => {
    let flag = true;
    it("should create a burger action", () => {
        const expectedAction = {
            type: constants.SHOW_MEN,
            payload: flag
        }
        expect(actions.showMen(flag))
            .toEqual(expectedAction)
    })
    it("should create a burger action", () => {
        const expectedAction = {
            type: constants.SHOW_WOMEN,
            payload: flag
        }
        expect(actions.showWomen(flag))
            .toEqual(expectedAction)
    })
    it("should create a burger action", () => {
        const expectedAction = {
            type: constants.SHOW_CHILDREN,
            payload: flag
        }
        expect(actions.showChildren(flag))
            .toEqual(expectedAction)
    })
    flag = false;
    it("should create a burger action", () => {
        const expectedAction = {
            type: constants.SHOW_MEN,
            payload: flag
        }
        expect(actions.showMen(flag))
            .toEqual(expectedAction)
    })
    it("should create a burger action", () => {
        const expectedAction = {
            type: constants.SHOW_WOMEN,
            payload: flag
        }
        expect(actions.showWomen(flag))
            .toEqual(expectedAction)
    })
    it("should create a burger action", () => {
        const expectedAction = {
            type: constants.SHOW_CHILDREN,
            payload: flag
        }
        expect(actions.showChildren(flag))
            .toEqual(expectedAction)
    })
})