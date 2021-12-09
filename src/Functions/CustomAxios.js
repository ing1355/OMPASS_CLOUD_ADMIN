import axios from "axios";

export function CustomAxiosGet(url, successCallback, errorCallback, config) {
    return axios.get(url, config).then(res => {
        if (successCallback) successCallback(res.data.data);
    }).catch(err => {
        if (errorCallback) errorCallback();
    })
}

export function CustomAxiosGetAll(urls, successCallback, errorCallback, config) {
    return axios.all(urls.map(url => axios.get(url)), config).then(axios.spread((...responses) => {
        responses.forEach(({data}, ind) => {
            if(successCallback) {
                if(successCallback[ind]) successCallback[ind](data.data);
            }
        })
    })).catch(err => {
        if(errorCallback) errorCallback();
    });
}

export function CustomAxiosPost(url, params, successCallback, errorCallback, config) {
    return axios.post(url, params, config).then(res => {
        if (successCallback) successCallback(res.data.data, () => {
            if (url.includes('login') || url.includes('verify-ompass')) {
                localStorage.setItem('Authorization', res.headers.authorization);
            }
        });
    }).catch(err => {
        if (errorCallback) errorCallback();
    })
}

export function CustomAxiosPut(url, params, successCallback, errorCallback, config) {
    return axios.put(url, params, config).then(res => {
        if (successCallback) successCallback(res.data.data);
    }).catch(err => {
        if (errorCallback) errorCallback();
    })
}

export function CustomAxiosPatch(url, data, successCallback, errorCallback, config) {
    return axios.patch(url, data, config).then(res => {
        if (successCallback) successCallback(res.data.data);
    }).catch(err => {
        if (errorCallback) errorCallback();
    })
}

export function CustomAxiosDelete(url, successCallback, errorCallback, config) {
    return axios.delete(url, config).then(res => {
        if (successCallback) successCallback(res.data.data);
    }).catch(err => {
        if (errorCallback) errorCallback();
    })
}