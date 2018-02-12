import { combineReducers } from 'redux';
import UserReducer from './UserReducer';
import MainReducer from './MainReducer';
import AuthReducer from './AuthReducer';
import EmployerReducer from './EmployerReducer';
import ContractorReducer from './ContractorReducer';

export default {
    user: UserReducer,
		main: MainReducer,
		auth: AuthReducer,
		employer: EmployerReducer,
		contractor: ContractorReducer
};
