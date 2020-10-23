//公有方法集合


const time = (url) => {
  let t = new Date().getTime();
  let newUrl = '';
  url.indexOf('?') === -1 ? (newUrl = `${url}?t=${t}`) : (newUrl = `${url}&t=${t}`)
  return newUrl;
};
export {
  time,
};