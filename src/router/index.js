import Vue from 'vue';
import Router from 'vue-router';

const Login = () => import('../views/account/login.vue');   // // 登录\
const Testlogin = () => import('../views/account/testLogin.vue');   // // 登录\
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
const Myactivedetail = () => import('../views/components/message/myactiveDetail.vue');  // 活动详情

const NotFound = () => import('../views/exception/404.vue');

const studys = () => import('../views/components/lx/demo.vue');

// import Login from "../views/account/login.vue";
// import Logoout from "../views/components/logoout/logoout.vue";
// import Register from "../views/account/register.vue";
// import Retrievepass from "../views/account/retrievepass.vue";

// import Reactivities from "../views/components/reactivities/reactivities.vue";

// import Mine from "../views/components/mine/mine.vue";
// import Message from "../views/components/message/message.vue";
// import Messagedetail from "../views/components/message/messageDetail.vue";
// import PersonInfo from "../views/components/personInfo/personInfo.vue";
// import Signup from "../views/components/mine/signUp.vue";
// import Signsuccess from "../views/components/mine/signsucc.vue";

// import Activedetail from "../views/components/message/activedetail.vue";
// import Myactivedetail from "../views/components/message/myactiveDetail.vue";
// import NotFound from "../views/exception/404.vue";
// import studys from "../views/components/lx/demo.vue";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Login',
            component: Login,
        },
        {
            path: '/testlogin',
            name: 'Testlogin',
            component: Testlogin,
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
        },
        {
            path: '/register',
            name: 'Register',
            component: Register,
        },
        {
            path: '/retrievepass',
            name: 'Retrievepass',
            component: Retrievepass,
        },
        {
            path: '/mine',
            name: 'Mine',
            component: Mine,
        },
        {
            path: '/signup',
            name: 'Signup',
            component: Signup,
        },
        {
            path: '/signsuccess',
            name: 'Signsuccess',
            component: Signsuccess,
        },
        {
            path: '/messagedetail',
            name: 'Messagedetail',
            component: Messagedetail,
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
            path: '/myactivedetail',
            name: 'Myactivedetail',
            component: Myactivedetail,
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
        },
        {
            path: '/studys',
            name: 'studys',
            component: studys,
        }
    ]
})
