import { stringify } from "qs";
import axios from "axios";

axios.defaults.validateStatus = status => {
    return status < 500;
}

// 接口错误拦截
axios.interceptors.response.use(res => {
    if (res.status === 401) {
        // sessionStorage.removeItem('user');
        router.push({ path: '/login' });
        return res;
    } else {
        return res;
    }
}, err => {
    return Promise.reject(err);
});

axios.defaults.baseURL = "http://10.150.117.151:8080";

axios.defaults.timeout = 1000 * 30;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
axios.defaults.headers.get['Content-Type'] = 'application/json';

var _axios = axios.create({
    baseURL: axios.defaults.baseURL,
    timeout: '7000',
    headers: {
      "Content-Type": "application/json",
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
    withCredentials:true
  })

// 登录
export const Login = params => {
    return _axios.post('/login/log.do', stringify(params)).then(res => res.data);
}

// 忘记密码
export const forgetPwd = params => {
    return _axios.post('/login/forgetPwd.do', stringify(params)).then(res => res.data);
}

// 注册 
export const regiset = params => {
    return _axios.post('/regiset/insert.do', stringify(params)).then(res => res.data);
}

// 注册---获取所有国家
export const allCountry = params => {
    return _axios.post('/country/all.do', stringify(params)).then(res => res.data);
}

// 注册---根据国别获取院校
export const allSchool = params => {
    return _axios.post('/school/all.do', stringify(params)).then(res => res.data);
}

// 注册---验证邮箱是否重复
export const checkemail = params => {
    return _axios.post('/regiset/checkemail.do', stringify(params)).then(res => res.data);
}


// mine---我的活动--所有的数据
export const showbmxx = params => {
    return _axios.post('/campaign/showbmxx.do', stringify(params)).then(res => res.data);
}


