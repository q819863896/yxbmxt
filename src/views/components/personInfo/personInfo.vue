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
                            <p class="itemClass">{{this.perInf.user.name}}</p>
                        </div>
                        <div class="itemDiv">
                            <i class="iconfont icon-zhongdian fontR"></i><span>{{lang == 'zh' ? '电子邮箱' : 'Email'}}</span>
                            <p class="itemClass">{{this.perInf.user.email}}</p>
                        </div>
                        <div class="itemDiv">
                            <!-- 电话 -->
                            <i class="iconfont icon-zhongdian fontR"></i><span>{{lang == 'zh' ? '电话' : 'Contact Number'}}</span>
                            <p class="itemClass">{{this.perInf.user.phone}}</p>
                        </div>
                        <div class="itemDiv">
                            <!-- 国别 -->
                            <i class="iconfont icon-zhongdian fontR"></i><span>{{lang == 'zh' ? '国别' : 'Country'}}</span>
                            <p class="itemClass">{{this.perInf.country.name}}</p>
                        </div>
                        <div class="itemDiv">
                            <!-- 院校名称 -->
                            <i class="iconfont icon-zhongdian fontR"></i><span>{{lang == 'zh' ? '院校名称' : 'Institution Name'}}</span>
                            <p class="itemClass">{{this.perInf.school.name}}</p>
                        </div>
                        <div class="itemDiv">
                            <!-- 职位 -->
                            <i class="iconfont icon-zhongdian fontR"></i><span>{{lang == 'zh' ? '职位' : 'Job Title'}}</span>
                            <p class="itemClass">{{this.perInf.user.post}}</p>
                        </div>
                        <!-- 更新资料 -->
                        <div class="chageInfoBtn" @click="chageInfoBtn">{{lang == 'zh' ? '更新资料' : 'Information Updates'}}</div>
                    </div>
                </div>
                <!-- detailedInfoRules -->
                <el-form :model="detailedInfo" :rules="lang == 'zh' ? detailedInfoRules : enchangePassRules" ref="detailedInfo" class="demo-ruleForm login-container" v-else>
                    <el-form-item :label="lang == 'zh' ? '姓名' : 'Username'" prop="userName" >
                        <el-input type="text" v-model.trim="detailedInfo.userName" :placeholder="lang == 'zh' ? '姓名' : 'Username'">
                        </el-input>
                    </el-form-item>
                    <!-- 电子邮箱 -->
                    <el-form-item :label="lang == 'zh' ? '电子邮箱' : 'Email'" prop="email">
                        <el-input type="email" v-model.trim="detailedInfo.email" auto-complete="off" :placeholder="lang == 'zh' ? '电子邮箱' : 'Email'" :disabled="true"></el-input>
                    </el-form-item>
                    <!-- 电话 -->
                    <el-form-item :label="lang == 'zh' ? '电话' : 'Contact Number'" prop="tel">
                        <el-input type="text" v-model.trim="detailedInfo.tel" auto-complete="off" :placeholder="lang == 'zh' ? '电话' : 'Contact Number'"></el-input>
                    </el-form-item>
                    <!-- 国别 -->
                    <!-- <el-form-item :label="lang == 'zh' ? '国别' : 'Country'" prop="country">
                        <el-input type="text" name="country" v-model.trim="detailedInfo.country" auto-complete="off" :placeholder="lang == 'zh' ? '国别' : 'Country'"></el-input>
                    </el-form-item> -->
                    <el-form-item :label="lang === 'zh' ? '国别' : 'Country'" prop="country">
                        <el-select v-model="detailedInfo.country" placeholder="" @change="checkCountry">
                            <el-option
                                v-for="item in countryOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <!-- 院校名称 -->
                    <!-- <el-form-item :label="lang == 'zh' ? '院校名称' : 'Institution Name'" prop="schoolName">
                        <el-input type="text" name="schoolName" v-model.trim="detailedInfo.schoolName" auto-complete="off" :placeholder="lang == 'zh' ? '院校名称' : 'Institution Name'"></el-input>
                    </el-form-item> -->
                        <el-form-item :label="lang === 'zh' ? '院校名称' : 'Institution Name'" prop="schoolName" class="schoolName">
                        <el-select v-model="detailedInfo.schoolName" placeholder="" @change="checkSchool">
                            <el-option
                                v-for="item in schoolNameOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <!-- 职位 -->
                    <el-form-item :label="lang == 'zh' ? '职位' : 'Job Title'" prop="position">
                        <el-input type="text" v-model.trim="detailedInfo.position" auto-complete="off" :placeholder="lang == 'zh' ? '职位' : 'Job Title'"></el-input>
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
                <h4>{{lang == 'zh' ? '修改密码' : 'Change Password'}}</h4>
                <el-form :model="changePass" :rules="lang == 'zh' ? zhchangePassRules : enchangePassRules" ref="changePass" class="demo-ruleForm login-container">
                    <el-form-item :label="lang == 'zh' ? '初始密码' : 'Original Password'" prop="csPass" >
                        <el-input type="password" v-model.trim="changePass.csPass" :placeholder="lang == 'zh' ? '初始密码' : 'Original Password'" @blur="checkPass">
                        </el-input>
                        <p v-if="notPass" class="notPass">{{lang == 'zh' ? '与原密码不一致' : 'Inconsistent with the original password'}}</p>
                    </el-form-item>
                    <el-form-item :label="lang == 'zh' ? '新密码' : 'New Password'" prop="newPass">
                        <el-input type="password" v-model.trim="changePass.newPass" auto-complete="off" :placeholder="lang == 'zh' ? '新密码' : 'New Password'" @blur="checkNewPass"></el-input>
                        <p v-if="newcs" class="notPass">{{lang == 'zh' ? '新密码与初始密码一致' : 'The new password is identical to the original password'}}</p>
                        <p v-if="sixss" class="notPass">{{lang == 'zh' ? '只能输入6-20个字母、数字、下划线' : 'Only 6-20 letters, numbers, underscores can be entered'}}</p>
                    </el-form-item>
                    <el-form-item :label="lang == 'zh' ? '再次输入密码' : 'Enter Password Again'" prop="aginPass">
                        <el-input type="password" v-model.trim="changePass.aginPass" auto-complete="off" :placeholder="lang == 'zh' ? '再次输入密码' : 'Enter Password Again'" @blur="checkAgin"></el-input>
                        <!-- <p v-if="againTit" class="notPass">{{lang == 'zh' ? '修改密码两次不一致' : 'Two inconsistencies in password modification'}}</p> -->
                    </el-form-item>
                    <el-button class="changePassBtn" @click.native.prevent="changePassBtn" :disabled="disFlag">{{lang == 'zh' ? '更改密码' : 'Change Password'}}</el-button>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import { updatepwd, succeedpwd, selectUser, allCountry, allSchool, updateUser } from "../../../api/api.js";
export default {
    name: "personInfo",
    data() {
        return {
            lang: "",
            perInf: {},
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
            countryOptions: [],     // 国别
            schoolNameOptions: [],  // 院校名称
            checked: false,
            zsflag: true,
            detailedInfo: {
                userName: "",
                email: "",
                tel: "",
                country: "",
                schoolName: "",
                position: "",
                schoolId: "",
                id: "",
                countryId: ""
            },
            zhdetailedInfoRules: {
                userName: [
                    { required: true, message: '请输入姓名', trigger: 'blur' }
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
            endetailedInfoRules: {
                userName: [
                    { required: true, message: 'Please enter your name.', trigger: 'blur' }
                ],
                tel: [
                    { required: true, message: 'Please enter the telephone number.', trigger: 'blur' }
                ],
                country: [
                    { required: true, message: 'Please enter country', trigger: 'blur' }
                ],
                schoolName: [
                    { required: true, message: 'Please enter the name of the institution.', trigger: 'blur' }
                ],
                position: [
                    { required: true, message: 'Please enter the position', trigger: 'blur' }
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
        // 获取个人信息
        getPerInfo () {
            selectUser().then((res) => {
                this.perInf = res.data;
                this.detailedInfo.userName = res.data.user.name;
                this.detailedInfo.email = res.data.user.email;
                this.detailedInfo.tel = res.data.user.phone;
                this.detailedInfo.country = res.data.country.name;
                this.detailedInfo.schoolName = res.data.school.name;
                this.detailedInfo.position = res.data.user.post;
                this.detailedInfo.schoolId = res.data.school.id;
                this.detailedInfo.id = res.data.user.id;
                this.detailedInfo.countryId = res.data.country.id;
            })
        },
        chageInfoBtn () {
            this.zsflag = false;
            allCountry().then((res) => {
                this.countryOptions = res.data;
            })
            let params = {
                countryid: this.detailedInfo.countryId
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
        // 选择国别
        checkCountry (val) {
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
            console.log(val);
            this.detailedInfo.schoolId = val;
        },
        cancelBtn () {
            this.zsflag = true;
        },
        continueBtn () {
            let params = {
                name: this.detailedInfo.userName,
                phone: this.detailedInfo.tel,
                schoolId: this.detailedInfo.schoolId,
                post: this.detailedInfo.position,
                id: this.detailedInfo.id
            };
            updateUser(params).then((res) => {
                if (res.statu == 1) {
                    if (this.lang == "zh") {
                        this.$message({
                            message: res.message,
                            type: 'success'
                        });
                        location.reload();
                    } else {
                        this.$message({
                            message: 'Successful revision!',
                            type: 'success'
                        });
                        location.reload();
                    }
                }
            })
        },
        checkPass (e) {
            let params = {
                password: this.$md5(e.target.value)
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
            // let patrn = /^(\w){6,20}$/;
            // if (!patrn.exec(e.target.value)) {
            //     // return false;
            //     this.sixss = true;
            //     this.newcs = true;
            // } else {
            //     this.sixss = false;
                if (e.target.value == this.changePass.csPass) {
                    this.newcs = true;
                    this.disFlag = true;
                } else {
                    this.newcs = false;
                    this.disFlag = false;
                }
            // }
            
        },
        // 验证第二次
        checkAgin (e) {
            console.log(this.changePass.csPass);
            if (e.target.value !== this.changePass.newPass && e.target.value != this.changePass.csPass) {
                this.againTit = true;
                this.disFlag = true;
            } else {
                this.againTit = false;
                this.disFlag = false;
            }
        },
        // 验证再次输入的密码
        changePassBtn () {
            let params = {
                password: this.$md5(this.changePass.newPass)
            };
            if (this.lang == "zh") {
                if (this.changePass.csPass == "" && this.changePass.newPass == "" && this.changePass.aginPass == "") {
                    this.$message.error('请输入修改密码');
                } else if (this.changePass.aginPass == "") {
                    this.$message.error('请输入修改密码');
                } else {
                    let patrn = /^(\w){6,20}$/;
                    if (!patrn.exec(this.changePass.aginPass)) {
                        this.sixss = true;
                    } else {
                        this.sixss = false;
                        succeedpwd(params).then((res) => {
                            this.$message({
                                message: '密码修改成功',
                                type: 'success'
                            });
                        })
                        this.$router.push("/testlogin");
                    }
                }
            } else {
                if (this.changePass.csPass == "" && this.changePass.newPass == "" && this.changePass.aginPass == "") {
                    this.$message.error('Please enter a modified password');
                } else if (this.changePass.aginPass == "") {
                    this.$message.error('Please enter a modified password');
                } else {
                    let patrn = /^(\w){6,20}$/;
                    if (!patrn.exec(this.changePass.aginPass)) {
                        this.sixss = true;
                    } else {
                        this.sixss = false;
                        succeedpwd(params).then((res) => {
                            this.$message({
                                message: 'Successful password modification',
                                type: 'success'
                            });
                        });
                        this.$router.push("/testlogin");
                    }
                }
            }
        },
    },
    created () {
        // this.lang = sessionStorage.getItem("lange");
        this.lang = localStorage.getItem("lange");
    },
    mounted () {
        this.getPerInfo();
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
            .el-form{
                .el-form-item{
                    .el-select{
                        width: 100%;
                    }
                    .el-form-item__error{
                        color: #f56c6c;
                        font-size: 12px;
                        line-height: 1;
                        padding-top: 4px;
                        position: absolute;
                        top: 136%;
                        left: 0;
                    }
                }
            }
            .demo-ruleForm{
                .btnGroup{
                    width: 100%;
                    display: flex;
                    .cancelBtn, .continueBtn{
                        min-width: 50px;
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
            .el-form{
                .el-form-item{
                    line-height: 80px;
                }
            }
            .notPass{
                color: #F56C6C;
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
