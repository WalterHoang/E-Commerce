import { setProductsAsync, setSearchProductsAsync, addProductsAsync, editProductsAsync, deleteProductsAsync, getPopularAsync } from '../Sagas/productSagas';
import * as selector from '../Sagas/selector';
import * as actions from '../Redux/Actions/productActions';
import * as ProductApi from '../api/api';
import Filters from '../Components/filter';
import sinon from 'sinon';
import { runSaga } from 'redux-saga';

describe('product saga test', () => {
    let products = [{ name: 'Weed Killer', sku: 12345123, price: 15.99 }, { name: 'Water', sku: 12367812, price: 12.99 }]
    let product = { name: 'Weed Killer', sku: 12345123, price: 15.99 };
    let newProd = { name: 'Weed Killer MK2', sku: 54321123, price: 16.09 };
    let error = 'bad touch'
    let dispatched = [];
    let stub;
    afterEach(() => {
        stub.restore();
        dispatched = [];
    })
    // it('should add a product', async () =>{
    //     stub = sinon.stub(ProductApi, 'addProd').callsFake(()=> Promise.resolve());
    //     await runSaga({
    //         dispatch: (action) => dispatched.push(action)
    //     }, addProductsAsync, actions.addNewProductAsync(newProd)).done;
    //     expect(dispatched[0]).toEqual(actions.)
    // })
    it('should give a database error on add a product', async () => {
        stub = sinon.stub(ProductApi, 'addProd').throws(500);
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, addProductsAsync, actions.addNewProductAsync(newProd)).done;
        expect(dispatched[0]).toEqual(actions.setError(['Database unavailable, please try again later.']))
    })
    it('should throw a conflict error on add a product', async () => {
        stub = sinon.stub(ProductApi, 'addProd').throws(409);
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, addProductsAsync, actions.addNewProductAsync(newProd)).done;
        expect(dispatched[0]).toEqual(actions.setError(['Conflict, try refreshing the page.']))
    })
    it('should throw a forbidden error on add a product', async () => {
        stub = sinon.stub(ProductApi, 'addProd').throws(403);
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, addProductsAsync, actions.addNewProductAsync(newProd)).done;
        expect(dispatched[0]).toEqual(actions.setError(['Forbidden, you shall not pass.']))
    })
    it('should throw a not authorized error on add a product', async () => {
        stub = sinon.stub(ProductApi, 'addProd').throws(401);
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, addProductsAsync, actions.addNewProductAsync(newProd)).done;
        expect(dispatched[0]).toEqual(actions.setError(['You are not authorized to perform this action.']))
    })
    it('should throw a 400 error on add a product', async () => {
        stub = sinon.stub(ProductApi, 'addProd').throws(400);
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, addProductsAsync, actions.addNewProductAsync(newProd)).done;
        expect(dispatched[0]).toEqual(actions.setError(['Oops, something went wrong please try again.']))
    })
    it('should have a unexpected error on add a product', async () => {
        stub = sinon.stub(ProductApi, 'addProd').throws(error)
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, addProductsAsync, actions.addNewProductAsync(newProd)).done;
        expect(dispatched[0]).toEqual(actions.setError(['An unexpected has error has occurred, please try again.']))
    })
    it('should set products', async () => {
        stub = sinon.stub(ProductApi, 'fetchProducts').callsFake(() => Promise.resolve(products));
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, setProductsAsync, actions.setProductsAsync()).done;
        expect(dispatched[0]).toEqual(actions.setProducts(products));
    })
    it('should give a database access error', async () => {
        stub = sinon.stub(ProductApi, 'fetchProducts').callsFake(() => Promise.reject(500));
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, setProductsAsync, actions.setProductsAsync()).done;
        expect(dispatched[0]).toEqual(actions.setError(['Database unavailable, please try again later.']));
    })
    it('should return a conflict error', async () => {
        stub = sinon.stub(ProductApi, 'fetchProducts').callsFake(() => Promise.reject(409));
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, setProductsAsync, actions.setProductsAsync()).done;
        expect(dispatched[0]).toEqual(actions.setError(["Conflict, try refreshing the page."]));
    })
    it('should return a forbidden error', async () => {
        stub = sinon.stub(ProductApi, 'fetchProducts').callsFake(() => Promise.reject(403));
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, setProductsAsync, actions.setProductsAsync()).done;
        expect(dispatched[0]).toEqual(actions.setError(["Forbidden, you shall not pass."]));
    })
    it('should return a not authorized error', async () => {
        stub = sinon.stub(ProductApi, 'fetchProducts').callsFake(() => Promise.reject(401));
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, setProductsAsync, actions.setProductsAsync()).done;
        expect(dispatched[0]).toEqual(actions.setError(["You are not authorized to perform this action."]));
    })
    it('should return a 400 error', async () => {
        stub = sinon.stub(ProductApi, 'fetchProducts').callsFake(() => Promise.reject(400));
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, setProductsAsync, actions.setProductsAsync()).done;
        expect(dispatched[0]).toEqual(actions.setError(["Oops, something went wrong please try again."]));
    })
    it('should give an unexpected error', async () => {
        stub = sinon.stub(ProductApi, 'fetchProducts').callsFake(() => Promise.reject(error));
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, setProductsAsync, actions.setProductsAsync()).done;
        expect(dispatched[0]).toEqual(actions.setError(['An unexpected has error has occurred, please try again.']));
    })
    // edit products
    it('should give a database error on edit a product', async () => {
        stub = sinon.stub(ProductApi, 'editProduct').throws(500);
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, editProductsAsync, actions.editProductAsync(product)).done;
        expect(dispatched[0]).toEqual(actions.setError(['Database unavailable, please try again later.']))
    })
    it('should throw a conflict error on edit a product', async () => {
        stub = sinon.stub(ProductApi, 'editProduct').throws(409);
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, editProductsAsync, actions.editProductAsync(product)).done;
        expect(dispatched[0]).toEqual(actions.setError(['Conflict, try refreshing the page.']))
    })
    it('should throw a forbidden error on edit a product', async () => {
        stub = sinon.stub(ProductApi, 'editProduct').throws(403);
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, editProductsAsync, actions.editProductAsync(product)).done;
        expect(dispatched[0]).toEqual(actions.setError(['Forbidden, you shall not pass.']))
    })
    it('should throw a not authorized error on edit a product', async () => {
        stub = sinon.stub(ProductApi, 'editProduct').throws(401);
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, editProductsAsync, actions.editProductAsync(product)).done;
        expect(dispatched[0]).toEqual(actions.setError(['You are not authorized to perform this action.']))
    })
    it('should throw a 400 error on edit a product', async () => {
        stub = sinon.stub(ProductApi, 'editProduct').throws(400);
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, editProductsAsync, actions.editProductAsync(product)).done;
        expect(dispatched[0]).toEqual(actions.setError(['Oops, something went wrong please try again.']))
    })
    it('should have a unexpected error on edit a product', async () => {
        stub = sinon.stub(ProductApi, 'editProduct').throws(error)
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, editProductsAsync, actions.editProductAsync(product)).done;
        expect(dispatched[0]).toEqual(actions.setError(['An unexpected has error has occurred, please try again.']))
    })
    //delete a product
    it('should give a database error on deleting a product', async () => {
        stub = sinon.stub(ProductApi, 'deleteProduct').throws(500);
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, deleteProductsAsync, actions.deleteProductAsync(1)).done;
        expect(dispatched[0]).toEqual(actions.setError(['Database unavailable, please try again later.']))
    })
    it('should throw a conflict error on deleting a product', async () => {
        stub = sinon.stub(ProductApi, 'deleteProduct').throws(409);
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, deleteProductsAsync, actions.deleteProductAsync(1)).done;
        expect(dispatched[0]).toEqual(actions.setError(['Conflict, try refreshing the page.']))
    })
    it('should throw a forbidden error on deleting a product', async () => {
        stub = sinon.stub(ProductApi, 'deleteProduct').throws(403);
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, deleteProductsAsync, actions.deleteProductAsync(1)).done;
        expect(dispatched[0]).toEqual(actions.setError(['Forbidden, you shall not pass.']))
    })
    it('should throw a not authorized error on deleting a product', async () => {
        stub = sinon.stub(ProductApi, 'deleteProduct').throws(401);
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, deleteProductsAsync, actions.deleteProductAsync(1)).done;
        expect(dispatched[0]).toEqual(actions.setError(['You are not authorized to perform this action.']))
    })
    it('should throw a 400 error on deleting a product', async () => {
        stub = sinon.stub(ProductApi, 'deleteProduct').throws(400);
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, deleteProductsAsync, actions.deleteProductAsync(1)).done;
        expect(dispatched[0]).toEqual(actions.setError(['Oops, something went wrong please try again.']))
    })
    it('should have a unexpected error on deleting a product', async () => {
        stub = sinon.stub(ProductApi, 'deleteProduct').throws(error)
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, deleteProductsAsync, actions.deleteProductAsync(1)).done;
        expect(dispatched[0]).toEqual(actions.setError(['An unexpected has error has occurred, please try again.']))
    })
    it('should return a filtered list', async () => {
        stub = sinon.stub(ProductApi, 'fetchProducts').callsFake(() => Promise.resolve(products));
        let stub2 = sinon.stub(selector, 'searchBarInput').callsFake(() => 'Weed killer');
        let stub3 = sinon.stub(Filters, 'filterAll').callsFake(() => product);
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, setSearchProductsAsync, actions.searchDataAsync()).done;
        expect(dispatched[0]).toEqual(actions.setSearchData(product));
        stub2.restore();
        stub3.restore();
    })
    it('should return an error on a filtered list', async () => {
        stub = sinon.stub(ProductApi, 'fetchProducts').callsFake(() => Promise.reject(error));
        let stub2 = sinon.stub(selector, 'searchBarInput').callsFake(() => 'Weed killer');
        let stub3 = sinon.stub(Filters, 'filterAll').callsFake(() => product);
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, setSearchProductsAsync, actions.searchDataAsync()).done;
        expect(dispatched[0]).toEqual(actions.setError(error));
        stub2.restore();
        stub3.restore();
    })
    // get popular products
    it('should return a list of popular products', async () => {
        stub = sinon.stub(ProductApi, 'getPop').callsFake(() => Promise.resolve(products));
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, getPopularAsync, actions.getPopularAsync()).done;
        expect(dispatched[0]).toEqual(actions.getPopular(products));
    })
    it('should return an error on get popular', async () => {
        stub = sinon.stub(ProductApi, 'getPop').callsFake(() => Promise.reject(error));
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, getPopularAsync, actions.getPopularAsync()).done;
        expect(dispatched[0]).toEqual(actions.setError(error));
    })
})