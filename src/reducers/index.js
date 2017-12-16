import { combineReducers } from 'redux';
import UserReducer from './UserReducer';
import MainReducer from '../reducers/MainReducer';
import AuthReducer from '../reducers/AuthReducer';

export default {
    user: UserReducer,
		main: MainReducer,
		auth: AuthReducer
};
