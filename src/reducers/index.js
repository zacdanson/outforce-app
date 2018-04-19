import { combineReducers } from 'redux';
import UserReducer from './UserReducer';
import MainReducer from './MainReducer';
import AuthReducer from './AuthReducer';
import EmployerReducer from './EmployerReducer';
import ContractorReducer from './ContractorReducer';
import FirebaseDataReducer from './FirebaseDataReducer';
import CompanyReducer from './CompanyReducer';

export default {
    user: UserReducer,
		main: MainReducer,
		auth: AuthReducer,
		employer: EmployerReducer,
		contractor: ContractorReducer,
		firebaseData: FirebaseDataReducer,
		company: CompanyReducer
};
