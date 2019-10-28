import { combineReducers } from 'redux';
import lReducers from './Reducers/loginReducers';
import productReducer from './Reducers/productReducer';
import burgerReducers from './Reducers/burgerReducers';
import userReducer from './Reducers/userReducer';

//reducers being combined
const defaultReducer = combineReducers({
    loginStuff: lReducers,
    product: productReducer,
    burger: burgerReducers,
    users: userReducer,
});

export default defaultReducer;