import types from '../types';
import jwt_decode from 'jwt-decode';
if(localStorage.getItem('Authorization')) console.log(jwt_decode(localStorage.getItem('Authorization').split(' ')[1]))
const userProfile = localStorage.getItem('Authorization') ? jwt_decode(localStorage.getItem('Authorization').split(' ')[1]).access_token : {
    adminId: null,
    email: null,
    role: null,
    country: null
};

const profileReducer = (state = userProfile, action) => {
    switch (action.type) {
        case types.setProfile:
            return action.payload;
        default:
            return state;
    }
};

export function setProfile(info) {
    return {
        type: types.setProfile,
        payload: info
    };
}

export default profileReducer;