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
                localStorage.setItem("lange", "zh");
            }else if(language.indexOf('en')>-1){
                console.log('英文');
                localStorage.setItem("lange", "en");
            }else{
                console.log('其他语言');
            }
        }
    },
    created() {
        this.showLang();
    },
    mounted() {
        // this.showLang();
        // window.addEventListener('hashchange',()=>{
        //     var currentPath = window.location.hash.slice(1); // 获取输入的路由
        //     console.log(currentPath);
        //     if(this.$router.path !== currentPath){
        //         this.$router.push("/login"); // 动态跳转
        //     }
        // },false);
        function checkIE(){
            return '-ms-scroll-limit' in document.documentElement.style && '-ms-ime-align' in document.documentElement.style
        }
        if (checkIE()) {
            window.addEventListener('hashchange', () => {
                var currentPath = window.location.hash.slice(1);
                if (this.$route.path !== currentPath) {
                    this.$router.push(currentPath)
                }
            }, false)
        }
    }
}
</script>

<style>

</style>
