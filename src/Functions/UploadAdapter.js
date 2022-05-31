import { uploadNoticeImageApi } from "../Constants/Api_Route";

const getBase64 = (file, callback) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
        callback(reader.result)
    }
}

export default class UploadAdapter {
    constructor(loader) {
        this.loader = loader;
    }

    upload() {
        return this.loader.file.then(file => new Promise(((resolve, reject) => {
            getBase64(file, (b64Str) => {
                resolve({
                    default: b64Str
                })
            })
            // this._initRequest()
            // this._initListeners(resolve, reject, file)
            // this._sendRequest(file)
        })))
    }

    _initRequest() {
        const xhr = this.xhr = new XMLHttpRequest()
        xhr.open('POST', uploadNoticeImageApi, true)
        xhr.reponseType = 'json'
    }

    _initListeners(resolve, reject, file) {
        // const xhr = this.xhr
        // const loader = this.loader
        // const genericErrorText = '파일을 업로드 할 수 없습니다.'

        // xhr.addEventListener('error', () => {reject(genericErrorText)})
        // xhr.addEventListener('abort', () => reject())
        // xhr.addEventListener('load', () => {
        //     const response = xhr.response
        //     if(!response || response.error) {
        //         return reject(response && response.error ? response.error.message : genericErrorText)
        //     }

        //     resolve({
        //         default: response.url
        //     })
        // })
    }

    _sendRequest(file) {
        // const data = new FormData()
        // data.append('upload', file)
        // this.callback(data, file)
        // this.xhr.send(data)
    }
}