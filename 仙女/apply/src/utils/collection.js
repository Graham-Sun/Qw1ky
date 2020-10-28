const time = (url) => {
    let time = new Date().getTime();
    let newUrl = '';
    url.indexOf('?') === -1 ? (newUrl = `${url}?time=${time}`) : (newUrl = `${url}&time=${time}`)
    return newUrl;
}
const _str = (data) => {
    return JSON.stringify(data)
}
const _obj = (data) => {
    return JSON.parse(data)
}
//验证码
const _random = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
}
export {
    time,
    _str,
    _obj,
    _random
}