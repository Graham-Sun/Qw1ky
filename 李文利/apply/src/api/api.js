import {
    post,
    get
} from "@/utils/request.js";

// 获取列表接口
const postTelLogin = (data) => post("/telLogin", data);
const postRandomCode = (data) => post("/randomCode", data);
const getData = (data) => get("/data", data);
const getSchoolList = (data) => get("/schoolList", data);
const getSchoolRouter = (data) => post('/schoolRouter', data)
const getApplicationData = (data) => get('/applicationData', data)

export {
    postTelLogin,
    postRandomCode,
    getData,
    getSchoolList,
    getSchoolRouter,
    getApplicationData
};