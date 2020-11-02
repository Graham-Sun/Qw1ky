import { post, get } from "@/utils/request.js";

// 获取手机验证码
const postCode = (data) => post("/code", data);

// 获取手机验证码
const postPhoneLogin = (data) => post("/login", data);

// 获取学校列表
const getSchoolList = (data) => get("/schoolList", data);

// 确认学校获取权限
const postSchoolRouter = (data) => post("/schoolRouter", data);

// 教师申请列表
const getSchoolApply = (data) => get("/schoolApply", data);

// 获取教师列表
const getTeacherList = (data) => get("/teacherList", data);

// 获取单词分析
const getAnalysis = (data) => get("/analysis", data);

// 单词分析设置页面（步骤四）
const getSetting = (data) => get("/setting", data);

export {
  postCode,
  postPhoneLogin,
  getSchoolList,
  postSchoolRouter,
  getSchoolApply,
  getTeacherList,
  getAnalysis,
  getSetting
};
