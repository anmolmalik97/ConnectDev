import axios from 'axios';
import * as actionTypes from './types';

// get current profile

export const getCurrentProfile = () => dispatch => {
	dispatch(setProfileLoading());
	axios.get('/api/profile')
		.then(res => dispatch({
			type: actionTypes.GET_PROFILE,
			payload: res.data
		}))
		.catch(err => dispatch({
			type: actionTypes.GET_PROFILE,
			payload: {}
		}))
}

// profile loading
export const setProfileLoading = () => {
	return {
		type: actionTypes.PROFILE_LOADING
	}
}

// clear profile
export const clearCurrentProfile = () => {
	return {
		type: actionTypes.CLEAR_CURRENT_PROFILE
	}
}