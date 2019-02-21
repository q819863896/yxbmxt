<template>
    <div class="register" >
        <headers class="header"></headers>
        <!-- <div class="main"> -->
            <h3>注册</h3>
            <el-form :model="ruleForm" :rules="loginRules" ref="ruleForm" class="demo-ruleForm login-container">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="电子邮箱" prop="email">
                    <el-input v-model="ruleForm.email"></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="tel">
                    <el-input v-model="ruleForm.tel"></el-input>
                </el-form-item>
                <el-form-item label="国别" prop="country">
                    <el-select v-model="ruleForm.country" placeholder="">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="院校名称" prop="schoolName" class="schoolName">
                    <el-input v-model="ruleForm.schoolName"></el-input>
                    <img src="../../assets/images/find.png" alt="">
                </el-form-item>
                <el-form-item label="职位" prop="position">
                    <el-input v-model="ruleForm.position"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="ruleForm.password"></el-input>
                </el-form-item>
                <div class="agreeClick">
                    <input type="checkbox" name="category" id="asd" value="1" />
                    <label for="asd">点击快速注册则表示您同意本网站</label>
                    <p class="server">服务条款</p>
                </div>
                
            </el-form>
            <div class="regisBtn" @click="submitForm('ruleForm')">快速注册</div>
        <!-- </div> -->
        
    </div>
</template>

<script>
import Headers from "../../components/header.vue";
export default {
    name: "register",
    components: {Headers},
    data() {
        return {
            ruleForm: {
                name: "",
                email: "",
                tel: "",
                country: "",
                schoolName: "",
                position: "",
                password: "",
            },
            loginRules: {
                name: [
                    { required: true, message: '必须填', trigger: 'blur' }
                ],
                email: [
                    { required: true, message: '必须填', trigger: 'blur' }
                ],
                tel: [
                    { required: true, message: '必须填', trigger: 'blur' }
                ],
                country: [
                    { required: true, message: '必须填', trigger: 'blur' }
                ],
                schoolName: [
                    { required: true, message: '必须填', trigger: 'blur' }
                ],
                position: [
                    { required: true, message: '必须填', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '必须填', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        submitForm() {
            // this.$refs.ruleForm.validate((valid) => {

            // })
            this.$router.push("/login")
        }
    }
}
</script>

<style lang="scss" scoped>
.register{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    // .main{
        h3{
            width: 100%;
            height: 30px;
            text-align: center;
        }
        .el-form{
            width: 60%;
            // height: 95%;
            box-shadow: 0px 0px 5px #a09d9d;
            margin-left: 20%;
            padding: 6%;
            .el-form-item__content{
                width: 100%;
                .el-select{
                    width: 100%;
                    height: 100%;
                }
            }
            
            .agreeClick{
                width: 100%;
                display: flex;
                input{
                    margin-top: 4px;
                }
                .server{
                    color: #0070D2;
                    margin-left: 10px;
                    cursor: pointer;
                }
            }
            .schoolName{
                position: relative;
                img{
                    width: 40px;
                    height: 40px;
                    position: absolute;
                    right: 0;
                    top: 40px;
                    cursor: pointer;
                }
            }
        }
    // }
    .regisBtn{
        width: 10%;
        height: 24px;
        line-height: 24px;
        text-align: center;
        border: 1px solid #006960;
        border-radius: 5px;
        margin:  8% 45% 8% 45%;
        cursor: pointer;
    }
}
</style>

