import {combineReducers} from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
import postReducer from './postReducer';
import uiReducer from './ui';

export default combineReducers({
	profile: profileReducer,
	auth: authReducer,
	errors: errorReducer,
	post: postReducer,
	ui: uiReducer
})