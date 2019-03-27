<template>
    <div id="app" @mouseover="OperatingWebsite()">
        <router-view/>
    </div>
</template>

<script>
import { showlogin } from "./api/api.js";
export default {
    name: 'App',
    data() {
        return {
            currentTime: new Date().getTime()
        }
    },
    methods: {
        showLang() {
            let language = (navigator.browserLanguage || navigator.language).toLowerCase();
            if(language.indexOf('zh')>-1){
                localStorage.setItem("lange", "zh");
            }else if(language.indexOf('en')>-1){
                localStorage.setItem("lange", "en");
            }else{
                console.log('其他语言');
            }
        },
        OperatingWebsite() {
            let currentTime = this.currentTime;
            let lastTime = new Date().getTime();
            let timeOut = 10 * 60 * 1000; //设置时间 10分钟
            if (lastTime - currentTime > timeOut) {
                // 未操作页面，跳转登录页面
                this.currentTime = new Date().getTime(); 
                const fullPath = this.$route.fullPath;
                // const query = this.$Base64.encode(fullPath);
                this.$router.push({
                    path: "/login",
                    // query: {
                    //     type: query
                    // }
                });
            } else {
                this.currentTime = new Date().getTime(); 
            }
        
            // const truthPathQuery = this.$route.query.type;
            // const truthPath = this.$Base64.decode(truthPathQuery); //点击登录的时候跳转这个地址
        }
    },
    created() {
        // this.showLang();
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
