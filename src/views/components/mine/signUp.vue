<template>
    <div class="pickPeo">
        <div class="topHeader" ref="tophead">
            <div class="logoBox" ref="logoBox">
                <img class="logo" src="@/assets/images/logo.png" alt="">
            </div>
            <div class="right">
                <router-link to="/message" class="message" ref="message" @click.native.prevent="message"><!--   -->
                    <img src="@/assets/images/message.png" alt="">
                    <p></p>
                </router-link>
                <router-link to="/personInfo" class="personInfo" ref="personInfo" @click.native.prevent="personInfo"><!--  -->
                    <img class="personPic" src="@/assets/images/personInfo.png" alt="">
                </router-link>
                <div to="/logoout" class="logoout" ref="logoout" @click.native.prevent="logoout">
                    <img src="@/assets/images/logoout.png" alt="">
                </div>
            </div>
        </div>
        <div class="txt">
            <h4>账户信息</h4>
        </div>
        <el-form :model="pickPeo" :rules="pickPeoRules" ref="pickPeo" class="demo-ruleForm login-container">
            <div class="top">
                <h4>对接人基本信息</h4>
                <div class="listDiv">
                    <el-form-item label="姓名" prop="userName" style="position: relative">
                        <el-input type="text" name="userName" v-model.trim="pickPeo.userName" placeholder="姓名">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="职位" prop="position">
                        <el-input type="text" name="position" v-model.trim="pickPeo.position" auto-complete="off" placeholder="职位"></el-input>
                    </el-form-item>
                    <el-form-item label="电子邮箱" prop="email">
                        <el-input type="text" name="email" v-model.trim="pickPeo.email" auto-complete="off" placeholder="电子邮箱"></el-input>
                    </el-form-item>
                    <el-form-item label="国别" prop="country">
                        <el-select v-model="value" placeholder="请选择">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="电话" prop="tel">
                        <el-input type="text" name="tel" v-model.trim="pickPeo.tel" auto-complete="off" placeholder="电话"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="院校名称" prop="schoolName">
                        <el-input type="text" name="schoolName" v-model.trim="pickPeo.schoolName" auto-complete="off" placeholder="院校名称"></el-input>
                    </el-form-item> -->
                    <el-form-item label="院校名称" prop="schoolName">
                        <el-autocomplete
                            v-model="state4"
                            :fetch-suggestions="querySearchAsync"
                            placeholder="请输入内容"
                            @select="handleSelect"
                        ></el-autocomplete>
                    </el-form-item>
                </div>
            </div>
            <div class="mid">
                <h4>其他信息</h4>
                <div class="listDiv">
                    <el-form-item label="参考资料" prop="country">
                        <el-select v-model="zlvalue" placeholder="请选择">
                            <el-option
                                v-for="item in zloptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="是否讲座" prop="lecture"><br>
                        <el-checkbox v-model="checked"></el-checkbox>
                    </el-form-item>
                </div>
            </div>
            <div class="under">
                <div class="untop">
                    <h4>附件信息</h4><span class="fontR">(备注：LOGO、PPT、其他)</span>
                </div>
                <div class="upLoad">
                    上传附件
                </div>
            </div>
            <div class="pickbtnGroup">
                <div class="contue" @click="pickContueBtn">报名</div>
                <div class="cancel" @click="pickCancelBtn">取消</div>
            </div>
        </el-form>
    </div>
</template>

<script>
export default {
    name: "signUp",
    data() {
        return {
            pickPeo: {
                userName: "",
                position: "",
                email: "",
                country: "",
                tel: "",
                schoolName: "",

            },
            pickPeoRules: {
                userName: [
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                ],
                position: [
                    { required: true, message: '请输入职位', trigger: 'blur' },
                ],
                email: [
                    { required: true, message: '请输入电子邮箱', trigger: 'blur' },
                ],
                country: [
                    { required: true, message: '请选择国别', trigger: 'blur' },
                ],
                tel: [
                    { required: true, message: '请输入电话', trigger: 'blur' },
                ],
                schoolName: [
                    { required: true, message: '请输入院校名称', trigger: 'blur' },
                ],
                lecture: [
                    { required: true, message: '请选择', trigger: 'blur' },
                ]
            },
            options: [
                {
                    value: '选项1',
                    label: '黄金糕'
                },
                {
                    value: '选项2',
                    label: '双皮奶'
                },
                {
                    value: '选项3',
                    label: '蚵仔煎'
                },
                {
                    value: '选项4',
                    label: '龙须面'
                },
                {
                    value: '选项5',
                    label: '北京烤鸭'
                }
            ],
            value: '',
            zloptions: [
                {
                    value: '选项1',
                    label: '黄金糕'
                },
                {
                    value: '选项2',
                    label: '双皮奶'
                },
                {
                    value: '选项3',
                    label: '蚵仔煎'
                },
                {
                    value: '选项4',
                    label: '龙须面'
                },
                {
                    value: '选项5',
                    label: '北京烤鸭'
                }
            ],
            zlvalue: '',
            checked: false
        }
    },
    methods: {
        pickContueBtn() {
            
        },
        pickCancelBtn() {

        }
    }
}
</script>

<style lang="scss" scoped>
    .pickPeo{
        width: 100%;
        // margin: 0 6%;
        .topHeader{
            width: 100%;
            height: 50px;
            display: flex;
            .logoBox{
                width: 85%;
                // border-bottom: 1px solid #D8D8D8;
            }
            .right{
                flex: 1;
                height: 100%;
                display: flex;
                // border-top: 1px solid #D8D8D8;
                // .message{
                //     border-left: 1px solid #D8D8D8;
                // }
                // .personInfo{
                //     border-left: 1px solid #D8D8D8;
                //     border-bottom: 1px solid #D8D8D8;
                // }
                // .logoout{
                //     border-left: 1px solid #D8D8D8;
                //     border-bottom: 1px solid #D8D8D8;
                // }
            }
        }
        .txt{
            padding: 2% 6%;
        }
        .el-form{
            width: 88%;
            padding: 2% 6%;
            margin: 0 6%;
            box-shadow: 0px 0px 10px #cccccc;
            .top{
                border-bottom: 1px dashed #D8DDE6;
                padding: 2% 0;
                .listDiv{
                    display: flex;
                    flex-wrap: wrap;
                }
            }
            .mid{
                border-bottom: 1px dashed #D8DDE6;
                padding: 2% 0;
                .listDiv{
                    display: flex;
                    // .el-autocomplete{
                    //     display: block;
                    // }
                }
            }
            .under{
                padding: 2% 0;
                .untop{
                    display: flex;
                    line-height: 30px;
                    span{
                        font-size: 14px;
                        color: #CC0202;
                    }
                }
                .upLoad{
                    width: 86px;
                    height: 30px;
                    text-align: center;
                    line-height: 30px;
                    border: 1px solid #006960;
                    color: #006960;
                    border-radius: 4px;
                }
            }
            .pickbtnGroup{
                width: 50%;
                display: flex;
                margin-left: 22%;
                div{
                    width: 60px;
                    height: 30px;
                    text-align: center;
                    line-height: 30px;
                    margin-left: 30%;
                    border: 1px solid #006960;
                }
            }
            .el-form-item{
                width: 50%;
                padding: 0 2%;
                .el-select{
                    width: 100%;
                }
            }
        }
        .listDiv /deep/ .el-autocomplete{
            display: block;
        }
    }
</style>
