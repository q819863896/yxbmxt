// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router/index.js';
import "./assets/style/style.css";
import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import i18n from './lang'
import VueI18n from "vue-i18n";

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import "./assets/iconfont/iconfont.css";

import store from "./store"
import $ from "jquery";

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(ElementUI, { locale });
Vue.use(router);

Vue.use(ElementUI, {
    size: 'medium', // set element-ui default size
    i18n: (key, value) => i18n.t(key, value)
})

router.beforeEach((to, from, next) => {
    if (to.path == "/login") {
        sessionStorage.removeItem("lange");
    }
    next();
});

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    i18n,
    components: { App },
    template: '<App/>'
})
