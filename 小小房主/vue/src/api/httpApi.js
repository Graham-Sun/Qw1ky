//处理接口

import {
  post,
  get
} from '../util/request'

//请求验证码
const postCode = (data) => post('/code', data);
//手机号登陆
const postPhone = (data) => post('/phoneLogin', data);
//获取对应学校信息
const getSchool = (data) => get('/school', data)
//获取个人在绑定学校里的权限
const getSchoolRouter = (data) => post('/schoolRouter', data)
//获取申请管理页
const getApplyManagement = (data) => get('/ApplyManagement', data)
//获取教师申请页
const getTeacherApply = (data) => get('/teacherApply', data)
//获取单次分析页
const getASingleAnalysis = (data) => get('/ASingleAnalysis', data)
export {
  postCode,
  postPhone,
  getSchool,
  getSchoolRouter,
  getApplyManagement,
  getTeacherApply,
  getASingleAnalysis
}