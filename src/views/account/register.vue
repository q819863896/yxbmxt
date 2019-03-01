<template>
    <div class="register" >
        <div class="pic">
            <img src="@/assets/images/logo.png" alt="">
        </div>
        <!-- <div class="main"> -->
            <h3>{{lang === 'zh' ? '注册' : 'Register'}}</h3>
            <el-form :model="ruleForm" :rules="lang === 'zh' ? zhloginRules : enloginRules" ref="ruleForm" class="demo-ruleForm login-container">
                <el-form-item :label="lang === 'zh' ? '姓名' : 'Full name'" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <!-- 电子邮箱 -->
                <el-form-item :label="lang === 'zh' ? '电子邮箱' : 'Email'" prop="email">
                    <el-input v-model="ruleForm.email" @blur="checkMail"></el-input>
                    <div class="greetitle" v-if="titletrue">{{titletruetxt}}</div>
                    <div class="redtitle" v-if="titlefalse">{{titlefalsetxt}}</div>
                </el-form-item>
                <!-- 电话 -->
                <el-form-item :label="lang === 'zh' ? '电话' : 'Contact Number'" prop="tel">
                    <el-input v-model.number="ruleForm.tel"></el-input>
                </el-form-item>
                <!-- 国别 -->
                <el-form-item :label="lang === 'zh' ? '国别' : 'Country'" prop="country">
                    <el-select v-model="ruleForm.country" placeholder="" @change="checkCountry">
                        <el-option
                            v-for="item in countryOptions"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <!-- 院校名称 -->
                <el-form-item :label="lang === 'zh' ? '院校名称' : 'Institution Name'" prop="schoolName" class="schoolName">
                    <el-select v-model="ruleForm.schoolName" placeholder="" @change="checkSchool">
                        <el-option
                            v-for="item in schoolNameOptions"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <!-- 职位 -->
                <el-form-item :label="lang === 'zh' ? '职位' : 'Job Title'" prop="position">
                    <el-input v-model="ruleForm.position"></el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item :label="lang === 'zh' ? '密码' : 'password'" prop="password">
                    <el-input v-model="ruleForm.password"></el-input>
                </el-form-item>
                <div class="agreeClick">
                    <el-checkbox v-model="checked" @change="flagSubmitBtn">{{lang == "zh" ? "点击快速注册则表示您同意本网站" : "By clicking quick registration, you agree with the website "}}</el-checkbox>
                    <p class="server">{{lang == "zh" ? "服务条款" : "terms of service"}}</p>
                </div>
                
            </el-form>
            <el-button @click="submitForm('ruleForm')" :disabled="disFlag">{{lang == "zh" ? "快速注册" : "Rapid registration"}}</el-button>
        <!-- </div> -->
        
    </div>
</template>

<script>
import { regiset, allCountry, allSchool, checkemail } from "../../api/api.js";
export default {
    name: "register",
    data() {
        var checkEmail = (rule, value, callback) => {
            const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
            if (!value) {
                return callback(new Error('邮箱不能为空'))
            }
            if (mailReg.test(value)) {
                callback()
            } else {
                callback(new Error('请输入正确的邮箱格式'))
            }
        }
        return {
            lang: "",
            ruleForm: {
                name: "",
                email: "",
                tel: "",
                country: "",
                schoolName: "",
                position: "",
                password: "",
            },
            zhloginRules: {
                name: [
                    { required: true, message: '必须填', trigger: 'blur' }
                ],
                email: [
                    { required: true, message: '必须填', trigger: 'blur' },
                    {validator: checkEmail, trigger: 'blur'}
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
            },
            enloginRules: {
                name: [
                    { required: true, message: 'Must fill in', trigger: 'blur' }
                ],
                email: [
                    { required: true, message: 'Must fill in', trigger: 'blur' },
                    {validator: checkEmail, trigger: 'blur'}
                ],
                tel: [
                    { required: true, message: 'Must fill in', trigger: 'blur' }
                ],
                country: [
                    { required: true, message: 'Must fill in', trigger: 'blur' }
                ],
                schoolName: [
                    { required: true, message: 'Must fill in', trigger: 'blur' }
                ],
                position: [
                    { required: true, message: 'Must fill in', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: 'Must fill in', trigger: 'blur' }
                ]
            },
            titletrue: false,
            titletruetxt: "",
            titlefalsetxt: "",
            titlefalse: false,
            restaurants: [],
            countryOptions: [],
            schoolNameOptions: [],
            selectid: "",
            state2: "",
            timeout:  null,
            options4: "",
            value9: "",
            loading: false,
            states: [
                "Alabama", "Alaska", "Arizona",
                "Arkansas", "California", "Colorado",
                "Connecticut", "Delaware", "Florida",
                "Georgia", "Hawaii", "Idaho", "Illinois",
                "Indiana", "Iowa", "Kansas", "Kentucky",
                "Louisiana", "Maine", "Maryland",
                "Massachusetts", "Michigan", "Minnesota",
                "Mississippi", "Missouri", "Montana",
                "Nebraska", "Nevada", "New Hampshire",
                "New Jersey", "New Mexico", "New York",
                "North Carolina", "North Dakota", "Ohio",
                "Oklahoma", "Oregon", "Pennsylvania",
                "Rhode Island", "South Carolina",
                "South Dakota", "Tennessee", "Texas",
                "Utah", "Vermont", "Virginia",
                "Washington", "West Virginia", "Wisconsin",
                "Wyoming"
            ],
            checked: true,
            disFlag: false
        }
    },
    methods: {
        checkMail (e) {
            let txt = e.target.value;
            let params = {
                email: txt
            };
            if (txt == "") {
                this.titletrue = false;
                this.titlefalse = false;
            } else {
                checkemail(params).then((res) => {
                    if (res.statu == 1) {
                        // 此邮箱可以注册
                        this.titletrue = true;
                        this.titlefalse = false;
                        this.titletruetxt = res.message;
                        this.disFlag = false;
                    } else {
                        // 此邮箱已被注册
                        this.titletrue = false;
                        this.titlefalse = true;
                        this.titlefalsetxt = res.message;
                        this.disFlag = true;
                    }
                })
            }
        },

        checkCountry (val) {
            console.log(val);
            let params = {
                countryid: val
            };
            allSchool(params).then((res) => {
                if (res.statu == 1) {
                    this.schoolNameOptions = res.data;
                } else {
                    this.$message({
                        message: res.message,
                        type: 'warning'
                    });
                }
            })
        },
        checkSchool (val) {
            this.ruleForm.schoolName = val;
        },
        // 获取所有国家
        getCountry () {
            this.countryOptions = [];
            allCountry().then((res) => {
                if (res.statu == 1) {
                    this.countryOptions = res.data;
                }
            })
        },
        // 
        flagSubmitBtn () {
            if (this.checked == true) {
                this.disFlag = false;
            } else {
                this.disFlag = true;
            }
        },
        submitForm() {
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    let params = {
                        name: this.ruleForm.name,
                        email: this.ruleForm.email,
                        phone: this.ruleForm.tel,
                        // country: this.ruleForm.country,
                        schoolId: this.ruleForm.schoolName,
                        post: this.ruleForm.position,
                        password: this.ruleForm.password
                    };

                    regiset(params).then((res) => {
                        if (res.statu == 1) {
                            this.$message({
                                message: res.message,
                                type: 'success'
                            });
                            this.$router.push("/login");
                        } else {
                            this.$message({
                                message: res.message,
                                type: 'success'
                            });
                        }
                    })
                } else {
                    return false;
                }
            })
        }
    },
    computed: {
        
    },
    created () {
        this.lang = sessionStorage.getItem("lange");
    },
    mounted() {
        // this.restaurants = this.loadAll();
        this.flagSubmitBtn();
        this.getCountry();
    }
}
</script>

<style lang="scss" scoped>
.register{
    width: 100%;
    // height: 100%;
    display: flex;
    flex-direction: column;
    // .main{
        h3{
            width: 100%;
            height: 30px;
            text-align: center;
            padding: 2% 0;
        }
        .el-form{
            width: 60%;
            // height: 95%;
            box-shadow: 0px 0px 5px #a09d9d;
            margin: 4% 0 0 20%;
            padding: 6%;
            .el-form-item__content{
                width: 100%;
                .el-select{
                    width: 100%;
                    height: 100%;
                }
                .el-autocomplete{
                    width: 100%;
                    height: 100%;
                }
                .greetitle{
                    height: 20px;
                    color: #67C23A;
                }
                .redtitle{
                    height: 20px;
                    color: #F56C6C;
                }
                
            }
            
            .agreeClick{
                width: 100%;
                line-height: 30px;
                display: flex;
                input{
                    margin-top: 4px;
                }
                .server{
                    color: #0070D2;
                    margin-left: -10px;
                    cursor: pointer;
                    font-size: 14px;
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
        button{
            // width: 10%;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 2% 45% 2% 45%;
            span{
                display: inline-block;
                width: 100%;
                height: 100%;
                text-align: center;
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

