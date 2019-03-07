<template>
    <div class="pickPeo">
        <!-- <div class="topHeader" ref="tophead">
            <div class="logoBox" ref="logoBox">
                <img class="logo" src="@/assets/images/logo.png" alt="">
            </div>
            <div class="right">
                <router-link to="/message" class="message" ref="message" @click.native.prevent="message">
                    <img src="@/assets/images/message.png" alt="">
                    <p></p>
                </router-link>
                <router-link to="/personInfo" class="personInfo" ref="personInfo" @click.native.prevent="personInfo">
                    <img class="personPic" src="@/assets/images/personInfo.png" alt="">
                </router-link>
                <div to="/logoout" class="logoout" ref="logoout" @click.native.prevent="logoout">
                    <img src="@/assets/images/logoout.png" alt="">
                </div>
            </div>
        </div> -->
        <div class="txt">
            <!-- <h4>账户信息</h4> -->
            <h4>{{lang === "zh" ? "账户信息" : "Account Information"}}</h4>
        </div>
        <el-form :model="pickPeo" ref="pickPeo" :rules="lang === 'zh' ? zhpickPeoRules : enpickPeoRules" class="demo-ruleForm login-container">
            <div class="top">
                <!-- 对接人基本信息 -->
                <h4>{{lang === "zh" ? "对接人基本信息" : "Contact Person Information"}}</h4>
                <div class="listDiv">
                    <el-form-item :label="lang === 'zh' ? '对接人基本信息' : 'Contact Person Information'" prop="userName" style="position: relative">
                        <!-- <i class="iconfont icon-zhongdian"></i> -->
                        <el-input type="text" v-model.trim="pickPeo.userName" :placeholder="lang === 'zh' ? '姓名' : 'Name'">
                        </el-input>
                    </el-form-item>
                    <el-form-item :label="lang === 'zh' ? '职位' : 'Job Title'" prop="position">
                        <!-- <i class="iconfont icon-zhongdian"></i> -->
                        <el-input type="text" v-model.trim="pickPeo.position" auto-complete="off" :placeholder="lang === 'zh' ? '职位' : 'Job Title'"></el-input>
                    </el-form-item>
                    <!-- 电子邮箱 -->
                    <el-form-item :label="lang === 'zh' ? '电子邮箱' : 'Email'" prop="email">
                        <!-- <i class="iconfont icon-zhongdian"></i> -->
                        <el-input type="text" v-model.trim="pickPeo.email" auto-complete="off" :placeholder="lang === 'zh' ? '电子邮箱' : 'Email'"></el-input>
                    </el-form-item>
                    <!--  国别-->
                    <el-form-item :label="lang === 'zh' ? '国别' : 'Country'" prop="country">
                        <!-- <i class="iconfont icon-zhongdian"></i> -->
                        <el-select v-model="value" :placeholder="lang === 'zh' ? '国别' : 'Country'">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <!-- 电话 -->
                    <el-form-item :label="lang === 'zh' ? '电话' : 'Contact Number'" prop="tel">
                        <!-- <i class="iconfont icon-zhongdian"></i> -->
                        <el-input type="text" v-model.trim="pickPeo.tel" auto-complete="off" :placeholder="lang === 'zh' ? '电话' : 'Contact Number'"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="院校名称" prop="schoolName">
                        <el-input type="text" name="schoolName" v-model.trim="pickPeo.schoolName" auto-complete="off" placeholder="院校名称"></el-input>
                    </el-form-item> -->
                    <!-- 院校名称 -->
                    <el-form-item :label="lang === 'zh' ? '院校名称' : 'Institution Name'" prop="schoolName">
                        <!-- <i class="iconfont icon-zhongdian"></i> -->
                        <el-autocomplete
                            v-model="state4"
                            :fetch-suggestions="querySearchAsync"
                            :placeholder="lang === 'zh' ? '院校名称' : 'Institution Name'"
                            @select="handleSelect"
                        ></el-autocomplete>
                    </el-form-item>
                </div>
            </div>
            <div class="mid">
                <h4>{{lang === 'zh' ? '其他信息' : 'Other Information'}}</h4>
                <div class="listDiv">
                    <el-form-item :label="lang === 'zh' ? '参考资料' : 'Reference material'" prop="country">
                        <!-- <i class="iconfont icon-zhongdian"></i> -->
                        <el-select v-model="zlvalue" :placeholder="lang === 'zh' ? '请选择' : 'Please choose'">
                            <el-option
                                v-for="item in zloptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="lang === 'zh' ? '是否讲座' : 'Presentation Required'" prop="lecture"><br>
                        <!-- <i class="iconfont icon-zhongdian"></i> -->
                        <el-checkbox v-model="checked"></el-checkbox>
                    </el-form-item>
                </div>
            </div>
            <div class="under">
                <div class="untop">
                    <h4>{{lang === 'zh' ? '附件信息' : 'Attachment'}}</h4><span class="fontR">({{lang === 'zh' ? '备注：LOGO、PPT、其他' : 'e.g. LOGO、PPT、Others'}})</span>
                </div>
                <div class="upLoad">
                    <el-upload
                        class="upload-demo"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :before-remove="beforeRemove"
                        multiple
                        :limit="3"
                        :on-change="upChange"
                        :file-list="fileList">
                        <el-button size="small" type="primary">{{lang === 'zh' ? '点击上传' : 'Upload Attachment'}}</el-button>
                    </el-upload>
                </div>
            </div>
            <div class="pickbtnGroup">
                <div class="contue" @click="pickContueBtn">{{lang === 'zh' ? '报名' : 'Registration'}}</div>
                <div class="cancel" @click="pickCancelBtn">{{lang === 'zh' ? '取消' : 'Cancel'}}</div>
            </div>
        </el-form>
    </div>
</template>

<script>
export default {
    name: "signUp",
    data() {
        return {
            lang: "",
            pickPeo: {
                userName: "",
                position: "",
                email: "",
                country: "",
                tel: "",
                schoolName: "",
            },
            zhpickPeoRules: {
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
            enpickPeoRules: {
                userName: [
                    { required: true, message: 'Please enter your name', trigger: 'blur' },
                ],
                position: [
                    { required: true, message: 'Please enter the position', trigger: 'blur' },
                ],
                email: [
                    { required: true, message: 'Please enter your e-mail', trigger: 'blur' },
                ],
                country: [
                    { required: true, message: 'Please choose your country.', trigger: 'blur' },
                ],
                tel: [
                    { required: true, message: 'Please enter the telephone number.', trigger: 'blur' },
                ],
                schoolName: [
                    { required: true, message: 'Please enter the name of the institution.', trigger: 'blur' },
                ],
                lecture: [
                    { required: true, message: 'Please choose', trigger: 'blur' },
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
            checked: false,
            state4: "",
            fileList: []
        }
    },
    created () {
        this.lang = sessionStorage.getItem("lange");
    },
    mounted() {
      this.restaurants = this.loadAll();
    },
    methods: {
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
        querySearchAsync(queryString, cb) {
            var restaurants = this.restaurants;
            var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
            cb(results);
            }, 3000 * Math.random());
        },
        createStateFilter(queryString) {
            return (state) => {
            return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
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
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
        },
        upChange (file, fileList) {
            console.log(file, fileList);
        },
        getAccept(accept) {
            switch (accept) {
                case 'text':
                    return {
                        title: 'Texts',
                        exteensions: 'doc,docx,xls,xlsx,ppt,pptx,pdf,txt',
                        mimeTypes: '.doc,docx,.xls,.xlsx,.ppt,.pptx,.pdf,.txt'
                    };
                    break;
                case 'video':
                    return {
                        title: 'Videos',
                        exteensions: 'mp4',
                        mimeTypes: '.mp4'
                    };
                    break;
                case 'image':
                    return {
                        title: 'Images',
                        exteensions: 'gif,jpg,jpeg,bmp,png',
                        mimeTypes: '.gif,.jpg,.jpeg,.bmp,.png'
                    };
                    break;
                default: return accept
            }
        },
        pickContueBtn() {
            this.$router.push("/signsuccess");
        },
        pickCancelBtn() {
            this.$router.go(-1);
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
                width: 50%;
                display: flex;
                margin-left: 22%;
                height: 30px;
                line-height: 30px;
                div{
                    padding: 0.5% 1% 5% 1%;
                    text-align: center;
                    margin-left: 30%;
                    border: 1px solid #006960;
                    border-radius: 4px;
                    cursor: pointer;
                }
                .contue{
                    background: #006960;
                    color: #ffffff;
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
        .el-form /deep/ .el-form-item__label{
            // margin-left: 4%;
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
