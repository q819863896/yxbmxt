// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router/index.js';
import "./assets/style/style.css";
import locale from 'element-ui/lib/locale/lang/en' // lang i18n
// import VueHighcharts from "highcharts";
// import i18n from './lang'
// import VueI18n from "vue-i18n";

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import "./assets/iconfont/iconfont.css";

// import store from "./store";
import store from "./vuex/index.js";
// import $ from "jquery";

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(ElementUI, { locale });
Vue.use(router);
// Vue.use(VueHighcharts);

router.beforeEach((to, from, next) => {
    const nextRoute = ['/login'];

    let user = sessionStorage.getItem('changeUser');
    if (nextRoute.indexOf(to.path) !== -1) {
       next();
    } else if (!user && to.path !== '/login') {
       next({path: '/login'});
    } else {
       next();
    }
 })

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    // i18n,
    components: { App },
    template: '<App/>'
})
