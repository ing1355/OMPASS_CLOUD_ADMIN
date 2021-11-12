import types from '../types';

const isLogin = localStorage.getItem('isLogin');

export default (state = isLogin, action) => {
    switch (action.type) {
        case types.setIsLogin:
            if (action.payload) localStorage.setItem('isLogin', true);
            else localStorage.clear();
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