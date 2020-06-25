import { createStore, applyMiddleware } from 'redux';
import { persistCombineReducers, persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { reducer as toastr } from 'react-redux-toastr';
import thunk from 'redux-thunk';
// import logger from 'redux-logger';

import { createBrowserHistory } from "history";
import { routerMiddleware } from 'react-router-redux';

import products from './views/Products/reducer';
import categories from './views/Categories/reducer';

import config from './config/config';
import cart from './views/Cart/reducer';
import variations from './components/Variations/reducer';

/*
import reviews from './components/Reviews/reducer';
import search from './views/Search/reducer';
import navbar from './components/NavBar/reducer';
*/
const rootPersistConfig = {
  key: 'root',
  storage,
  blacklist: [/*
    'navbar',
    'search',
    'toastr',
    'reviews',
    */
    'categories', 
    'variations',
    'cart',
    'products',
  ],
  // debug: true,
};


const rootReducer = persistCombineReducers(rootPersistConfig, {
  categories: persistReducer(
    {
      key: 'categories',
      storage,
      blacklist: config.OFFLINE ? ['isFetching', 'hasMore'] : ['isFetching', 'hasMore', 'items'],
    },
    categories,
  ), 
  products: persistReducer(
    {
      key: 'products',
      storage,
      blacklist: config.OFFLINE ? ['isFetching', 'hasMore'] : ['isFetching', 'hasMore', 'items'],
    },
    products,
  ),
  variations: persistReducer(
    {
      key: 'variations',
      storage
    },
    variations
  ),
  cart: persistReducer(
    {
      key: 'cart',
      storage
    },
    cart
  ),
});


const history = createBrowserHistory();

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  undefined,
  applyMiddleware(thunk, routerMiddleware(history)),
);

persistStore(store);

export { history };
export default store;
