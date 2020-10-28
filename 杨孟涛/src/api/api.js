import { post, get } from "@/utils/request.js";


//获取手机验证码
const postCode = (data) => post('/code', data)
export { postCode };

//获取手机登录信息
const postPhoneLogin = (data) => post('/phoneLogin', data)
export { postPhoneLogin };

//获取确认学校登录
const postSchoolRouter = (data) => post('/schoolRouter', data)
export { postSchoolRouter };


//获取学校列表
const getSchoolList = (data) => get('/schoolList', data)
export { getSchoolList };

//获取教师信息
const getSchoolApply = (data) => get('/schoolApply', data)
export { getSchoolApply };

//获取input
const getinput = (data) => get('/input', data)
export { getinput };

//获取教师申请
const getTClist = (data) => get('/TClist', data)
export { getTClist };