<template>
    <div class="login_box" >
        <headers></headers>
        <el-form :model="loginInfo" :rules="lang === 'zh' ? zhloginRules : enloginRules" ref="loginInfo" class="demo-ruleForm login-container">
            <el-form-item :label="$t('loginPage.username')" prop="account" style="position: relative">
                <el-input type="text" name="account" v-model.trim="loginInfo.account" :placeholder="$t('loginPage.username')">
                </el-input>
            </el-form-item>
            <!-- <el-form-item :label="lang === 'zh' ? '用户名' : 'Username'" prop="account" style="position: relative">
                <el-input type="text" name="account" v-model.trim="loginInfo.account" :placeholder="lang === 'zh' ? '用户名' : 'Username'">
                </el-input>
            </el-form-item> -->
            <el-form-item :label="$t('loginPage.password')" prop="password">
                <el-input type="password" name="password" v-model.trim="loginInfo.password" auto-complete="off" :placeholder="$t('loginPage.password')"></el-input>
            </el-form-item>
            <!-- <el-form-item :label="lang === 'zh' ? '密码' : 'Password'" prop="account" style="position: relative">
                <el-input type="text" name="account" v-model.trim="loginInfo.password" :placeholder="lang === 'zh' ? '用户名' : 'Username'">
                </el-input>
            </el-form-item> -->
            <el-form-item style="width:100%;">
                <el-button type="primary" style="width:100%;" @click.native.prevent="loginBtn" :loading="logining">{{$t('loginPage.Login')}}</el-button>
            </el-form-item>
            <el-form-item class="forget" @click.native.prevent="forgetBtn">{{$t('loginPage.forgetPass')}}</el-form-item>
            <router-view></router-view>
        </el-form>
        <div class="quick" @click="quickBtn">{{$t('loginPage.quickRegistr')}}</div>
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
            this.$router.push({name:'Retrievepass' , path: '/retrievepass' });
        },
        // 快速注册
        quickBtn(){
            this.$router.push("/register");
        },
        toDemo () {
            this.$router.push("/studys");
        }
    },
    created() {
        // this.lang = sessionStorage.getItem("lange");
        this.lang = localStorage.getItem("lange");
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
