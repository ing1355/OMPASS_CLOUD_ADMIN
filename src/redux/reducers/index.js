import {combineReducers} from 'redux';
import localeReducer from './localeReducer';
import loginReducer from './loginReducer';
import menuStateReducer from './menuStateReducer';
import profileReducer from './profileReducer';
import messageReducer from './messageReducer';
import termsOfPurchaseReducer from './TermsOfPurchaseReducer';

export default combineReducers({
    menuState : menuStateReducer,
    locale : localeReducer,
    isLogin : loginReducer,
    userProfile : profileReducer,
    msg: messageReducer,
    termsOfPurchaseVisible: termsOfPurchaseReducer
})