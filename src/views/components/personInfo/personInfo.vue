<template>
    <div class="personInfo">
        <h3>账户信息</h3>
        
        <div class="wrap" >
            <div class="left">
                <h4>详细资料</h4>
                <div class="zsInfo" v-if="zsflag">
                    <div class="item">
                        <div class="itemDiv">
                            <i class="iconfont icon-zhongdian fontR"></i><span>姓名</span>
                            <p class="itemClass">Juna</p>
                        </div>
                        <div class="itemDiv">
                            <i class="iconfont icon-zhongdian fontR"></i><span>电子邮箱</span>
                            <p class="itemClass">lynag@cloudcc.com</p>
                        </div>
                        <div class="itemDiv">
                            <i class="iconfont icon-zhongdian fontR"></i><span>电话</span>
                            <p class="itemClass">15910001000</p>
                        </div>
                        <div class="itemDiv">
                            <i class="iconfont icon-zhongdian fontR"></i><span>国别</span>
                            <p class="itemClass">澳大利亚</p>
                        </div>
                        <div class="itemDiv">
                            <i class="iconfont icon-zhongdian fontR"></i><span>院校名称</span>
                            <p class="itemClass">Yong lyv</p>
                        </div>
                        <div class="itemDiv">
                            <i class="iconfont icon-zhongdian fontR"></i><span>职位</span>
                            <p class="itemClass">老师</p>
                        </div>
                        <div class="chageInfoBtn" @click="chageInfoBtn">更新资料</div>
                    </div>
                </div>
                <el-form :model="detailedInfo" :rules="detailedInfoRules" ref="detailedInfo" class="demo-ruleForm login-container" v-else>
                    <el-form-item label="姓名" prop="userName" style="position: relative">
                        <el-input type="text" name="userName" v-model.trim="detailedInfo.userName" placeholder="账号">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="电子邮箱" prop="email">
                        <el-input type="email" name="email" v-model.trim="detailedInfo.email" auto-complete="off" placeholder="密码"></el-input>
                    </el-form-item>
                    <el-form-item label="电话" prop="tel">
                        <el-input type="tel" name="tel" v-model.trim="detailedInfo.tel" auto-complete="off" placeholder="密码"></el-input>
                    </el-form-item>
                    <el-form-item label="国别" prop="country">
                        <el-input type="country" name="country" v-model.trim="detailedInfo.country" auto-complete="off" placeholder="密码"></el-input>
                    </el-form-item>
                    <el-form-item label="院校名称" prop="schoolName">
                        <el-input type="schoolName" name="schoolName" v-model.trim="detailedInfo.schoolName" auto-complete="off" placeholder="密码"></el-input>
                    </el-form-item>
                    <el-form-item label="职位" prop="position">
                        <el-input type="position" name="position" v-model.trim="detailedInfo.position" auto-complete="off" placeholder="密码"></el-input>
                    </el-form-item>
                    <div class="btnGroup">
                        <div class="cancelBtn" @click="cancelBtn">取消</div>
                        <div class="continueBtn" @click="continueBtn">继续</div>
                    </div>
                </el-form>
            </div>
            <!--  -->
            <div class="right">
                <h4>修改密码</h4>
                <el-form :model="changePass" :rules="changePassRules" ref="changePass" class="demo-ruleForm login-container">
                    <el-form-item label="初始密码" prop="csPass" style="position: relative">
                        <el-input type="text" name="csPass" v-model.trim="changePass.csPass" placeholder="账号">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop="newPass">
                        <el-input type="newPass" name="newPass" v-model.trim="changePass.newPass" auto-complete="off" placeholder="密码"></el-input>
                    </el-form-item>
                    <el-form-item label="再次输入密码" prop="aginPass">
                        <el-input type="aginPass" name="aginPass" v-model.trim="changePass.aginPass" auto-complete="off" placeholder="密码"></el-input>
                    </el-form-item>
                    <div class="changePassBtn" @click.native.prevent="changePassBtn">更改密码</div>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "personInfo",
    data() {
        return {
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
            changePassRules: {
                csPass: [
                    { required: true, message: '请输入初始密码', trigger: 'blur' }
                ],
                newPass: [
                    { required: true, message: '请输入新密码', trigger: 'blur' }
                ],
                aginPass: [
                    { required: true, message: '请再次输入密码', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        chageInfoBtn () {
            this.zsflag = false;
        },
        cancelBtn () {
            this.zsflag = true;
        },
        // 报名
        pickContueBtn () {

        },
        // 取消报名
        pickCancelBtn () {

        }
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
                        width: 58px;
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
        }
        .chageInfoBtn{
            margin-top: 5%;
        }
        .chageInfoBtn, .changePassBtn{
            width: 86px;
            height: 30px;
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
