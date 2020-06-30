import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, HashRouter , Route, Switch } from 'react-router-dom';
// Per utilizzare il router senza hash ( vedi google per differenza ) utilizzare
// BrowserRouter as Router
// L'HashRouter evita che la richiesta venga inoltrata backend.. come diff
import store from './configureStore';
import App from './App';
import Product from './views/Product';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import Home from './views/Home';
import Products from './views/Products';
import Categories from './views/Categories';
import Cart from './views/Cart';

/*
import Product from './views/Product';
import Search from './views/Search';

*/

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/categories" component={Categories} />
            <Route path="/category/:categId" component={Products} />
            <Route path="/product/:productId" component={Product} />
            <Route path="/search/:search" component={Search} />
            <Route path="/cart" component={Cart} />
          </Switch>
        </App>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

function Search(argument) {
  // body...
}
