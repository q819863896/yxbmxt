import Vue from 'vue';
import VueI18n from 'vue-i18n';
import locale from 'element-ui/lib/locale';
import elementEnLocale from 'element-ui/lib/locale/lang/en'; // element-ui lang
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN';// element-ui lang
import enLocale from './en';
import zhLocale from './zh';

Vue.use(VueI18n);

const messages = {
    en: {
        ...enLocale,
        ...elementEnLocale
    },
    zh: {
        ...zhLocale,
        ...elementZhLocale
    }
};

// let language = (navigator.browserLanguage || navigator.language).toLowerCase();
// if(language.indexOf('zh')>-1){
//     localStorage.setItem("lange", "zh");
// }else if(language.indexOf('en')>-1){
//     localStorage.setItem("lange", "en");
// }else{
//     console.log('其他语言');
// }

const i18n = new VueI18n({
    locale: localStorage.lang || 'zh', // set locale
    messages // set locale messages
});

locale.i18n((key, value) => i18n.t(key, value));

export default i18n;
