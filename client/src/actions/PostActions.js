import axios from 'axios';
import * as actionTypes from './types';


export const addPost => postData => dispatch => {
	axios.post('/api/posts',postData)
		.then(res => dispatch({
			type: actionTypes.ADD_POST,
			payload: res.data
		}))
		.catch(err => dispatch({
			type: actionTypes.GET_ERRORS,
			payload: err.response.data
		}))
}