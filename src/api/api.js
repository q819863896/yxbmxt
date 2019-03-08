import { stringify } from "qs";
import axios from "axios";

axios.defaults.validateStatus = status => {
    return status < 500;
}

// 接口错误拦截
// axios.interceptors.response.use(res => {
//     console.log(res.statu)
//     if (res.status === 401) {
//        sessionStorage.removeItem('changeUser');
//     //    sessionStorage.removeItem('token');
//         router.push({path: '/login'});
//        return res;
//     } else {
//        return res;
//     }
//  }, err => {
//     return Promise.reject(err)
//  })
// axios.interceptors.response.use(
//     response => {
//       if(response.data.code === 500) {
//         if (response.data.msg === '请先登录') {
//           router.push({
//             path: '/login',
//             query: {redirect: router.history.current.fullPath}
//           })
//           //如果需要可以在这里将 vuex 里的 user 改为空对象
//         }
//       //显示错误信息
//       return Promise.reject(response.data)
//     }
//     if(response.data.code === 0){
//       return response;
//     }
// }, error => {
//     //显示错误信息
//     return Promise.reject(error.response.data)
// });


axios.interceptors.response.use(res => {
    console.log(res);
    if (res.statu === 401) {
        sessionStorage.removeItem('changeUser');
        router.push({ path: '/login' });
        return res;
    } else {
        return res;
    }
}, err => {
    return Promise.reject(err);
});

// axios.defaults.baseURL = "http://10.150.117.151:8080";   // 韩磊
// axios.defaults.baseURL = "http://10.150.116.209:8080";     // 李元吉
axios.defaults.baseURL = "http://10.150.104.16:8080/XDF-0.0.1-SNAPSHOT";  // 测试

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

// 登出
export const loginOut = params => {
    return _axios.post('/login/loginOut.do', stringify(params)).then(res => res.data);
}

// 登出
export const showName = params => {
    return _axios.post('/login/name.do', stringify(params)).then(res => res.data);
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

// mine---教育/专项--所有的数据
export const campAll = params => {
    return _axios.post('/campaign/campAll.do', stringify(params)).then(res => res.data);
}

// mine---教育/专项--搜索
export const bynameandtypeCamp = params => {
    return _axios.post('/campaign/bynameandtypeCamp.do', stringify(params)).then(res => res.data);
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

// 我的活动--活动详情---取消报名
export const cancelSign = params => {
    return _axios.post('/enrolment/cancel.do', stringify(params)).then(res => res.data);
}

// 个人中心--验证初始密码
export const updatepwd = params => {
    return _axios.post('/login/updatepwd.do', stringify(params)).then(res => res.data);
}

// 个人中心--修改密码
export const succeedpwd = params => {
    return _axios.post('/login/succeedpwd.do', stringify(params)).then(res => res.data);
}

// 个人中心--修改个人信息//--获取
export const selectUser = params => {
    return _axios.post('/login/selectUser.do', stringify(params)).then(res => res.data);
}

// 个人中心--修改个人信息
export const updateUser = params => {
    return _axios.post('/login/updateUser.do', stringify(params)).then(res => res.data);
}

// 消息通知--获取所有信息
export const selectAll = params => {
    return _axios.post('/notification/selectAll.do', stringify(params)).then(res => res.data);
}

// 消息通知--未读状态
export const updateCount = params => {
    return _axios.post('/notification/updateCount.do', stringify(params)).then(res => res.data);
}

// 消息通知--已读状态
export const updateStatu = params => {
    return _axios.post('/notification/updateStatu.do', stringify(params)).then(res => res.data);
}

// 消息通知--教育/专项---地区
export const bydateandaddressCamp = params => {
    return _axios.post('/campaign/bydateandaddressCamp.do', stringify(params)).then(res => res.data);
}

// 消息通知--教育/专项---月份
export const bydate = params => {
    return _axios.post('/campaign/bydate.do', stringify(params)).then(res => res.data);
}

// 消息通知--教育/专项---详情
export const xxjl = params => {
    return _axios.post('/campaign/xxjl.do', stringify(params)).then(res => res.data);
}

// 立即报名的接口
// export const upload2 = params => {
//     return _axios.post('/enrolment/upload2.do', stringify(params)).then(res => res.data);
// }
export const upload2 = (params) => {
   return axios.post('/enrolment/upload2.do', stringify(params)).then(res => res.data);
};

// 立即报名的接口
export const update = params => {
    return _axios.post('/enrolment/update.do', stringify(params)).then(res => res.data);
}

