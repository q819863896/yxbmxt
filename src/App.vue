<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
import { showlogin } from "./api/api.js";
export default {
    name: 'App',
    methods: {
        showLang() {
            let language = (navigator.browserLanguage || navigator.language).toLowerCase();
            if(language.indexOf('zh')>-1){
                console.log('中文');
                sessionStorage.setItem("lange", "zh");
            }else if(language.indexOf('en')>-1){
                console.log('英文');
                sessionStorage.setItem("lange", "en");
            }else{
                console.log('其他语言');
            }
        }
    },
    created() {
        // showlogin().then(res => {
        //     this.$router.push("/login");
        // })
        this.showLang();
    },
    beforeCreate () {
        // this.showLang();
    },
    mounted() {
        // window.addEventListener('hashchange',()=>{
        //     var currentPath = window.location.hash.slice(1); // 获取输入的路由
        //     console.log(currentPath);
        //     if(this.$router.path !== currentPath){
        //         this.$router.push("/login"); // 动态跳转
        //     }
        // },false);
    }
}
</script>

<style>

</style>
