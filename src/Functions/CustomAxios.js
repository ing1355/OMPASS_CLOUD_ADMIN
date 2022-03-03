import axios from "axios";

export function CustomAxiosGet(url, successCallback, errorCallback, config) {
    let _config = {
        headers: {
            authorization: localStorage.getItem('Authorization')
        }
    }
    if(config) _config = {...config}
    return axios.get(url, _config).then(res => {
        if (successCallback) successCallback(res.data.data);
    }).catch(err => {
        if (errorCallback) errorCallback();
    })
}

export function CustomAxiosGetAll(urls, successCallback, errorCallback, config) {
    let _config = {
        headers: {
            authorization: localStorage.getItem('Authorization')
        }
    }
    if(config) _config = {...config}
    return axios.all(urls.map(url => axios.get(url, _config))).then(axios.spread((...responses) => {
        responses.forEach(({ data }, ind) => {
            if (successCallback) {
                if (successCallback[ind]) successCallback[ind](data.data);
            }
        })
    })).catch(err => {
        if (errorCallback) errorCallback();
    });
}

export function CustomAxiosPost(url, params, successCallback, errorCallback, config) {
    let _config = {
        headers: {
            authorization: localStorage.getItem('Authorization')
        }
    }
    if(config) _config = {...config}
    return axios.post(url, params, _config).then(res => {
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
    let _config = {
        headers: {
            authorization: localStorage.getItem('Authorization')
        }
    }
    if(config) _config = {...config}
    return axios.put(url, params, _config).then(res => {
        if (successCallback) successCallback(res.data.data);
    }).catch(err => {
        if (errorCallback) errorCallback();
    })
}

export function CustomAxiosPatch(url, data, successCallback, errorCallback, config) {
    let _config = {
        headers: {
            authorization: localStorage.getItem('Authorization')
        }
    }
    if(config) _config = {...config}
    return axios.patch(url, data, _config).then(res => {
        if (successCallback) successCallback(res.data.data);
    }).catch(err => {
        if (errorCallback) errorCallback();
    })
}

export function CustomAxiosDelete(url, successCallback, errorCallback, config) {
    let _config = {
        headers: {
            authorization: localStorage.getItem('Authorization')
        }
    }
    if(config) _config = {...config}
    return axios.delete(url, _config).then(res => {
        if (successCallback) successCallback(res.data.data);
    }).catch(err => {
        if (errorCallback) errorCallback();
    })
}