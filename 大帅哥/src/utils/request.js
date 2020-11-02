import axios from "axios";
import { _time } from "./utils.js";

// post发送格式为formData
axios.defaults.headers.post["Content-Type"] = "application/json";

const instance = axios.create({
  // 根地址
  // baseURL: "https://www.easy-mock.com/mock/5f9f619b0bf9ee0300940b1c/api",
  baseURL:
    "https://www.fastmock.site/mock/42f5f901e1f9d0d347690940e0ed2513/api",
  timeout: 15000,
});

// 添加请求拦截器 --- 请求前
instance.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么 如：添加时间戳
    let url = config.url.split("?");
    url.length > 1
      ? (config.url = `${url[0]}?${_time(url[1])}`)
      : (config.url = `${url[0]}${_time(url[1])}`);
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器 --- 响应后（未正式返回数据时）
instance.interceptors.response.use(
  function(res) {
    // 对响应数据做点什么 如（统一处理错误信息）
    let { data } = res;
    if (Number(data.code) === 0) {
      // alert(data.message);
    }
    return res;
  },
  function(err) {
    // 对响应错误做点什么
    return Promise.reject(err);
  }
);

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
function get(url, params) {
  return new Promise((resolve, reject) => {
    instance
      .get(url, {
        params: params,
      })
      .then((res) => {
        resolve(res.data.data);
      })
      .catch((err) => {
        reject(err.data);
      });
  });
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    instance.post(url, data).then(
      (response) => {
        resolve(response.data.data);
      },
      (err) => {
        reject(err.data);
      }
    );
  });
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

function patch(url, data = {}) {
  return new Promise((resolve, reject) => {
    instance.patch(url, data).then(
      (response) => {
        resolve(response.data.data);
      },
      (err) => {
        reject(err.data);
      }
    );
  });
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    instance.put(url, data).then(
      (response) => {
        resolve(response.data.data);
      },
      (err) => {
        reject(err.data);
      }
    );
  });
}

export { get, post, patch, put };
