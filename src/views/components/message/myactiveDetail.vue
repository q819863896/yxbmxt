<template>
    <div class="activedetail">
        <!-- <topheader /> -->
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
        <div class="wrap">
            <p class="back" @click="backBtn">
                <i class="iconfont icon-fanhui"></i>
                {{lang === 'zh' ? '返回活动列表' : 'Returns the list of activities'}}
            </p>
            <div class="top">
                <div class="left">
                    <!-- 审批通过 -->
                    <p class="txt" v-if="statu == '审批通过'">{{lang === 'zh' ? '您报名参加的活动审核已通过' : 'Your event registration is approved'}}</p>
                    <!-- 审批拒绝 -->
                    <p class="txt" v-if="statu == '审批拒绝'">{{lang === 'zh' ? '您报名参加的活动审批拒绝' : 'Rejection of Approval for the Activities You Enrolled in'}}</p>
                    <!-- 审批中 -->
                    <p class="txt" v-if="statu == '审批中'">{{lang === 'zh' ? '您报名参加的活动审批中' : 'During the examination and approval of the activities you signed up for'}}</p>
                    <p class="fontC">2018/08/01</p>
                </div>
                <div class="right" @click="qxbmBtn">
                    <p v-if="statu == '审批通过'">{{lang === 'zh' ? '取消报名' : 'Cancel Registration'}}</p>
                </div>
            </div>
            <div class="details">
                <div class="itemDetail">
                    <p>
                        <span>{{lang === 'zh' ? '活动名称' : 'Event Name'}}</span>：<span>{{this.items.campaign.name}}</span>
                    </p>
                    <p>
                        <span>{{lang === 'zh' ? '所在地点' : 'Location'}}</span>：<span>{{this.items.campaign.city}}</span>
                    </p>
                    <p>
                        <span>{{lang === 'zh' ? '活动地点' : 'Venue Address'}}</span>：<span>{{this.items.campaign.area}}</span>
                    </p>
                    <p>
                        <span>{{lang === 'zh' ? '详细地址' : 'Address Details'}}</span>：<span>{{this.items.campaign.building}}</span>
                    </p>
                    <p>
                        <span>{{lang === 'zh' ? '活动时间' : 'Event Time'}}</span>：<span>{{this.items.campaign.startDate}}-{{this.items.campaign.endDate}}</span>
                    </p>
                </div>
                <!-- 活动介绍 -->
                <div class="activejs">
                    <div class="tit">{{lang === 'zh' ? '活动介绍' : 'Activity introduction'}}</div>
                    <p>{{this.items.campaign.remark}}</p>
                </div>
                <!-- 活动对接人 -->
                <div class="activedjr">
                    <div class="tit">{{lang === 'zh' ? '活动对接人' : 'Activity docker'}}</div>
                    <div class="djrDiv">
                        <p>
                            <!-- 姓名 -->
                            <span>{{lang === 'zh' ? '姓名' : 'Full name'}}</span><em>不是</em>：<span>{{this.items.campaign.activityLeader}}</span>
                        </p>
                        <p>
                            <!-- 联系电话 -->
                            <span>{{lang === 'zh' ? '联系电话' : 'Contact number'}}</span>：<span>{{this.items.campaign.activityLeaderPhone}}</span>
                        </p>
                        <div class="pic" v-if="this.items.enrolmentAttachment[0].attachmentUrl != []">
                            <img :src="this.items.enrolmentAttachment[0].attachmentUrl" alt="">
                        </div>
                    </div>
                </div>
                <!-- 会场图片 -->
                <div class="picwrap">
                    <div class="tit">{{lang === 'zh' ? '会场图片' : 'Venue photos'}}</div>
                    <div class="picDiv">
                        <div class="picT" v-if="this.items.enrolmentAttachment[1].attachmentUrl != ''">
                            <img :src="this.items.enrolmentAttachment[1].attachmentUrl" alt="">
                        </div>
                        <div class="picT" v-if="this.items.enrolmentAttachment[2].attachmentUrl != ''">
                            <img :src="this.items.enrolmentAttachment[2].attachmentUrl" alt="">
                        </div>
                        <div class="picT" v-if="this.items.enrolmentAttachment[3].attachmentUrl != ''">
                            <img :src="this.items.enrolmentAttachment[3].attachmentUrl" alt="">
                        </div>
                    </div>
                </div>
            </div>
            <div class="bmBtn right">
                <p @click="bmBtn" v-if="flagSign == '审批通过'">{{lang === 'zh' ? '立即报名' : 'Sign Up Now'}}</p>
            </div>
        </div>
        <el-dialog
            :title="lang === 'zh' ? '提示' : 'Tips'"
            :visible.sync="centerDialogVisible"
            width="50%"
            center>
            <el-input
                type="textarea"
                :rows="4"
                :placeholder="lang === 'zh' ? '请输入原因' : 'Please enter the reason'"
                v-model="textarea">
            </el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false">{{lang === 'zh' ? '取 消' : 'Cancel'}}</el-button>
                <el-button type="primary" @click="cancenlBtn">{{lang === 'zh' ? '确 定' : 'Sure'}}</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import topheader from "../reactivities/reactivities.vue";
import { wdbmxxjl, bmxxjl, updateCount, loginOut, cancelSign } from "../../../api/api.js";
export default {
    name: "activedetail",
    components: { topheader },
    data() {
        return {
            lang: "",
            statu: "",
            items: {},
            count: "",
            reid: "",
            centerDialogVisible: false,
            textarea: "",
            flagSign: "",
            showImg: false
        }
    },
    methods: {
        toMine() {
            this.$router.push("/mine");
        },
        // 退出
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
        qxbmBtn () {
            this.centerDialogVisible = true;
            // let params = {
            //     reasonwhy: this.textarea
            // };
            // cancenlBtn()
        },
        cancenlBtn () {
            if (this.textarea != "") {
                let params = {
                    reasonwhy: this.textarea,
                    eid: this.reid
                };
                cancelSign(params).then((res) => {
                    if (res.statu == 1) {
                        if (this.lang == "zh") {
                            this.$message.success('取消成功！');
                            this.centerDialogVisible = false;
                        } else {
                            this.$message.success('Cancel successfully!');
                            this.centerDialogVisible = false;
                        }
                    }
                })
            } else {
                if (this.lang == "zh") {
                    this.$message.error('请输入原因');
                } else {
                    this.$message.error('Please enter the reason');
                }
            }
        },
        backBtn() {
            this.$router.go(-1);
        },
        bmBtn () {
            this.$router.push("/signup");
        }
    },
    created() {
        this.lang = sessionStorage.getItem("lange");
        
    },
    mounted () {
        updateCount().then((res) => {
            this.count = res.data;
        })

        let params = this.$route.query;
        console.log(params);
        wdbmxxjl(params).then((res) => {
            this.statu = res.data.spzt;
            this.reid = res.data.eid;
            this.items = res.data;
            if (res.data.enrolmentAttachment === []) {
                this.showImg = false;
            } else {
                this.showImg = true;
            }
        })
    }
}
</script>

<style lang="scss" scoped>
.activedetail{
    width: 100%;
    height: 100%;
    .topHeader{
        width: 100%;
        height: 50px;
        line-height: 50px;
        display: flex;
        justify-content: space-between;
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
    .wrap{
        padding: 2%;
        .back{
            width: 45%;
            cursor: pointer;
            padding: 1% 0 3% 0;
        }
        .top{
            width: 100%;
            display: flex;
            justify-content: space-between;
            padding-bottom: 2%;
            border-bottom: 1px solid #D8DDE6;
            .left{
                width: 75%;
                .txt{
                    font-weight: 500;
                }
                .fontC{
                    font-size: 14px;
                    color: #586D90;
                }
            }
            
            .right{
                flex: 1;
                height: 30px;
                line-height: 30px;
                cursor: pointer;
                p{
                    text-align: center;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border: 1px solid #006960;
                    border-radius: 4px;
                    background: #006960;
                    color: #ffffff;
                }
            }
        }
        .itemDetail{
            padding: 1% 0;
            p{
                line-height: 30px;
            }
        }
        .activejs{
            p{
                padding: 1.5% 0;
            }
        }
        .activedjr{
            .djrDiv{
                padding: 1.5% 0;
                em{
                    visibility: hidden;
                }
                .pic{
                    margin-top: 1%;
                    img{
                        width: 128px;
                    }
                }
            }
        }
        .picwrap{
            .picDiv{
                padding: 1.5% 0;
                display: flex;
                .picT{
                    flex: 1;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    img{
                        width: 128px;
                    }
                }
            }
        }
        .bmBtn{
            width: 100%;
            height: 30px;
            line-height: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 2%;
            p{
                width: 90px;
                height: 100%;
                text-align: center;
                background: #006960;
                border-radius: 4px;
                color: #ffffff;
                cursor: pointer;
            }
        }
        .tit{
            width: 100%;
            background: #F3F6F9;
            padding: 1.5% 0;
        }
    }
}
</style>
