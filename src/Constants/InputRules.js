export const nameTest = (value) => {
    const _ = /^[^ㄱ-ㅎㅏ-ㅣ]*$|^\s[^ㄱ-ㅎㅏ-ㅣ]*$|^[^ㄱ-ㅎㅏ-ㅣ]*$/
    const __ = /^[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9 ]{1,16}$/
    return _.test(value) && __.test(value);
}

export const userIdTest = (value) => {
    const _ = /^[a-z0-9]{1,16}$/
    return _.test(value);
}

export const policyTitleTest = (value) => {
    const _ = /^[^ㄱ-ㅎㅏ-ㅣ]*$|^\s[^ㄱ-ㅎㅏ-ㅣ]*$|^[^ㄱ-ㅎㅏ-ㅣ]*$/
    const __ = /^[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9 ]{1,24}$/
    return _.test(value) && __.test(value);
}

export const ApplicationNameTest = (value) => {
    const _ = /^[^ㄱ-ㅎㅏ-ㅣ]*$|^\s[^ㄱ-ㅎㅏ-ㅣ]*$|^[^ㄱ-ㅎㅏ-ㅣ]*$/
    const __ = /^[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9 ]{1,24}$/
    return _.test(value) && __.test(value);
}

export const ipAddressTest = (value) => {
    const _ = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
    return _.test(value);
}

// export const mobileTest = (value) => {
//     const _ = /^\d{2,3}-\d{3,4}-\d{4}$/
//     return _.test(value);
// }

export const emailTest = (value) => {
    const _ = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    return _.test(value);
}

export const passwordTest = (value) => {
    const _ = /(?=.*[a-zA-Z])(?=.*[\d])(?=.*[\W]).{8,16}|(?=.*[a-zA-Z])(?=.*[\d]).{10,16}|(?=.*[a-zA-Z])(?=.*[\W]).{10,16}|(?=.*[\d])(?=.*[\W]).{10,16}/
    return _.test(value);
}

export const doaminTest = (value) => {
    const _ = /(https:\/\/)([a-z0-9\w]+\.*)+[a-z0-9]{2,4}/
    return _.test(value);
}

export const FailToTest = (element, callback) => {
    element.focus();
    if(callback) callback()
}