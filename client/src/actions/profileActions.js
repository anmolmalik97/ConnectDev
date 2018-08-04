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

// create profile
export const createProfile = (profileData,history) =>dispatch => {
	axios.post('/api/profile',profileData)
		.then(res => history.push('dashboard'))
		.catch(err=> dispatch({
			type: actionTypes.GET_ERRORS,
			payload: err.response.data
		}))
}

// clear profile
export const clearCurrentProfile = () => {
	return {
		type: actionTypes.CLEAR_CURRENT_PROFILE
	}
}

