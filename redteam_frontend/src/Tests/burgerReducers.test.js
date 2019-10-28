import burgerReducers from '../Redux/Reducers/burgerReducers';
import constants from '../Redux/constants';
import expectExport from 'expect';
const initState = {
    flagM: null,
    flagW: null,
    flagC: null
}
const flagT= true;
const flagF = false;
describe("Test that the burger reducer reduces",()=>{
    it("should return the initial state", ()=>{
        expect(burgerReducers(initState,{}))
        .toEqual(initState);
    })
    it("should open men's nav options",()=>{
        const expectedState = {
            flagM: true,
            flagW: null,
            flagC: null
        };
        expect(burgerReducers(initState,{
            type: constants.SHOW_MEN,
            payload: flagT
        }))
        .toEqual(expectedState);
    })
    it("should close men's nav options",()=>{
        const expectedState = {
            flagM: false,
            flagW: null,
            flagC: null
        };
        expect(burgerReducers(initState,{
            type: constants.SHOW_MEN,
            payload: flagF
        }))
        .toEqual(expectedState);
    })
    it("should open women's nav options",()=>{
        const expectedState = {
            flagM: null,
            flagW: true,
            flagC: null
        };
        expect(burgerReducers(initState,{
            type: constants.SHOW_WOMEN,
            payload: flagT
        }))
        .toEqual(expectedState);
    })
    it("should close women's nav options",()=>{
        const expectedState = {
            flagM: null,
            flagW: false,
            flagC: null
        };
        expect(burgerReducers(initState,{
            type: constants.SHOW_WOMEN,
            payload: flagF
        }))
        .toEqual(expectedState);
    })
    it("should open CHILDREN's nav options",()=>{
        const expectedState = {
            flagM: null,
            flagW: null,
            flagC: true
        };
        expect(burgerReducers(initState,{
            type: constants.SHOW_CHILDREN,
            payload: flagT
        }))
        .toEqual(expectedState);
    })
    it("should open CHILDREN's nav options",()=>{
        const expectedState = {
            flagM: null,
            flagW: null,
            flagC: false
        };
        expect(burgerReducers(initState,{
            type: constants.SHOW_CHILDREN,
            payload: flagF
        }))
        .toEqual(expectedState);
    })
})