import Vue from 'vue';
import Router from 'vue-router';

import Login from "../views/account/login.vue";     // 登录
import Register from "../views/account/register.vue";   // 注册
import Retrievepass from "../views/account/retrievepass.vue";   // 忘记密码

import Reactivities from "../views/components/reactivities/reactivities.vue";

import Mine from "../views/components/mine/mine.vue";
import Message from "../views/components/message/message.vue";
import PersonInfo from "../views/components/personInfo/personInfo.vue";
import Logoout from "../views/components/logoout/logoout.vue";

Vue.use(Router)

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
            component: Mine
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
        }
    ]
})
