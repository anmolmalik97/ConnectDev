import * as actionTypes from '../actions/types';
import isEmpty from '../validation/is-empty'

const initialstate = {
	isAuthenticated: false,
	user: {}
}

export default function(state=initialstate,action) {
	switch(action.type) {
		case actionTypes.SET_CURRENT_USER:
			return {
				...state,
				isAuthenticated: !isEmpty(action.payload),
				user: action.payload

			}
		default:
			return state;
	}
}