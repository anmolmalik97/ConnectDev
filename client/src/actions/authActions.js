import * as actionTypes from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import {uiStartLoading,uiStopLoading} from './ui';


// register user
export const registerUser = (userData,history) => {
	return dispatch => {
		dispatch(uiStartLoading());
		axios.post('/api/users/register',userData)
			.then(res => {
				dispatch(uiStopLoading());
				history.push('/login');
				dispatch({
					type: actionTypes.GET_ERRORS,
					payload: {}
				})
				})
			.catch(err => {
				dispatch(uiStopLoading());
				dispatch({
					type: actionTypes.GET_ERRORS,
					payload: err.response.data
				})
			})
	}
}

// Login User

export const loginUser = (userData) => {
	return dispatch => {
		dispatch(uiStartLoading());
		axios.post('api/users/login',userData)
			.then(res => {
				// save to localstorage
				dispatch(uiStopLoading());
				const {token} = res.data;
				localStorage.setItem('jwtToken',token);
				//set token to auth header
				setAuthToken(token);
				// decode token to get user data
				const decoded = jwt_decode(token);
				// set current user
				dispatch(setCurrentUser(decoded));
				dispatch({
				type: actionTypes.GET_ERRORS,
				payload: {}
			})
			})
			.catch(err => {
				dispatch(uiStopLoading());
				dispatch({
					type: actionTypes.GET_ERRORS,
					payload: err.response.data
				})
			})
	}
};

// set logged in user

export const setCurrentUser = decoded => {
	return {
		type: actionTypes.SET_CURRENT_USER,
		payload: decoded
	}

}

export const logoutUser = () => dispatch => {
	// remove from local
	localStorage.removeItem('jwtToken');
	// remove auth header
	setAuthToken(false);
	// set current user to { } object
	dispatch(setCurrentUser({}));
}