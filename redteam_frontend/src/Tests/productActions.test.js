import * as actions from '../Redux/Actions/productActions'
import constants from '../Redux/constants'
/**
 * tests all the product actions
 */
describe('product actions', () => {
    const products = [{ name: 'Weed Killer', sku: 12345123, price: 15.99 }, { name: 'Water', sku: 12367812, price: 12.99 }]
    const product = { name: 'Weed Killer', sku: 12345123, price: 15.99 }
    const input = 'Weed Killer';
    //set products
    it('should create an action to set products', () => {
        const expectedAction = {
            type: constants.SET_PRODUCTS,
            payload: products
        };
        expect(actions.setProducts(products)).toEqual(expectedAction)
    });
    //set product async
    it('should create action for the products async', () => {
        const expectedAction = {
            type: constants.SET_PRODUCTS_ASYNC
        };
        expect(actions.setProductsAsync()).toEqual(expectedAction)
    })
    //open modal
    it('should create action to open modal', () => {
        const expectedAction = {
            type: constants.HANDLE_MODAL,
            payload: true
        };
        expect(actions.handleModal(true)).toEqual(expectedAction)
    })
    //close modal
    it('should create action to close modal', () => {
        const expectedAction = {
            type: constants.HANDLE_MODAL,
            payload: false
        };
        expect(actions.handleModal(false)).toEqual(expectedAction)
    })
    //sets editing
    it('should create an action to set editing', () => {
        const expectedAction = {
            type: constants.SET_EDITING,
            payload: true
        };
        expect(actions.setEditing(true)).toEqual(expectedAction)
    })
    //set admin
    it('should create an action to set admin', () => {
        const expectedAction = {
            type: constants.SET_ADMIN,
            payload: true
        };
        expect(actions.setAdmin(true)).toEqual(expectedAction)
    })
    //sets role
    it('should create an action to set role', () => {
        const expectedAction = {
            type: constants.SET_ROLE,
            payload: '[ADMIN]'
        };
        expect(actions.setRole('[ADMIN]')).toEqual(expectedAction)
    })
    //sets error
    it('should create an action to set a new error', () => {
        const error = 'BAD BAD BAD'
        const expectedAction = {
            type: constants.SET_ERROR,
            payload: error
        };
        expect(actions.setError(error)).toEqual(expectedAction)
    })
    //sets product to edit
    it('should create an action to set product to be edited', () => {
        const expectedAction = {
            type: constants.SET_PRODUCT_TO_EDIT,
            payload: product
        };
        expect(actions.setProductToEdit(product)).toEqual(expectedAction)
    })
    it('shoudl create an action to set the product info to be edited', () => {
        const expectedAction = {
            type: constants.SET_PRODUCT_INFO_TO_EDIT,
            payload: product
        };
        expect(actions.setProductInfoToEdit(product)).toEqual(expectedAction)
    })
    it('should create an action to add a new product', () => {
        const expectedAction = {
            type: constants.ADD_NEW_PRODUCT_ASYNC,
            payload: product
        };
        expect(actions.addNewProductAsync(product)).toEqual(expectedAction)
    })
    it('should create an action to edit a products info', () => {
        const expectedAction = {
            type: constants.EDIT_PRODUCT_ASYNC,
            payload: product
        };
        expect(actions.editProductAsync(product)).toEqual(expectedAction)
    })
    it('shoudl create an action to delete a product', () => {
        const id = 5;
        const expectedAction = {
            type: constants.DELETE_PRODUCT_ASYNC,
            payload: id
        };
        expect(actions.deleteProductAsync(id)).toEqual(expectedAction)
    })
    it('should create an action to set product info to edit', () => {
        const expectedAction = {
            type: constants.SET_PRODUCT_TO_EDIT,
            payload: product
        };
        expect(actions.setProductToEdit(product)).toEqual(expectedAction);
    })
    it('should create an action to set product info to edit', () => {
        const expectedAction = {
            type: constants.SET_PRODUCT_INFO_TO_EDIT,
            payload: product
        };
        expect(actions.setProductInfoToEdit(product)).toEqual(expectedAction);
    })
    it('should create an action to get popular products', () => {
        const expectedAction = {
            type: constants.GET_POP,
            payload: products
        };
        expect(actions.getPopular(products)).toEqual(expectedAction);
    })
    it('should create an action to get popular products', () => {
        const expectedAction = {
            type: constants.GET_POP_ASYNC,
        };
        expect(actions.getPopularAsync(products)).toEqual(expectedAction);
    })
    it('should reset search data', () => {
        const expectedAction = {
            type: constants.EMPTY_SEARCH_DATA
        };
        expect(actions.resetSearchData()).toEqual(expectedAction);
    })
    it('should return search data input', () => {
        const expectedAction = {
            type: constants.SEARCH_INPUT_SET,
            payload: input
        };
        expect(actions.searchDataInput(input)).toEqual(expectedAction);
    })
})