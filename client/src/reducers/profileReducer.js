import * as actionTypes from '../actions/types'

const initialState = {
	profile: null,
	profiles: null,
	loading: false
}

const reducer = (state = initialState,action) => {
	switch(action.type) {
		case actionTypes.PROFILE_LOADING:
			return {
				...state,
				loading: true
			}
		case actionTypes.GET_PROFILE:
			return {
				...state,
				loading: false,
				profile: action.payload
			}
		case actionTypes.CLEAR_CURRENT_PROFILE:
			return {
				...state,
				profile: null
			}
		case actionTypes.GET_PROFILES:
			return{
				...state,
				profiles: action.payload,
				loading: false
			}
		default:
			return state;
	}
}

export default reducer;