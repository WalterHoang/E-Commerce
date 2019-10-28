import reducer from '../Redux/Reducers/productReducer';
import constants from '../Redux/constants';
/**
 * tests all the product reducers
 */
const initState = {
    data: [],
    editing: false,
    errors: [],
    popular: [],
    filteredData: [],
    searchBarData: [],
    infoToEdit: [],
    prodToEdit: {},
    modalInfo: {},
    open: false,
    searchInput: null
}
const products = [{ name: 'Weed Killer', sku: 12345123, price: 15.99 }, { name: 'Water', sku: 12367812, price: 12.99 }]
const product = { name: 'Weed Killer', sku: 12345123, price: 15.99 }
const error = 'bad touch'
describe('product reducer', () => {
    it('should return the inital state', () => {
        expect(reducer(undefined, {})).toEqual(initState)
    });
    it('should set modal to open', () => {
        expect(reducer([], {
            type: constants.HANDLE_MODAL,
            payload: true
        })).toEqual({ open: true })
    })
    it('should set modal to close', () => {
        expect(reducer([], {
            type: constants.HANDLE_MODAL,
            payload: false
        })).toEqual({ open: false })
    })
    it('should set products', () => {
        expect(reducer([], {
            type: constants.SET_PRODUCTS,
            payload: products
        })).toEqual({ data: products })
    })
    it('set the modal for editing', () => {
        expect(reducer([], {
            type: constants.SET_EDITING,
            payload: true
        })).toEqual({ editing: true })
    })
    it('allows admin privs', () => {
        expect(reducer([], {
            type: constants.SET_ADMIN,
            payload: true
        })).toEqual({ admin: true })
    })
    it('set role', () => {
        expect(reducer([], {
            type: constants.SET_ROLE,
            payload: '[ADMIN]'
        })).toEqual({ role: '[ADMIN]' })
    })
    it('should set the product to edit', () => {
        expect(reducer([], {
            type: constants.SET_PRODUCT_TO_EDIT,
            payload: product
        })).toEqual({ prodToEdit: product })
    })
    it('should set the product to edit', () => {
        expect(reducer([], {
            type: constants.SET_PRODUCT_INFO_TO_EDIT,
            payload: product
        })).toEqual({ infoToEdit: product })
    })
    it('shoudl set a new error', () => {
        expect(reducer([], {
            type: constants.SET_ERROR,
            payload: error
        })).toEqual({ errors: error })
    })
    it('should set modal info', () => {
        expect(reducer([], {
            type: constants.SET_MODAL_INFO,
            payload: product
        })).toEqual({ modalInfo: product })
    })
    it('should set filtered data', () => {
        expect(reducer([], {
            type: constants.SET_FILTERED_DATA,
            payload: [product]
        })).toEqual({ filteredData: [product] })
    })
    it('should set search bar data', () => {
        expect(reducer([], {
            type: constants.SET_SEARCH_BAR_DATA,
            payload: ['weed killer']
        })).toEqual({
            searchBarData: ['weed killer'],
            searchInput: null,
            errors: [],
        })
    })
    it('should empty search data', () => {
        expect(reducer([], {
            type: constants.EMPTY_SEARCH_DATA
        })).toEqual({ searchBarData: [] })
    })
    it('should set search input', () => {
        expect(reducer([], {
            type: constants.SEARCH_INPUT_SET,
            payload: 'weed killer'
        })).toEqual({ searchInput: 'weed killer' })
    })
    it('should get popular data', () => {
        expect(reducer([], {
            type: constants.GET_POP,
            payload: products
        })).toEqual({ popular: products });
    })
})