import 'whatwg-fetch';
import config from '../../config/config'

export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES'
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'

const request_categories = () => {
	return {
		type: REQUEST_CATEGORIES
	}
}

const receive_categories = (categories) => {
	return {
		type: RECEIVE_CATEGORIES,
		categories
	}
}

export const fetchCategories = (params = {}) => (dispatch) => {
	dispatch(request_categories())

	return fetch(config.API_CATEGORIES_URL)
		.then( response => response.json() )
		.then( json => dispatch(receive_categories(json)) )
		.catch( (error) => dispatch(receive_categories([])) )
}