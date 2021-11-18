import axios from "axios";

export function CustomAxiosGet(url, successCallback, errorCallback, config) {
    return axios.get(url, {...config,
        headers: {
            Authorization: localStorage.getItem('Authorization')
        }}).then(res => {
        if(successCallback) successCallback(res.data.data);
    }).catch(err => {
        if(errorCallback) errorCallback();
    })
}

export function CustomAxiosPost(url, params, successCallback, errorCallback, config) {
    return axios.post(url, params, {headers: {
        Authorization: localStorage.getItem('Authorization')
    }, ...config}).then(res => {
        if(url.includes('login')) localStorage.setItem('Authorization',res.headers.authorization);
        if(successCallback) successCallback(res.data);
    }).catch(err => {
        if(errorCallback) errorCallback();
    })
}