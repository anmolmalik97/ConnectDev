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
		.then(res => {
			history.push('dashboard')
			dispatch({
					type: actionTypes.GET_ERRORS,
					payload: {}
				})
		})
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

// add exp

export const addExperience = (expData,history) => dispatch => {
	axios.post('api/profile/experience',expData)
		.then(res => {
			history.push('/dashboard')
			dispatch({
					type: actionTypes.GET_ERRORS,
					payload: {}
				})
		})
		.catch(err => dispatch({
			type: actionTypes.GET_ERRORS,
			payload: err.response.data
		}))
}

//  add exp

export const addEducation = (eduData,history) => dispatch => {
	axios.post('api/profile/education',eduData)
		.then(res => {
			history.push('/dashboard')
			dispatch({
					type: actionTypes.GET_ERRORS,
					payload: {}
				})
		})
		.catch(err => dispatch({
			type: actionTypes.GET_ERRORS,
			payload: err.response.data
		}))
}

// del exp

export const deleteExperience = (id) => dispatch => {
	axios.delete(`api/profile/experience/${id}`)
		.then(res => {
			dispatch({
					type: actionTypes.GET_PROFILE,
					payload: res.data
				})
		})
		.catch(err => dispatch({
			type: actionTypes.GET_ERRORS,
			payload: err.response.data
		}))
}

// del education

export const deleteEducation = (id) => dispatch => {
	axios.delete(`api/profile/education/${id}`)
		.then(res => {
			dispatch({
					type: actionTypes.GET_PROFILE,
					payload: res.data
				})
		})
		.catch(err => dispatch({
			type: actionTypes.GET_ERRORS,
			payload: err.response.data
		}))
}

// get all profiles

export const getProfiles = () => dispatch => {
	dispatch(setProfileLoading());
	axios.get('api/profile/all')
		.then(res => {
			dispatch({
					type: actionTypes.GET_PROFILES,
					payload: res.data
				})
		})
		.catch(err => dispatch({
			type: actionTypes.GET_PROFILES,
			payload: null
		}))
}

// delete account and profile

export const deleteAccount = () => dispatch => {
	if(window.confirm('Are You Sure? This cant be undone')){
		axios.delete('/api/profile')
			.then(res=> dispatch({
				type: actionTypes.SET_CURRENT_USER,
				payload: {}
			}))
			.catch(err => dispatch({
				type: actionTypes.GET_ERRORS,
				payload: err.response.data
			}))
	}
}


