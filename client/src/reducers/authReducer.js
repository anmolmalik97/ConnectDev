import * as actionTypes from '../actions/types'

const initialstate = {
	isAuthenticated: false,
	user: {}
}

export default function(state=initialstate,action) {
	switch(action.type) {
		case actionTypes.TEST_DISPATCH:
			return {
				...state,
				user: action.payload
			}
		default:
			return state;
	}
}