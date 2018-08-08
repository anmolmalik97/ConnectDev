import * as actionTypes from '../actions/types';


const initialState = {
	post: {},
	posts: [],
	loading: false
};


export default function(state=initialState,action){
	switch(action.type){
		case actionTypes.POST_LOADING:
			return {
				...state,
				loading: true
			}
		case actionTypes.ADD_POST:
			return{
				...state,
				posts: [action.payload,...state.posts],

			}
		case actionTypes.GET_POST:
			return{
				...state,
				post: action.payload
			}
		case actionTypes.GET_POSTS:
			return{
				...state,
				posts: action.payload,
				loading: false

			}
		case actionTypes.DELETE_POST:
			return{
				...state,
				posts: state.posts.filter(post => post._id!=action.payload)
			}
		default:
			return state;
	}
}