import {
    post,get
} from "@/utils/request.js";
// 验证码
const postCode = (data) => post("/code", data);
// 手机登录
const phoneLogin = (data) => post("/phlogin", data);
// 获取学校列表
const getSchool = (data) => get("/school", data);
// 确认学校登录
const phoneSchoolLogin = (data) => post("/schoollogin", data);
// 申请页 接口
const getApply = (data) => get("/apply", data);
export {
    postCode,
    phoneLogin,
    getSchool,
    phoneSchoolLogin,
    getApply
}