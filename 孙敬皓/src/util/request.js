//axios请求

import axios from 'axios'
import {
  time
} from './util'
import {
  testWebpackUrl
} from '../api/httpUrl'
const service = axios.create({
  //根地址
  baseURL: testWebpackUrl,
  //超时
  timeout: 5000
})

//添加请求拦截器 --- 请求前
service.interceptors.request.use(
  (request) => {
    request.url = time(request.url);
    return request;
  },
  (err) => {
    // 对请求错误做些什么
    return Promise.reject(err)
  }
);
//添加响应拦截器 ---响应后（未正式返回数据时）
service.interceptors.response.use(
  (response) => {
    const {
      data
    } = response;
    return data;
  },
  // 网络问题导致的错误 如：接口路径写错，断网，接口被人拦截重定向了
  (error) => {
    return Promise.reject(
      (error.response &&
        error.response.data &&
        error.response.data.errorMessage) ||
      "网络问题，请刷新重试"
    );
  }
)

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
function get(url, params) {
  return new Promise((resolve, reject) => {
    service
      .get(url, {
        params: params,
      })
      .then((res) => {
        resolve(res);
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
    service.post(url, data).then(
      (response) => {
        resolve(response.data);
      },
      (err) => {
        reject(err);
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
    service.patch(url, data).then(
      (response) => {
        resolve(response.data);
      },
      (err) => {
        reject(err);
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
    service.put(url, data).then(
      (response) => {
        resolve(response.data);
      },
      (err) => {
        reject(err);
      }
    );
  });
}

export {
  get,
  post,
  patch,
  put
};