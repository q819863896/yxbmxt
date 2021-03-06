import { stringify } from "qs";
import axios from "axios";
import router from "../router/index.js";

axios.defaults.validateStatus = statu => {
    return statu < 500;
}

// 接口错误拦截
axios.interceptors.response.use(res => {
    if (res.status === 401) {
        sessionStorage.removeItem('changeUser');
    //    sessionStorage.removeItem('token');
        router.push({path: '/login'});
        return res;
    } else {
        return res;
        next();
    }
}, err => {
    return Promise.reject(err)
})

// axios.defaults.baseURL = "http://10.150.117.151:8080";   // 韩磊
axios.defaults.baseURL = "http://10.150.116.209:8080";     // 李元吉
// axios.defaults.baseURL = "http://10.149.0.208:8080";     // 来昌
// axios.defaults.baseURL = "http://10.150.104.16:8080/Portal";  // 测试1
// axios.defaults.baseURL = "http://10.150.104.16:8081/Portal";  // 测试2

axios.defaults.timeout = 1000 * 50;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
axios.defaults.headers.get['Content-Type'] = 'application/json';

// 登录
export const Login = params => {
    return axios.post('/login/log.do', stringify(params)).then(res => res.data);
}

// 中英文切换
export const cun = params => {
    return axios.post('/campaign/cun.do', stringify(params)).then(res => res.data);
}

// 登出
export const loginOut = params => {
    return axios.post('/login/loginOut.do', stringify(params)).then(res => res.data);
}

// 登出
export const showName = params => {
    return axios.post('/login/name.do', stringify(params)).then(res => res.data);
}

export const showlogin = params => {
    return axios.post('/login/show.do', stringify(params)).then(res => res.data);
}

// 忘记密码
export const forgetPwd = params => {
    return axios.post('/login/forgetPwd.do', stringify(params)).then(res => res.data);
}

// 注册 
export const regiset = params => {
    return axios.post('/regiset/insert.do', stringify(params)).then(res => res.data);
}

// 获取验证码
export const getvcf = params => {
    return axios.post('/regiset/getvcf.do', stringify(params)).then(res => res.data);
}

// 注册---获取所有国家
export const allCountry = params => {
    return axios.post('/country/all.do', stringify(params)).then(res => res.data);
}

// 注册---根据国别获取院校
export const allSchool = params => {
    return axios.post('/school/all.do', stringify(params)).then(res => res.data);
}

// 注册---验证邮箱是否重复
export const checkemail = params => {
    return axios.post('/regiset/checkemail.do', stringify(params)).then(res => res.data);
}

// mine---教育/专项--所有的数据
export const campAll = params => {
    return axios.post('/campaign/campAll.do', stringify(params)).then(res => res.data);
}

// mine---教育/专项--搜索
export const bynameandtypeCamp = params => {
    return axios.post('/campaign/bynameandtypeCamp.do', stringify(params)).then(res => res.data);
}

// mine---我的活动--所有的数据
export const showbmxx = params => {
    return axios.post('/campaign/showbmxx.do', stringify(params)).then(res => res.data);
}

// mine---我的活动--城市
export const cityData = params => {
    return axios.post('/campaign/city.do', stringify(params)).then(res => res.data);
}

// 我的活动--按会议名称搜索
export const byname = params => {
    return axios.post('/campaign/byname.do', stringify(params)).then(res => res.data);
}

// 我的活动--按----城市-----筛选
export const filterss = params => {
    return axios.post('/campaign/filter.do', stringify(params)).then(res => res.data);
}

// 我的活动--活动详情
export const bmxxjl = params => {
    return axios.post('/campaign/bmxxjl.do', stringify(params)).then(res => res.data);
}

// 我的活动--活动详情---取消报名
export const cancelSign = params => {
    return axios.post('/enrolment/cancel.do', stringify(params)).then(res => res.data);
}

// 个人中心--验证初始密码
export const updatepwd = params => {
    return axios.post('/login/updatepwd.do', stringify(params)).then(res => res.data);
}

// 个人中心--修改密码
export const succeedpwd = params => {
    return axios.post('/login/succeedpwd.do', stringify(params)).then(res => res.data);
}

// 个人中心--修改个人信息//--获取
export const selectUser = params => {
    return axios.post('/login/selectUser.do', stringify(params)).then(res => res.data);
}

// 个人中心--修改个人信息
export const updateUser = params => {
    return axios.post('/login/updateUser.do', stringify(params)).then(res => res.data);
}

// 消息通知--获取所有信息
export const selectAll = params => {
    return axios.post('/notification/selectAll.do', stringify(params)).then(res => res.data);
}

// 消息通知--未读状态
export const updateCount = params => {
    return axios.post('/notification/updateCount.do', stringify(params)).then(res => res.data);
}

// 消息通知--已读状态
export const updateStatu = params => {
    return axios.post('/notification/updateStatu.do', stringify(params)).then(res => res.data);
}

// 消息通知--教育/专项---地区
export const bydateandaddressCamp = params => {
    return axios.post('/campaign/bydateandaddressCamp.do', stringify(params)).then(res => res.data);
}

// 消息通知--教育/专项---月份
export const bydate = params => {
    return axios.post('/campaign/bydate.do', stringify(params)).then(res => res.data);
}

// 消息通知--教育/专项---详情
export const xxjl = params => {
    return axios.post('/campaign/xxjl.do', stringify(params)).then(res => res.data);
}

// datalist---我的活动
export const wdbmxxjl = params => {
    return axios.post('/campaign/wdbmxxjl.do', stringify(params)).then(res => res.data);
}

// 报名-回显
export const setadddata = params => {
    return axios.post('/enrolment/setadddata.do', stringify(params)).then(res => res.data);
}

// 立即报名-上传
export const upload = (params) => {
   return axios.post('/enrolment/upload.do', stringify(params)).then(res => res.data);
};

export const singlefile = (params) => {
    return axios.post('/enrolment/singlefile.do', stringify(params)).then(res => res.data);
};

// 立即报名-上传
export const upload1 = (params) => {
    return axios.post('/enrolment/upload1.do', params).then(res => res.data);
};

// 立即报名的接口
export const update = params => {
    return axios.post('/enrolment/update.do', stringify(params)).then(res => res.data);
}
