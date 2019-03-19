<template>
    <div class="pickPeo">
        <div class="topHeader">
            <div class="logoBox" ref="logoBox">
                <img class="logo" src="@/assets/images/logo.png" alt="" @click="toMine">
                <p>{{lang === 'zh' ? '展会院校报名系统' : 'Fair & Event Registration System'}}</p>
            </div>
            <div class="right">
                <router-link to="/message" class="message" ref="message">
                    <img src="@/assets/images/message.png" alt="">
                    <p v-if="this.count != 0"></p>
                </router-link>
                <router-link to="/personInfo" class="personInfo" ref="personInfo">
                    <img class="personPic" src="@/assets/images/personInfo.png" alt="">
                </router-link>
                <div to="/logoout" class="logoout" ref="logoout" @click="logoout">
                    <img src="@/assets/images/logoout.png" alt="">
                </div>
            </div>
        </div>
        <div class="txt">
            <!-- <h4>账户信息</h4> -->
            <h4>{{lang === "zh" ? "账户信息" : "Account Information"}}</h4>
        </div>
        <el-form :model="pickPeo" ref="pickPeo" class="demo-ruleForm login-container">
            <div class="top">
                <!-- 对接人基本信息 -->
                <h4>{{lang === "zh" ? "对接人基本信息" : "Contact Person Information"}}</h4>
                <div class="listDiv">
                    <el-form-item :label="lang === 'zh' ? '姓名' : 'Name'" prop="userName" style="position: relative">
                        <el-input type="text" v-model.trim="pickPeo.contact" :placeholder="lang === 'zh' ? '姓名' : 'Name'" :disabled="true">
                        </el-input>
                    </el-form-item>
                    <el-form-item :label="lang === 'zh' ? '职位' : 'Job Title'" prop="position">
                        <el-input type="text" v-model.trim="pickPeo.contactPost" auto-complete="off" :placeholder="lang === 'zh' ? '职位' : 'Job Title'" :disabled="true"></el-input>
                    </el-form-item>
                    <!-- 电子邮箱 -->
                    <el-form-item :label="lang === 'zh' ? '电子邮箱' : 'Email'" prop="email">
                        <el-input type="text" v-model.trim="pickPeo.email" auto-complete="off" :placeholder="lang === 'zh' ? '电子邮箱' : 'Email'" :disabled="true"></el-input>
                    </el-form-item>
                    <!--  国别-->
                    <el-form-item :label="lang === 'zh' ? '国别' : 'Country'" prop="country">
                        <el-input type="text" v-model="countryValue" auto-complete="off" :placeholder="lang === 'zh' ? '国别' : 'Country'" :disabled="true"></el-input>
                    </el-form-item>
                    <!-- 电话 -->
                    <el-form-item :label="lang === 'zh' ? '电话' : 'Contact Number'" prop="tel">
                        <el-input type="text" v-model.trim="pickPeo.contactNumber" auto-complete="off" :placeholder="lang === 'zh' ? '电话' : 'Contact Number'" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item :label="lang === 'zh' ? '院校名称' : 'Institution Name'" prop="schoolName">
                        <el-input type="text" v-model.trim="pickPeo.name" auto-complete="off" :placeholder="lang === 'zh' ? '院校名称' : 'Institution Name'" :disabled="true"></el-input>
                    </el-form-item>
                </div>
            </div>
            <div class="mid">
                <h4>{{lang === 'zh' ? '其他信息' : 'Other Information'}}</h4>
                <div class="listDiv">
                    <el-form-item :label="lang === 'zh' ? '参展资料' : 'Exhibition Materials'" prop="materials">
                        <el-input v-model="materialsInp" placeholder="请输入内容"></el-input>
                    </el-form-item>
                    <el-form-item :label="lang === 'zh' ? '是否讲座' : 'Presentation Required'" prop="lecture"><br>
                        <el-checkbox v-model="asd"></el-checkbox>
                    </el-form-item>
                </div>
            </div>
            <div class="under">
                <div class="untop">
                    <h4>{{lang === 'zh' ? '附件信息' : 'Attachment'}}</h4><span class="fontR">({{lang === 'zh' ? '备注：LOGO、PPT、其他' : 'e.g. LOGO、PPT、Others'}})</span>
                </div>
                <div class="upLoad">
                    <el-upload class="upload-demo"
                        ref="editTeaPic"
                        action=""
                        accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF,.docx,.pptx,.xlsx,.txt"
                        :file-list="fileList"
                        with-credentials
                        :before-upload="beforeUpload"
                        :on-remove="afterRemove"
                        >
                        <el-button size="small" type="primary">{{lang === 'zh' ? '点击上传' : 'Upload Attachment'}}</el-button>
                    </el-upload>
                </div>
            </div>
            <div class="pickbtnGroup">
                <div>
                    <el-button class="contue" @click="pickContueBtn" >{{lang === 'zh' ? '报名' : 'Registration'}}</el-button>
                    <el-button class="cancel" @click="pickCancelBtn">{{lang === 'zh' ? '取消' : 'Cancel'}}</el-button>
                </div>
            </div>
        </el-form>
    </div>
</template>

<script>
import { updateCount, loginOut, setadddata, upload, update, allCountry, allSchool, selectUser, upload1, singlefile } from "../../../api/api.js";
import axios from "axios";
export default {
    name: "signUp",
    data() {
        return {
            lang: "",
            count: "",
            pickPeo: {
                contact: "",
                contactPost: "",
                email: "",
                contactNumber: "",
                name: "",       // 学校名
            },
            materialsInp: "",
            countryOptions: [],
            countCode: "",
            countryValue: "",
            schoolOptions: [],
            schoolValue: "",
            value: "",
            asd: "",
            state4: "",
            fileList: [],
            activeId: "",
            upFile: "",
            files: [],
            portraitUrl: "",
            bmDis: true,
            counCode: "",
            schoolCode: "",
            fileSrc: "",
            fileName: "",
            fileType: ""
        }
    },
    created() {
        // this.lang = sessionStorage.getItem("lange");
        this.lang = localStorage.getItem("lange");

        // this.portraitUrl = axios.defaults.baseURL + '/enrolment/upload1.do';
        this.activeId = sessionStorage.getItem("activeDeId");
    },
    mounted() {
        updateCount().then((res) => {
            this.count = res.data;
        })
        
        this.setData();
        console.log(sessionStorage.getItem("ccid"));
    },
    methods: {
        toMine () {
            this.$router.push("/mine");
        },
        setData () {
            let params = {
                id: this.activeId
            };
            setadddata(params).then((res) => {
                this.pickPeo = res.data.neppm[0];
                this.countryValue = res.data.countryName;
                this.counCode = res.data.countryCode;
                this.schoolCode = res.data.neppm[0].code;
            })
        },
        handleSelect(item) {
            if (item) {
                this.pickPeoRules.schoolName[0].message = ""
            }
        },
        handlePreview (file) {
            console.log(file);
            console.log("handlePreview");
        },
        handleRemove (file, fileList) {
            console.log(file, fileList);
            console.log("handleRemove");
        },
        beforeUpload (file) {
            // console.log(file);
            var formData = new FormData();
            formData.append("file", file);
            formData.append("campaignId", sessionStorage.getItem("activeDeId"));
            console.log(formData.get("file"));
            // axios.post("/");

            // let params = {
            //     file: file,
            //     campaignId: sessionStorage.getItem("activeDeId")
            // };
            // let params = [];
            // params.push(file);
            // params.push(sessionStorage.getItem("activeDeId"));
            // console.log(params);
            upload1(formData).then((res) => {

            })
        },
        uploadBtn () {
            // let formData = new FormData();
            // formData.append("fileJson", this.$refs.f1.files[0]);
            // formData.append("campaignId", sessionStorage.getItem("activeDeId"));
            // console.log(formData.get("fileJson"));
            // console.log(formData.get("campaignId"));
            let params = {
                file: this.$refs.f1.files[0],
                campaignId: sessionStorage.getItem("activeDeId")
            };
            console.log(params);
            // upload1(formData).then((res) => {

            // })
            upload1(params, {
                headers: {'Content-Type': 'multipart/form-data'}
            }).then((res) => {

            })
            // const instance = axios.create({
            //     withCredentials: true
            // })
            // instance.post(upload1, params).then((res) => {
            //     console.log(res);
            // })
        },
        afterRemove () {},
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        upFail(response, file, fileList) {
            console.log(response, file, fileList);
            // if ()
            this.$message.error('上传失败!');
        },
        upChange (file, fileList) {
            // this.files.push(file.raw);
            this.files = file.name;
            console.log(file);
            // let blob = new Blob();
            console.log(window.URL.createObjectURL(file));
        },
        upSuccess () {},
        // 报名按钮
        pickContueBtn() {
            // this.$router.push("/signsuccess");
            let params = {
                materials: this.materialsInp,
                isLecture: this.asd == true ? '1' : '0',
                campaignId: this.activeId,
                schoolCode: this.schoolCode,
                countryCode: this.counCode
            };
            if (this.lang == "zh") {
                this.$message({
                    message: '正在报名',
                    type: 'success'
                });
            } else {
                this.$message({
                    message: 'Sign up',
                    type: 'success'
                });
            }
            update(params).then((res) => {
                if (res.statu == 1) {
                    if (this.lang == "zh") {
                        this.$message({
                            message: '报名成功',
                            type: 'success'
                        });
                    } else {
                        this.$message({
                            message: 'Successful Registration',
                            type: 'success'
                        });
                    }
                    
                    this.$router.push("/signsuccess");
                }
            })
        },
        // 取消报名
        pickCancelBtn() {
            this.$router.go(-1);
        },
        logoout () {
            if (this.lang == 'zh') {
                this.$confirm('确认退出吗?', '提示', {
                    confirmButtonText: '退出',
                    cancelButtonText: '取消',
                }).then(() => {
                    loginOut().then((res => {
                        if (res.statu == 1) {
                            sessionStorage.removeItem('changeUser');
                            sessionStorage.removeItem("lange");
                            this.$router.push('/testlogin');
                        }
                    }))
                }).catch((err) => {
                    console.error('loginErr', err);
                });
            } else {
                this.$confirm('Confirmation of withdrawal?', 'Tips', {
                    confirmButtonText: 'Sign out',
                    cancelButtonText: 'Cancel',
                }).then(() => {
                    loginOut().then((res => {
                        if (res.statu == 1) {
                            sessionStorage.removeItem('changeUser');
                            sessionStorage.removeItem("lange");
                            this.$router.push('/testlogin');
                        }
                    }))
                }).catch((err) => {
                    console.error('loginErr', err);
                });
            }
        },
    },
}
</script>

<style lang="scss" scoped>
    .pickPeo{
        width: 100%;
        // margin: 0 6%;
        .topHeader{
            width: 100%;
            height: 50px;
            line-height: 50px;
            display: flex;
            justify-content: space-between;
            position: absolute;
            top: 0;
            left: 0;
            .logoBox{
                width: 85%;
                height: 100%;
                display: flex;
                .logo{
                    cursor: pointer;
                }
                p{
                    margin-top: 3px;
                }
            }
            .right{
                flex: 1;
                height: 100%;
                display: flex;
                .message, .personInfo, .logoout{
                    width: 3rem;
                    height: 3rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                    img{
                        width: 2.8rem;
                    }
                    .personPic{
                        width: 2rem;
                    }
                }
                .message{
                    position: relative;
                    border-bottom: none;
                    p{
                        position: absolute;
                        top: 16%;
                        right: 16%;
                        width: 6px;
                        height: 6px;
                        background: #CC0202;
                        border-radius: 50%;
                    }
                }
            }
        }
        .txt{
            padding: 2% 6%;
            margin-top: 50px;
        }
        .el-form{
            width: 88%;
            padding: 2% 6% 10% 6%;
            margin: 0 6% 3% 6%;
            box-shadow: 0px 0px 10px #cccccc;
            .iconfont{
                color: #CC0202;
                float: left;
            }
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
                    // border: 1px solid #006960;
                    color: #006960;
                    border-radius: 4px;
                    cursor: pointer;
                    margin: 2% 0;
                    .ja-btn{
                        margin-left: 3px;
                        width: 80px;
                        height: 35px;
                        border: 1px solid #006960;
                        color: #006960;
                        border-radius: 5px;
                        font-size: 12px;
                        display: none;
                    }
                    button{
                        border: 1px solid #006960;
                        color: #006960;
                        background: #ffffff;
                    }
                }
            }
            .pickbtnGroup{
                width: 100%;
                display: flex;
                // margin-left: 22%;
                justify-content: center;
                align-items: center;
                height: 45px;
                line-height: 41px;
                div{
                    padding: 0.5% 4% 5% 4%;
                    min-width: 310px;
                    text-align: center;
                    border-radius: 4px;
                    cursor: pointer;
                    text-align: center;
                    .contue{
                        background: #006960;
                        color: #ffffff;
                    }
                    .cancel{
                        margin-left: 20%;
                    }
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
        .el-form /deep/ .el-form-item{
            position: relative;
        }
        .el-form-item i{
            position: absolute;
            top: 0;
            left: 0;
        }
        .listDiv /deep/ .el-autocomplete{
            display: block;
        }
    }
</style>
