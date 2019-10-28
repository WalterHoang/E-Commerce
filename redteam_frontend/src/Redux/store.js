import { createStore, compose, applyMiddleware } from 'redux';
import defaultReducer from './reducers.js';
import createSagaMiddleware from 'redux-saga';
import { watchLoginAsyn, watchGetRole } from '../Sagas/loginSagas.js';
import { watchAddNewUserAsync } from '../Sagas/signUpSagas.js';
import { watchSetProductsAsync, watchGetPopularAsync } from '../Sagas/productSagas.js'
import { watchSetUsersAsync } from '../Sagas/userSaga.js';

const sagaMiddleware = createSagaMiddleware();
//store setup
const store = createStore(defaultReducer,
	compose(
		applyMiddleware(sagaMiddleware),
		window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
	)
);
sagaMiddleware.run(watchGetPopularAsync);
sagaMiddleware.run(watchSetProductsAsync);
sagaMiddleware.run(watchLoginAsyn);
sagaMiddleware.run(watchGetRole);
sagaMiddleware.run(watchSetUsersAsync);
sagaMiddleware.run(watchAddNewUserAsync);
export default store;