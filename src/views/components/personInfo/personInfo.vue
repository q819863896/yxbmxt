<template>
    <div class="personInfo">
        
        <h3>{{lang == 'zh' ? '账户信息' : 'Account Information'}}</h3>
        
        <div class="wrap" >
            <div class="left">
                <h4>{{lang == 'zh' ? '详细资料' : 'Detailed Information'}}</h4>
                <div class="zsInfo" v-if="zsflag">
                    <div class="item">
                        <div class="itemDiv">
                            <i class="iconfont icon-zhongdian fontR"></i><span>{{lang == 'zh' ? '姓名' : 'Username'}}</span>
                            <p class="itemClass">Juna</p>
                        </div>
                        <div class="itemDiv">
                            <i class="iconfont icon-zhongdian fontR"></i><span>{{lang == 'zh' ? '电子邮箱' : 'Email'}}</span>
                            <p class="itemClass">lynag@cloudcc.com</p>
                        </div>
                        <div class="itemDiv">
                            <!-- 电话 -->
                            <i class="iconfont icon-zhongdian fontR"></i><span>{{lang == 'zh' ? '电话' : 'Contact Number'}}</span>
                            <p class="itemClass">15910001000</p>
                        </div>
                        <div class="itemDiv">
                            <!-- 国别 -->
                            <i class="iconfont icon-zhongdian fontR"></i><span>{{lang == 'zh' ? '国别' : 'Country'}}</span>
                            <p class="itemClass">澳大利亚</p>
                        </div>
                        <div class="itemDiv">
                            <!-- 院校名称 -->
                            <i class="iconfont icon-zhongdian fontR"></i><span>{{lang == 'zh' ? '院校名称' : 'Institution Name'}}</span>
                            <p class="itemClass">Yong lyv</p>
                        </div>
                        <div class="itemDiv">
                            <!-- 职位 -->
                            <i class="iconfont icon-zhongdian fontR"></i><span>{{lang == 'zh' ? '职位' : 'Job Title'}}</span>
                            <p class="itemClass">老师</p>
                        </div>
                        <!-- 更新资料 -->
                        <div class="chageInfoBtn" @click="chageInfoBtn">{{lang == 'zh' ? '更新资料' : 'Information Updates'}}</div>
                    </div>
                </div>
                <el-form :model="detailedInfo" :rules="detailedInfoRules" ref="detailedInfo" class="demo-ruleForm login-container" v-else>
                    <el-form-item :label="lang == 'zh' ? '姓名' : 'Username'" prop="userName" style="position: relative">
                        <el-input type="text" name="userName" v-model.trim="detailedInfo.userName" :placeholder="lang == 'zh' ? '姓名' : 'Username'">
                        </el-input>
                    </el-form-item>
                    <!-- 电子邮箱 -->
                    <el-form-item :label="lang == 'zh' ? '电子邮箱' : 'Email'" prop="email">
                        <el-input type="email" name="email" v-model.trim="detailedInfo.email" auto-complete="off" :placeholder="lang == 'zh' ? '电子邮箱' : 'Email'"></el-input>
                    </el-form-item>
                    <!-- 电话 -->
                    <el-form-item :label="lang == 'zh' ? '电话' : 'Contact Number'" prop="tel">
                        <el-input type="text" name="tel" v-model.trim="detailedInfo.tel" auto-complete="off" :placeholder="lang == 'zh' ? '电话' : 'Contact Number'"></el-input>
                    </el-form-item>
                    <!-- 国别 -->
                    <el-form-item :label="lang == 'zh' ? '国别' : 'Country'" prop="country">
                        <el-input type="text" name="country" v-model.trim="detailedInfo.country" auto-complete="off" :placeholder="lang == 'zh' ? '国别' : 'Country'"></el-input>
                    </el-form-item>
                    <!-- 院校名称 -->
                    <el-form-item :label="lang == 'zh' ? '院校名称' : 'Institution Name'" prop="schoolName">
                        <el-input type="text" name="schoolName" v-model.trim="detailedInfo.schoolName" auto-complete="off" :placeholder="lang == 'zh' ? '院校名称' : 'Institution Name'"></el-input>
                    </el-form-item>
                    <!-- 职位 -->
                    <el-form-item :label="lang == 'zh' ? '职位' : 'Job Title'" prop="position">
                        <el-input type="text" name="position" v-model.trim="detailedInfo.position" auto-complete="off" :placeholder="lang == 'zh' ? '职位' : 'Job Title'"></el-input>
                    </el-form-item>
                    <div class="btnGroup">
                        <!-- 取消 -->
                        <div class="cancelBtn" @click="cancelBtn">{{lang == 'zh' ? '取消' : 'Cancel'}}</div>
                        <!-- 继续 -->
                        <div class="continueBtn" @click="continueBtn">{{lang == 'zh' ? '继续' : 'Continue'}}</div>
                    </div>
                </el-form>
            </div>
            <!--  -->
            <div class="right">
                <!-- <h4>修改密码</h4> -->
                <h4>{{lang == 'zh' ? '修改密码' : 'Change Password'}}</h4>
                <el-form :model="changePass" :rules="lang == 'zh' ? zhchangePassRules : enchangePassRules" ref="changePass" class="demo-ruleForm login-container">
                    <!-- 初始密码 -->
                    <el-form-item :label="lang == 'zh' ? '初始密码' : 'Original Password'" prop="csPass" style="position: relative">
                        <el-input type="password" name="csPass" v-model.trim="changePass.csPass" :placeholder="lang == 'zh' ? '初始密码' : 'Original Password'" @blur="checkPass">
                        </el-input>
                        <p v-if="notPass" class="notPass">{{lang == 'zh' ? '与原密码不一致' : 'Inconsistent with the original password'}}</p>
                    </el-form-item>
                    <!-- 新密码 -->
                    <el-form-item :label="lang == 'zh' ? '新密码' : 'New Password'" prop="newPass">
                        <el-input type="password" name="newPass" v-model.trim="changePass.newPass" auto-complete="off" :placeholder="lang == 'zh' ? '新密码' : 'New Password'" @blur="checkNewPass"></el-input>
                        <p v-if="newcs" class="notPass">{{lang == 'zh' ? '新密码与初始密码一致' : 'The new password is identical to the original password'}}</p>
                        <p v-if="sixss" class="notPass">{{lang == 'zh' ? '只能输入6-20个字母、数字、下划线' : 'Only 6-20 letters, numbers, underscores can be entered'}}</p>
                    </el-form-item>
                    <!-- 再次输入密码 -->
                    <el-form-item :label="lang == 'zh' ? '再次输入密码' : 'Enter Password Again'" prop="aginPass">
                        <el-input type="password" name="aginPass" v-model.trim="changePass.aginPass" auto-complete="off" :placeholder="lang == 'zh' ? '再次输入密码' : 'Enter Password Again'" @blur="checkAgin"></el-input>
                        <p v-if="againTit" class="notPass">{{lang == 'zh' ? '修改密码两次不一致' : 'Two inconsistencies in password modification'}}</p>
                    </el-form-item>
                    <!-- 更改密码 -->
                    <el-button class="changePassBtn" @click.native.prevent="changePassBtn" :disabled="disFlag">{{lang == 'zh' ? '更改密码' : 'Change Password'}}</el-button>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import { updatepwd, succeedpwd } from "../../../api/api.js";
export default {
    name: "personInfo",
    data() {
        return {
            lang: "",
            pickPeo: {
                userName: "",
                email: "",
                tel: "",
                position: "",
                country: "",
                schoolName: ""
            },
            pickPeoRules: {
                userName: [
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                ],
                email: [
                    { required: true, message: '请输入电子邮箱', trigger: 'blur' },
                ],
                tel: [
                    { required: true, message: '请输入电话', trigger: 'blur' },
                ],
                position: [
                    { required: true, message: '请输入职位', trigger: 'blur' },
                ],
                country: [
                    { required: true, message: '请输入国别', trigger: 'blur' },
                ],
                schoolName: [
                    { required: true, message: '请输入院校名称', trigger: 'blur' },
                ],
                lecture: [
                    { required: true, message: '请输入选择', trigger: 'blur' },
                ]
            },
            options: [
                {
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                },
            ],
            value: "",
            zloptions: [
                {
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                },
            ],
            zlvalue: "",
            checked: false,
            zsflag: true,
            detailedInfo: {
                userName: "",
                email: "",
                tel: "",
                country: "",
                schoolName: "",
                position: ""
            },
            detailedInfoRules: {
                userName: [
                    { required: true, message: '请输入姓名', trigger: 'blur' }
                ],
                email: [
                    { required: true, message: '请输入电子邮箱', trigger: 'blur' }
                ],
                tel: [
                    { required: true, message: '请输入电话', trigger: 'blur' }
                ],
                country: [
                    { required: true, message: '请输入国别', trigger: 'blur' }
                ],
                schoolName: [
                    { required: true, message: '请输入院校名称', trigger: 'blur' }
                ],
                position: [
                    { required: true, message: '请输入职位', trigger: 'blur' }
                ]
            },
            changePass: {
                csPass: "",
                newPass: "",
                aginPass: ""
            },
            zhchangePassRules: {
                csPass: [
                    { required: true, message: '请输入初始密码', trigger: 'blur' }
                ],
                newPass: [
                    { required: true, message: '请输入新密码', trigger: 'blur' }
                ],
                aginPass: [
                    { required: true, message: '请再次输入密码', trigger: 'blur' }
                ]
            },
            enchangePassRules: {
                csPass: [
                    { required: true, message: 'Please enter the initial password', trigger: 'blur' }
                ],
                newPass: [
                    { required: true, message: 'Please enter a new password', trigger: 'blur' }
                ],
                aginPass: [
                    { required: true, message: 'Please enter your password again', trigger: 'blur' }
                ]
            },
            notPass: false,
            newcs: false,
            sixss: false,
            againTit: false,
            disFlag: false
        }
    },
    methods: {
        chageInfoBtn () {
            this.zsflag = false;
        },
        cancelBtn () {
            this.zsflag = true;
        },
        checkPass (e) {
            let params = {
                password: e.target.value
            };
            if (e.target.value !== "") {
                updatepwd(params).then((res) => {
                    if (res.message == "密码错误" ) {
                        this.notPass = true;
                        this.disFlag = true;
                    } else {
                        this.notPass = false;
                        this.disFlag = false;
                    }
                })
            } else {
                this.notPass = false;
            }
        },
        // 验证新老密码
        checkNewPass (e) {
            let patrn = /^(\w){6,20}$/;
            if (!patrn.exec(e.target.value)) {
                // return false;
                this.sixss = true;
            } else {
                this.sixss = false;
                if (e.target.value == this.changePass.csPass) {
                    this.newcs = true;
                    this.disFlag = true;
                } else {
                    this.newcs = false;
                    this.disFlag = false;
                }
            }
            
        },
        // 验证第二次
        checkAgin (e) {
            if (e.target.value !== this.changePass.newPass) {
                this.againTit = true;
                this.disFlag = false;
            } else {
                this.againTit = false;
                this.disFlag = true;
            }
        },
        // 验证再次输入的密码
        changePassBtn () {
            let params = {
                password: this.changePass.newPass
            };
            if (this.changePass.aginPass == "") {

            }
            if (this.changePass.newPass != this.changePass.aginPass) {
                this.$message.error('修改密码两次不一致');
            } else {
                succeedpwd(params).then((res) => {
                    this.$message({
                        message: '密码修改成功',
                        type: 'success'
                    });
                })
            }
        }
    },
    created () {
        this.lang = sessionStorage.getItem("lange");
    }
}
</script>

<style lang="scss" scoped>
.personInfo{
    width: 100%;
    height: 100%;
    h3{
        padding: 0 5%;
        color: #17315C;
        font-size: 18px;
        padding: 3% 0 2% 5%;
    }

    .content{
        margin-top: 50px;
    }
    .wrap{
        width: 90%;
        display: flex;
        margin-left: 5%;
        box-shadow: 0px 0px 10px #979797;
        padding: 3% 0 3% 0;
        color: #17315C;
        .left{
            width: 50%;
            border-right: 1px dashed #979797;
            padding: 0 5%;
            h4{
                font-size: 16px;
                color: #17315C;
            }
            .zsInfo{
                .item{
                    .itemDiv{
                        padding-top: 4%;
                        .fontR{
                            color: #F56C6C;
                            font-size: 10px;
                        }
                        span{
                            font-size: 14px;
                        }
                        .itemClass{
                            line-height: 22px;
                            border-bottom: 1px dashed #D8DDE6;
                        }
                    }
                    
                }
                
            }
            .demo-ruleForm{
                .btnGroup{
                    width: 100%;
                    display: flex;
                    .cancelBtn, .continueBtn{
                        padding: 0 2%;
                        height: 30px;
                        text-align: center;
                        line-height: 30px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        border: 1px solid #006960;
                        border-radius: 4px;
                        margin-left: 20%;
                        cursor: pointer;
                    }
                    .cancelBtn{
                        color: #006960;
                    }
                    .continueBtn{
                        color: #ffffff;
                        background: #006960;
                    }
                }
            }
        }
        .right{
            width: 50%;
            padding: 0 5%;
            .notPass{
                color: #F56C6C;
                margin-bottom: -15%;
                font-size: 12px;
            }
        }
        .chageInfoBtn{
            margin-top: 5%;
        }
        .chageInfoBtn, .changePassBtn{
            // width: 86px;
            height: 30px;
            padding: 0 2%;
            text-align: center;
            line-height: 30px;
            border: 1px solid #006960;
            border-radius: 4px;
            color: #006960;
            float: right;
            cursor: pointer;
            font-size: 14px;
        }
    }
}
</style>
