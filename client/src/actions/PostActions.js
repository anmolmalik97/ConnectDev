import axios from 'axios';
import * as actionTypes from './types';

// add post
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


// get posts
export const getPosts => () => dispatch => {
	dispatch(setPostLoading());
	axios.get('/api/posts')
		.then(res => dispatch({
			type: actionTypes.GET_POSTS,
			payload: res.data
		}))
		.catch(err => dispatch({
			type: GET_POSTS,
			payload: null
		}))
}

// get post
export const getPost => id => dispatch => {
	dispatch(setPostLoading());
	axios.get(`/api/posts/${id}`)
		.then(res => dispatch({
			type: actionTypes.GET_POST,
			payload: res.data
		}))
		.catch(err => dispatch({
			type: GET_POST,
			payload: null
		}))
}

// delete post
export const deletePost => id => dispatch => {
	axios.delete(`/api/posts/${id}`)
		.then(res => dispatch({
			type: actionTypes.DELETE_POST,
			payload: id
		}))
		.catch(err => dispatch({
			type: actionTypes.GET_ERRORS,
			payload: err.response.data
		}))
}

// add like

export const addLike => id => dispatch => {
	axios.post(`/api/posts/like/${id}`)
		.then(res => dispatch(getPosts()))
		.catch(err => dispatch({
			type: actionTypes.GET_ERRORS,
			payload: err.response.data
		}))
}

// remove like

export const removeLike => id => dispatch => {
	axios.post(`/api/posts/unlike/${id}`)
		.then(res => dispatch(getPosts()))
		.catch(err => dispatch({
			type: actionTypes.GET_ERRORS,
			payload: err.response.data
		}))
}

// add comment

// add post
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

// set loading state

export const setPostLoading = () => {
	return {
		type: actionTypes.POST_LOADING
	}
}