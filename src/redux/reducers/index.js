import {combineReducers} from 'redux';
import localeReducer from './localeReducer';
import loginReducer from './loginReducer';
import menuStateReducer from './menuStateReducer';

export default combineReducers({
    menuState : menuStateReducer,
    locale : localeReducer,
    isLogin : loginReducer
})