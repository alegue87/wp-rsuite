import 'whatwg-fetch';
import config from '../../config/config';

export const REQUEST_PRODUCTS = 'REQUEST_PRODUCTS';
export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS';

export const requestProducts = () => ({
  type: REQUEST_PRODUCTS,
});

export const receiveProducts = products => ({
  type: RECEIVE_PRODUCTS,
  products,
});

export const fetchProducts = (params = {}) => (dispatch) => {
  dispatch(requestProducts());

  let url;
  if (params && params.id) {
    url = config.API_PRODUCT_URL + String(params.id);
  } else {
    url =
      '' +
      '?' +
      Object.keys(params)
        .map(k => k + '=' + encodeURIComponent(params[k]))
        .join('&');
  }
  // @TO_FIX
  url = 'https://fgm.netsons.org/wp-json/wc/store/products/'

  return fetch(url)
    .then(response => response.json())
    .then(json => dispatch(receiveProducts(json)))
    .catch(() => {
      dispatch(receiveProducts([]));
    });
};
