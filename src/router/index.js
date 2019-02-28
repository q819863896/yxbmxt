import Vue from 'vue';
import Router from 'vue-router';

const Login = () => import('../views/account/login.vue');   // // 登录\
const Register = () => import('../views/account/register.vue');   // 注册
const Retrievepass = () => import('../views/account/retrievepass.vue'); // 忘记密码

const Reactivities = () => import('../views/components/reactivities/reactivities.vue');

const Mine = () => import('../views/components/mine/mine.vue');
const Message = () => import('../views/components/message/message.vue');
const PersonInfo = () => import('../views/components/personInfo/personInfo.vue');
const Logoout = () => import('../views/components/logoout/logoout.vue');

const Signup = () => import('../views/components/mine/signUp.vue'); // 报名
const Signsuccess = () => import('../views/components/mine/signsucc.vue');  // 报名成功
const Activedetail = () => import('../views/components/message/activedetail.vue');  // 活动详情

const NotFound = () => import('../views/exception/404.vue');

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Login',
            component: Login
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/register',
            name: 'Register',
            component: Register
        },
        {
            path: '/retrievepass',
            name: 'Retrievepass',
            component: Retrievepass
        },
        {
            path: '/mine',
            name: 'Mine',
            component: Mine,
        },
        {
            path: '/signup',
            name: 'Signup',
            component: Signup
        },
        {
            path: '/signsuccess',
            name: 'Signsuccess',
            component: Signsuccess
        },
        {
            path: '/reactivities',
            name: 'Reactivities',
            component: Reactivities,
            children: [
                {
                    path: '/message',
                    name: 'Message',
                    component: Message
                },
                {
                    path: '/personInfo',
                    name: 'PersonInfo',
                    component: PersonInfo
                },
                {
                    path: '/logoout',
                    name: 'Logoout',
                    component: Logoout
                }
            ]
        },
        {
            path: '/activedetail',
            name: 'Activedetail',
            component: Activedetail,
        },
        {
            path: '/404',
            name: '404',
            component: NotFound,
        },
        {
           path: '*',
           hidden: true,
           redirect: { path: '/404' },
        }
    ]
})
