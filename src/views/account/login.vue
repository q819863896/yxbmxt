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
            <!-- <el-checkbox v-model="isRememberPsw" class="remember">记住密码</el-checkbox> -->
            <el-form-item style="width:100%;">
                <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">{{lang === "zh" ? "登录" : "Login"}}</el-button>
            </el-form-item>
            <!-- <p @click="toDemo">vuex</p> -->
            <el-form-item class="forget" @click="forgetBtn">{{lang === "zh" ? "忘记密码" : "Forget Password"}}</el-form-item>
            <!-- <div class="ordiv">
                <div class="left">- - - - - - - - - - </div>
                <div class="center">或</div>
                <div class="right"> - - - - - - - - - -</div>
            </div> -->
        </el-form>
        <div class="quick" @click="quick">{{lang === "zh" ? "快速注册" : "Quick Registration"}}</div>
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
        handleSubmit2() {
            console.log("asd");
            this.$refs.loginInfo.validate((valid) => {
                if (valid) {
                    let params = {
                        name: this.loginInfo.account,
                        password: this.loginInfo.password
                    };
                    Login(params).then((res) => {
                        if (res.message == "密码正确") {
                            sessionStorage.setItem("changeUser", this.loginInfo.account);
                            this.$router.push("/mine");
                        } else {
                            this.$message({
                                message: res.message,
                                type: 'warning'
                            });
                        }
                    })
                }
            })
        },
        forgetBtn() {
            console.log("asd");
            this.$router.push("/retrievepass");
        },
        quick(){
            this.$router.push("/register");
        },
        toDemo () {
            this.$router.push("/studys");
        }
    },
    created() {
        this.lang = sessionStorage.getItem("lange");
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
