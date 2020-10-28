import {
    post,
    get
} from "@/utils/request.js";

// 获取列表接口
const postTelLogin = (data) => post("/telLogin", data);
const postRandomCode = (data) => post("/randomCode", data);
const getSchoolList = (data) => get("/schoolList", data);
const getSchoolRouter = (data) => post('/schoolRouter', data)
const getApplicationData = (data) => get('/applicationData', data)
const getFoodList = (data) => get('/foodList', data)
const getSearch = (data) => get('/getSearch', data)
const getTeacherManage = (data) => get('/teacherManage', data)
const getASingleData = (data) =>get('/aSingleData',data)

export {
    postTelLogin,
    postRandomCode,
    getSchoolList,
    getSchoolRouter,
    getApplicationData,
    getFoodList,
    getSearch,
    getTeacherManage,
    getASingleData
};