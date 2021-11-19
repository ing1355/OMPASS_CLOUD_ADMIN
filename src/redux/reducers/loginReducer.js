import types from '../types';

const isLogin = localStorage.getItem('Authorization') ? true : false;

const loginReducer = (state = isLogin, action) => {
    switch (action.type) {
        case types.setIsLogin:
            return action.payload;
        default:
            return state;
    }
};

export function setIsLogin(info) {
    return {
        type: types.setIsLogin,
        payload: info
    };
}

export default loginReducer;