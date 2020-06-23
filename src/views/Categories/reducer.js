import { combineReducers } from 'redux';
import { REQUEST_CATEGORIES, RECEIVE_CATEGORIES } from './actions'
import _ from 'lodash'

const items = (state = [], action) => {
	switch(action.type) {
		case REQUEST_CATEGORIES:
			return state;
		case RECEIVE_CATEGORIES:
			return _.unionBy(action.categories, state, 'id') // rimuove doppioni
		default:
			return state;
	}
}

export const getCategories = state => state.items 

export default combineReducers({
	items
})