// 时间戳封装
const time = (url = "") => {
  let time = new Date().getTime();
  let newUrl = "";
  url ? (newUrl = `${url}&_t=${time}`) : (newUrl = `${url}?_t=${time}`);
  return newUrl;
};

const _random = (min, max) =>{
  return Math.floor(Math.random() * (max - min) + min);
}

export {
  time, _random
}