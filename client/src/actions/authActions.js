import * as actionTypes from './types'


// register user
export const registerUser = (userData) => {
	return{
		type: actionTypes.TEST_DISPATCH,
		payload: userData
	}
}