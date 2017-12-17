import { combineReducers } from 'redux';
import UserReducer from './UserReducer';
import MainReducer from './MainReducer';
import AuthReducer from './AuthReducer';
import ContractorReducer from './ContractorReducer';

export default {
    user: UserReducer,
		main: MainReducer,
		auth: AuthReducer,
		contractor: ContractorReducer
};
