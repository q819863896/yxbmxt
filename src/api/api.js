import { stringify } from "qs";
import axios from "axios";

axios.defaults.validateStatus = status => {
    return status < 500;
}

// 接口错误拦截
axios.interceptors.response.use(res => {
    console.log(res);
    if (res.status === 401) {
        sessionStorage.removeItem('user');
        router.push({ path: '/login' });
        return res;
    } else {
        return res;
    }
}, err => {
    return Promise.reject(err);
});

axios.defaults.baseURL = "http://10.150.117.151:8080";

axios.defaults.timeout = 1000 * 50;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
axios.defaults.headers.get['Content-Type'] = 'application/json';

var _axios = axios.create({
    baseURL: axios.defaults.baseURL,
    timeout: '50000',
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

export const showlogin = params => {
    return _axios.post('/login/show.do', stringify(params)).then(res => res.data);
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

// mine---我的活动--城市
export const cityData = params => {
    return _axios.post('/campaign/city.do', stringify(params)).then(res => res.data);
}

// 我的活动--按会议名称搜索
export const byname = params => {
    return _axios.post('/campaign/byname.do', stringify(params)).then(res => res.data);
}

// 我的活动--按----城市-----筛选
export const filterss = params => {
    return _axios.post('/campaign/filter.do', stringify(params)).then(res => res.data);
}

// 我的活动--活动详情
export const bmxxjl = params => {
    return _axios.post('/campaign/bmxxjl.do', stringify(params)).then(res => res.data);
}

// 个人中心--验证初始密码
export const updatepwd = params => {
    return _axios.post('/login/updatepwd.do', stringify(params)).then(res => res.data);
}

// 个人中心--验证初始密码
export const succeedpwd = params => {
    return _axios.post('/login/succeedpwd.do', stringify(params)).then(res => res.data);
}

