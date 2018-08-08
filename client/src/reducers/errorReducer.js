import * as actionTypes from '../actions/types'

const initialstate = {}

export default function(state=initialstate,action) {
	switch(action.type) {
		case actionTypes.GET_ERRORS:
			return action.payload;
		case actionTypes.CLEAR_ERRORS:
			return {}
		default:
			return state;
	}
}