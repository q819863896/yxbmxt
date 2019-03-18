<template>
    <div class="retrievepass">
        <headers />
        <div class="main" v-if="findPass">
            <h3>{{lang === 'zh' ? '找回密码' : 'Reset Password'}}</h3>
            <div class="wrap">
                <p>{{lang === 'zh' ? '登陆有问题' : 'Login failed??'}}</p>
                <ul>
                    <li>{{lang === 'zh' ? '用户名的形式是电子邮箱地址。' : 'The user name is email address'}}</li>
                    <li>{{lang === 'zh' ? '密码区分大小写' : 'Password is case-sensitive'}}</li>
                </ul>
                <el-form :model="retrieve" :rules="lang === 'zh' ? zhloginRules : enloginRules" ref="retrieve" class="demo-ruleForm login-container">
                    <el-form-item :label="lang === 'zh' ? '电子邮箱' : 'Email'" prop="email">
                        <el-input type="email" name="email" v-model.trim="retrieve.email" auto-complete="off" :placeholder="lang === 'zh' ? '电子邮箱' : 'Email'"></el-input>
                    </el-form-item>
                    <div class="btnGroup">
                        <div class="cancel" @click="cancelBtn">{{lang === 'zh' ? '取消' : 'Cancel'}}</div>
                        <div class="continue" @click="continueBtn">{{lang === 'zh' ? '继续' : 'Continue'}}</div>
                    </div>
                </el-form>
            </div>
        </div>

        <div class="checkmail" v-else>
            <h3>{{lang === 'zh' ? '查看电子邮箱' : 'Please check your email'}}</h3>
            <div class="checkBox">
                <p>{{lang === 'zh' ? '我们已向您发送一封包含完成重置密码链接的。' : 'We have just sent an email contains a link to reset the password.'}}</p>
                <!-- <p>无法找到电子邮件？请检查您的垃圾邮件文件夹。</p> -->
                <p>{{lang === 'zh' ? '无法找到电子邮件？请检查您的垃圾邮件文件夹。' : 'Can not find the email? Please check your junk mail box.'}}</p>
                <div class="loginBtn" @click="loginBtn">
                    {{lang === 'zh' ? '登录' : 'Login'}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Headers from "../../components/header.vue";
import { forgetPwd } from "../../api/api.js";
export default {
    name: "retrievepass",
    components: {Headers},
    data() {
        return{
            findPass: true,
            lang: "",
            retrieve: {
                email: ""
            },
            zhloginRules: {
                email: [
                    { required: true, message: '请输入电子邮箱', trigger: 'blur' }
                ]
            },
            enloginRules: {
                email: [
                    { required: true, message: 'Please enter your e-mail', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        // 取消
        cancelBtn() {
            this.$router.go(-1);
        },
        // 继续
        continueBtn () {
            this.$refs.retrieve.validate((valid) => {
                if (valid) {
                    let params = {
                        email: this.retrieve.email
                    };
                    forgetPwd(params).then((res) => {
                        if (res.statu == 0) {
                            this.$message({
                                message: res.message,
                                type: 'warning'
                            });
                        } else {
                            this.findPass = false;
                        }
                    })
                } else {
                    return false;
                }
            })
        },
        loginBtn () {
            this.$router.push("/login");
        }
    },
    created() {
        // this.lang = sessionStorage.getItem("lange");
        this.lang = localStorage.getItem("lange");
    }
}
</script>

<style lang="scss" scoped>
.retrievepass{
    width: 100%;
    height: 100%;
    .main, .checkmail{
        width: 50%;
        margin-left: 25%;
        h3{
            text-align: center;
            margin-bottom: 8%;
        }
        .wrap{
            box-shadow: 0px 3px 24px #888888;
            padding: 6%;
            border-radius: 4px;
            p{
                margin-left: -20px;
                font-size: 14px;
            }
            ul{
                font-size: 12px;
            }
            .el-form{
                margin-left: -20px;
                .btnGroup{
                    width: 90%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-left: 5%;
                    .cancel{
                        width: 130px;
                        border: 1px solid #006960;
                        border-radius: 4px;
                        padding: 1% 4%;
                        cursor: pointer;
                        text-align: center;
                    }
                    .continue{
                        width: 130px;
                        background: #006960;
                        color: #ffffff;
                        border-radius: 4px;
                        margin-left: 5%;
                        padding: 1% 4%;
                        cursor: pointer;
                        text-align: center;
                    }
                }
            }
            
        }
    }
    .checkBox{
        width: 100%;
        height: 50%;
        padding: 5% 9%;
        box-shadow: 0px 3px 24px #888888;
        border-radius: 5px;
        .loginBtn{
            width: 100%;
            height: 30px;
            line-height: 30px;
            text-align: center;
            background: #006960;
            color: #ffffff;
            border-radius: 4px;
            margin: 10% 0 10% 0;
            cursor: pointer;
        }
    }
}
</style>
