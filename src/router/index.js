import Vue from 'vue';
import Router from 'vue-router';

const Login = () => import('../views/account/login.vue');   // // 登录\
const Register = () => import('../views/account/register.vue');   // 注册
const Retrievepass = () => import('../views/account/retrievepass.vue'); // 忘记密码

const Reactivities = () => import('../views/components/reactivities/reactivities.vue');

const Mine = () => import('../views/components/mine/mine.vue');
const Message = () => import('../views/components/message/message.vue');
const Messagedetail = () => import('../views/components/message/messageDetail.vue');
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
            component: Login,
            meta:{
                requireLogin:true,
            },
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
            meta:{
                requireLogin:true,
            },
        },
        {
            path: '/register',
            name: 'Register',
            component: Register,
            meta:{
                requireLogin:true,
            },
        },
        {
            path: '/retrievepass',
            name: 'Retrievepass',
            component: Retrievepass,
            meta:{
                requireLogin:true,
            },
        },
        {
            path: '/mine',
            name: 'Mine',
            component: Mine,
            meta:{
                requireLogin:true,
            },
        },
        {
            path: '/signup',
            name: 'Signup',
            component: Signup,
            meta:{
                requireLogin:true,
            },
        },
        {
            path: '/signsuccess',
            name: 'Signsuccess',
            component: Signsuccess,
            meta:{
                requireLogin:true,
            },
        },
        {
            path: '/messagedetail',
            name: 'Messagedetail',
            component: Messagedetail,
            meta:{
                requireLogin:true,
            },
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
            meta:{
                requireLogin:true,
            },
        },
        {
            path: '/404',
            name: '404',
            component: NotFound,
            meta:{
                requireLogin:true,
            },
        },
        {
           path: '*',
           hidden: true,
           redirect: { path: '/404' },
        }
    ]
})
