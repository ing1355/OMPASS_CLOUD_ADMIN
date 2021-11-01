import {combineReducers} from 'redux';
import localeReducer from './localeReducer';
import menuStateReducer from './menuStateReducer';

export default combineReducers({
    menuState : menuStateReducer,
    locale : localeReducer
})