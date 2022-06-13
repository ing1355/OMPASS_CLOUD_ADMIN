import types from '../types';
import jwt_decode from 'jwt-decode';

let userProfile = {
    adminId: null,
    email: null,
    role: null,
    country: null,
    ompass: false,
    firstName: null,
    lastName: null,
    standalone: false
};

try {
    if(localStorage.getItem('Authorization')) {
        userProfile = jwt_decode(localStorage.getItem('Authorization').split(' ')[1]).access_token
    }
} catch(e) {
    console.log(e)
    localStorage.clear()
    window.location.reload()
}

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