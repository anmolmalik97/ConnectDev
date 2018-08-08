import * as actionTypes from '../actions/types';


initialState = {
	post: {},
	posts: [],
	loading: false
};


export default function(state=initialState,action){
	switch(action.type){
		case actionTypes.ADD_POST:
			return{
				...state,
				posts: [action.payload,...state.posts],
				
			}
		default:
			return state;
	}
}