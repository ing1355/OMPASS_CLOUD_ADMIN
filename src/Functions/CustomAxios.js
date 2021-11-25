import axios from "axios";

export function CustomAxiosGet(url, successCallback, errorCallback, config) {
    return axios.get(url, {
        ...config,
        headers: {
            Authorization: localStorage.getItem('Authorization')
        }
    }).then(res => {
        if (successCallback) successCallback(res.data.data);
    }).catch(err => {
        if (errorCallback) errorCallback();
    })
}

export function CustomAxiosGetAll(urls, successCallback, errorCallback, config) {
    return axios.all(urls.map(url => axios.get(url)), {
        ...config,
        headers: {
            Authorization: localStorage.getItem('Authorization')
        }
    }).then(axios.spread((...responses) => {
        responses.forEach(({data}, ind) => {
            if(successCallback) {
                if(successCallback[ind]) successCallback[ind](data.data);
            }
        })
    }));
}

export function CustomAxiosPost(url, params, successCallback, errorCallback, config) {
    return axios.post(url, params, {
        headers: {
            Authorization: localStorage.getItem('Authorization')
        }, ...config
    }).then(res => {
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
    return axios.put(url, params, {
        headers: {
            Authorization: localStorage.getItem('Authorization')
        }, ...config
    }).then(res => {
        if (successCallback) successCallback(res.data.data);
    }).catch(err => {
        if (errorCallback) errorCallback();
    })
}

export function CustomAxiosPatch(url, data, successCallback, errorCallback, config) {
    return axios.patch(url, data, {
        headers: {
            Authorization: localStorage.getItem('Authorization')
        }, ...config
    }).then(res => {
        if (successCallback) successCallback(res.data.data);
    }).catch(err => {
        if (errorCallback) errorCallback();
    })
}

export function CustomAxiosDelete(url, successCallback, errorCallback, config) {
    return axios.delete(url, {
        headers: {
            Authorization: localStorage.getItem('Authorization')
        }, ...config
    }).then(res => {
        if (successCallback) successCallback(res.data.data);
    }).catch(err => {
        if (errorCallback) errorCallback();
    })
}