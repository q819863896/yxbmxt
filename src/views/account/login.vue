<template>
    <div class="login_box" >
        <headers></headers>
        <!-- <el-radio-group v-model="lang" size="small">
            <el-radio label="zh" border>简体中文</el-radio>
            <el-radio label="en" border>English</el-radio>
        </el-radio-group> -->
        <el-form :model="loginInfo" :rules="lang === 'zh' ? zhloginRules : enloginRules" ref="loginInfo" class="demo-ruleForm login-container">
            <el-form-item :label="lang === 'zh' ? '用户名' : 'Username'" prop="account" style="position: relative">
                <el-input type="text" name="account" v-model.trim="loginInfo.account" :placeholder="lang === 'zh' ? '用户名' : 'Username'">
                </el-input>
            </el-form-item>
            <el-form-item :label="lang === 'zh' ? '密码' : 'Password'" prop="password">
                <el-input type="password" name="password" v-model.trim="loginInfo.password" auto-complete="off" :placeholder="lang === 'zh' ? '密码' : 'Password'"></el-input>
            </el-form-item>
            <el-form-item style="width:100%;">
                <el-button type="primary" style="width:100%;" @click.native.prevent="loginBtn" :loading="logining">{{lang === "zh" ? "登录" : "Login"}}</el-button>
            </el-form-item>
            <!-- <p @click.native.prevent="toDemo">vuex</p> -->
            <el-form-item class="forget" @click.native.prevent="forgetBtn">{{lang === "zh" ? "忘记密码" : "Forget Password"}}</el-form-item>
            <!-- <router-link :to="{name: '/retrievepass'}">{{lang === "zh" ? "忘记密码" : "Forget Password"}}</router-link> -->
            <router-view></router-view>
            <!-- <div class="ordiv">
                <div class="left">- - - - - - - - - - </div>
                <div class="center">或</div>
                <div class="right"> - - - - - - - - - -</div>
            </div> -->
        </el-form>
        <div class="quick" @click="quickBtn">{{lang === "zh" ? "快速注册" : "Quick Registration"}}</div>
    </div>
</template>

<script>
import Headers from "../../components/header.vue";
import { Login } from "../../api/api.js";
import local from "./local.js";
export default {
    name: "login",
    components: {
        Headers
    },
    data() {
        return {
            logining: false,
            lang: "",
            loginInfo: {
                account: "",
                password: ""
            },
            zhloginRules: {
                account: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                ]
            },
            enloginRules: {
                account: [
                    { required: true, message: "Please enter the username", trigger: 'blur' },
                ],
                password: [
                    { required: true, message: 'Please input a password', trigger: 'blur' },
                ]
            },
        }
    },
    methods: {
        // 切换语言
        checkLang () {

        },
        // 登录
        loginBtn() {
            console.log("asd");
            this.$refs.loginInfo.validate((valid) => {
                if (valid) {
                    let params = {
                        name: this.loginInfo.account,
                        password: this.$md5(this.loginInfo.password)
                    };
                    Login(params).then((res) => {
                        this.logining = true;
                        if (res.message == "密码正确") {
                            sessionStorage.setItem("changeUser", this.loginInfo.account);
                            console.log(this.$router);
                            this.$router.push("/mine");
                            this.logining = false;
                        } else {
                            this.$message({
                                message: res.message,
                                type: 'warning'
                            });
                            this.logining = false;
                        }
                    })
                }
            })
        },
        // 忘记密码
        forgetBtn() {
            // const self = this;
            console.log("忘记密码");
            console.log(this.$router);
            // this.$router.push("/retrievepass");
            // self.$router.push({path: "/retrievepass"});
            this.$router.push({name:'Retrievepass' , path: '/retrievepass' });
        },
        // 快速注册
        quickBtn(){
            console.log("快速注册");
            this.$router.push("/register");
        },
        toDemo () {
            this.$router.push("/studys");
        }
    },
    created() {
        this.lang = sessionStorage.getItem("lange");
    },
    watch: {
        '$route' (to, from) {
            this.$router.go(0);
        }
    },
}
</script>


<style lang="scss" scoped>
.login_box{
    width: 100%;
    height: 100%;
    .el-form{
        padding: 5% 15% 0;
        .forget{
            color: #006960;
            cursor: pointer;
        }
        .ordiv{
            width: 100%;
            display: flex;
            color: #D8D8D8;
            padding: 6% 0;
            .left, .right{
                // width: 49.5%;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
        
        button{
            background: #006960;
        }
    }
    .quick{
        width: 70%;
        height: 30px;
        padding: 0 6%;
        text-align: center;
        line-height: 30px;
        margin-left: 15%;
        border: 2px solid #006960;
        border-radius: 5px;
        cursor: pointer;
    }
}
</style>
