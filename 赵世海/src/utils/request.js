import axios from 'axios'
import {
    time
} from './utils.js'
const service = axios.create({
    baseURL: 'https://www.fastmock.site/mock/2e251981dededaa75d392559c27fa0b1/vue',
    timeout: 15000
});
//请求前拦截：例如加时间戳
service.interceptors.request.use(
    (config) => {
        // 在发送请求之前做些什么 如：添加时间戳
        config.url = time(config.url)
        return config;
    },
    (error) => {
        return Promise.reject(error)
    }
)
//响应后做拦截，例如返回的数据 错误提示
service.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        return Promise.reject(
            (error.response &&
                error.response.data &&
                error.response.data.errorMessage) ||
            "网络问题，请刷新重试"
        );
        // return Promise.reject(error)
    }
)
// export default service;

//抛出所有的方法，再通过api进行传参，节省不必要的修改（反正就是方便）
/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} data [请求时携带的参数] 
 */

function get(url, params) {
    return new Promise((resolve, reject) => {
        service.get(url, {
            params: params
        }).then(
            (res) => {
                resolve(res.data.data);
            }, (err) => {
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
            (res) => {
                resolve(res.data)
            },
            (err) => {
                reject(err.data)
            })
    })
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
            (res) => {
                resolve(res.data)
            },
            (err) => {
                reject(err.data)
            })
    })
}

export {
    get,
    post,
    patch,
    put
}