<template>
    <div class="login_box" >
        <headers></headers>
        <el-form :model="loginInfo" :rules="loginRules" ref="loginInfo" class="demo-ruleForm login-container">
            <el-form-item label="用户名" prop="account" style="position: relative">
                <el-input type="text" name="account" v-model.trim="loginInfo.account" placeholder="账号">
                </el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" name="password" v-model.trim="loginInfo.password" auto-complete="off" placeholder="密码"></el-input>
            </el-form-item>
            <!-- <el-checkbox v-model="isRememberPsw" class="remember">记住密码</el-checkbox> -->
            <el-form-item style="width:100%;">
                <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">登录</el-button>
            </el-form-item>
            <el-form-item class="forget" @click.native.prevent="forget">忘记密码</el-form-item>
            <!-- <div class="ordiv">
                <div class="left">- - - - - - - - - - </div>
                <div class="center">或</div>
                <div class="right"> - - - - - - - - - -</div>
            </div> -->
            
        </el-form>
        <div class="quick" @click="quick">快速注册</div>
    </div>
</template>

<script>
import Headers from "../../components/header.vue";
import { Login } from "../../api/api.js";
export default {
    name: "login",
    components: {
        Headers
    },
    data() {
        return {
            logining: false,
            loginInfo: {
                account: "",
                password: ""
            },
            loginRules: {
               account: [
                  { required: true, message: '请输入账号', trigger: 'blur' },
               ],
               password: [
                  { required: true, message: '请输入密码', trigger: 'blur' },
               ]
            },
        }
    },
    methods: {
        handleSubmit2() {
            this.$refs.loginInfo.validate((valid) => {
                if (valid) {
                    let params = {
                        name: this.loginInfo.account,
                        password: this.loginInfo.password
                    };
                    Login(params).then((res) => {
                        if (res.message == "密码正确") {
                            this.$router.push("/mine");
                        } else {
                            this.$message({
                                message: res.message,
                                type: 'warning'
                            });
                        }
                    })
                }
                // this.$router.push("/mine");
            })
        },
        forget() {
            console.log("asd");
            this.$router.push("/retrievepass")
        },
        quick(){
            this.$router.push("/register")
        }
    }
}
</script>


<style lang="scss" scoped>
.login_box{
    width: 100%;
    height: 100%;
    .el-form{
        padding: 9% 15% 0;
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
