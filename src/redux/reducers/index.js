import {combineReducers} from 'redux';
import localeReducer from './localeReducer';
import loginReducer from './loginReducer';
import menuStateReducer from './menuStateReducer';
import profileReducer from './profileReducer';

export default combineReducers({
    menuState : menuStateReducer,
    locale : localeReducer,
    isLogin : loginReducer,
    userProfile : profileReducer
})