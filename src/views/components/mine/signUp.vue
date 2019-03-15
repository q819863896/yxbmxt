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
                        :action="portraitUrl"
                        accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF,.docx,.pptx,.xlsx,.txt"
                        :file-list="fileList"
                        with-credentials
                        :before-upload="beforeUpload"
                        :on-remove="afterRemove"
                        >
                        <!-- :before-upload="beforeUpload" -->
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
import { updateCount, loginOut, setadddata, upload, update, allCountry, allSchool, selectUser, upload1 } from "../../../api/api.js";
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
        this.lang = sessionStorage.getItem("lange");

        this.portraitUrl = axios.defaults.baseURL + '/enrolment/upload1.do';
        this.activeId = sessionStorage.getItem("activeDeId");
    },
    mounted() {
        this.restaurants = this.loadAll();
        updateCount().then((res) => {
            this.count = res.data;
        })
        
        this.setData();
    },
    methods: {
        toMine () {
            this.$router.push("/mine");
        },
        loadAll() {
            return [
            { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
            { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
            { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
            { "value": "泷千家(天山西路店)", "address": "天山西路438号" },
            { "value": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" },
            { "value": "贡茶", "address": "上海市长宁区金钟路633号" },
            { "value": "豪大大香鸡排超级奶爸", "address": "上海市嘉定区曹安公路曹安路1685号" },
            { "value": "茶芝兰（奶茶，手抓饼）", "address": "上海市普陀区同普路1435号" },
            { "value": "十二泷町", "address": "上海市北翟路1444弄81号B幢-107" },
            { "value": "星移浓缩咖啡", "address": "上海市嘉定区新郁路817号" },
            { "value": "阿姨奶茶/豪大大", "address": "嘉定区曹安路1611号" },
            { "value": "新麦甜四季甜品炸鸡", "address": "嘉定区曹安公路2383弄55号" },
            { "value": "Monica摩托主题咖啡店", "address": "嘉定区江桥镇曹安公路2409号1F，2383弄62号1F" },
            { "value": "浮生若茶（凌空soho店）", "address": "上海长宁区金钟路968号9号楼地下一层" },
            { "value": "NONO JUICE  鲜榨果汁", "address": "上海市长宁区天山西路119号" },
            { "value": "CoCo都可(北新泾店）", "address": "上海市长宁区仙霞西路" },
            { "value": "快乐柠檬（神州智慧店）", "address": "上海市长宁区天山西路567号1层R117号店铺" },
            { "value": "Merci Paul cafe", "address": "上海市普陀区光复西路丹巴路28弄6号楼819" },
            { "value": "猫山王（西郊百联店）", "address": "上海市长宁区仙霞西路88号第一层G05-F01-1-306" },
            { "value": "枪会山", "address": "上海市普陀区棕榈路" },
            { "value": "纵食", "address": "元丰天山花园(东门) 双流路267号" },
            { "value": "钱记", "address": "上海市长宁区天山西路" },
            { "value": "壹杯加", "address": "上海市长宁区通协路" },
            { "value": "唦哇嘀咖", "address": "上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元" },
            { "value": "爱茜茜里(西郊百联)", "address": "长宁区仙霞西路88号1305室" },
            { "value": "爱茜茜里(近铁广场)", "address": "上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺" },
            { "value": "鲜果榨汁（金沙江路和美广店）", "address": "普陀区金沙江路2239号金沙和美广场B1-10-6" },
            { "value": "开心丽果（缤谷店）", "address": "上海市长宁区威宁路天山路341号" },
            { "value": "超级鸡车（丰庄路店）", "address": "上海市嘉定区丰庄路240号" },
            { "value": "妙生活果园（北新泾店）", "address": "长宁区新渔路144号" },
            { "value": "香宜度麻辣香锅", "address": "长宁区淞虹路148号" },
            { "value": "凡仔汉堡（老真北路店）", "address": "上海市普陀区老真北路160号" },
            { "value": "港式小铺", "address": "上海市长宁区金钟路968号15楼15-105室" },
            { "value": "蜀香源麻辣香锅（剑河路店）", "address": "剑河路443-1" },
            { "value": "北京饺子馆", "address": "长宁区北新泾街道天山西路490-1号" },
            { "value": "饭典*新简餐（凌空SOHO店）", "address": "上海市长宁区金钟路968号9号楼地下一层9-83室" },
            { "value": "焦耳·川式快餐（金钟路店）", "address": "上海市金钟路633号地下一层甲部" },
            { "value": "动力鸡车", "address": "长宁区仙霞西路299弄3号101B" },
            { "value": "浏阳蒸菜", "address": "天山西路430号" },
            { "value": "四海游龙（天山西路店）", "address": "上海市长宁区天山西路" },
            { "value": "樱花食堂（凌空店）", "address": "上海市长宁区金钟路968号15楼15-105室" },
            { "value": "壹分米客家传统调制米粉(天山店)", "address": "天山西路428号" },
            { "value": "福荣祥烧腊（平溪路店）", "address": "上海市长宁区协和路福泉路255弄57-73号" },
            { "value": "速记黄焖鸡米饭", "address": "上海市长宁区北新泾街道金钟路180号1层01号摊位" },
            { "value": "红辣椒麻辣烫", "address": "上海市长宁区天山西路492号" },
            { "value": "(小杨生煎)西郊百联餐厅", "address": "长宁区仙霞西路88号百联2楼" },
            { "value": "阳阳麻辣烫", "address": "天山西路389号" },
            { "value": "南拳妈妈龙虾盖浇饭", "address": "普陀区金沙江路1699号鑫乐惠美食广场A13" }
            ];
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
            console.log(file);
            // if (window.createObjectURL != undefined) {
            //     this.fileSrc = window.createObjectURL(file);
            // } else if (window.URL != undefined) {
            //     this.fileSrc = Window.URL.createObjectURL(file);
            // } else if (window.webkitURL != undefined) {
            //     this.fileSrc = window.webkitURL.createObjectURL(file);
            // }
            // console.log(this.fileSrc);
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
            update(params).then((res) => {
                if (res.statu == 1) {
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
                            this.$router.push('/login');
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
                            this.$router.push('/login');
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
                    min-width: 300px;
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
