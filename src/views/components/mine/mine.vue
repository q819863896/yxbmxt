<template>
    <div class="mine">
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
        <div class="content">
            <persons @change="setSty" v-if="asd" />
            <el-tabs @change="setSty" v-if="asd" type="card">
                <el-tab-pane :label="lang=='zh' ? '教育展' : 'Education Fair'" >
                    <education />
                </el-tab-pane>
                <el-tab-pane :label="lang=='zh' ? '专项展' : 'Special Event'" >
                    <major />
                </el-tab-pane>
                <el-tab-pane :label="lang=='zh' ? '我的活动' : 'My Event'" >
                    <minehd />
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import Reactivities from "../reactivities/reactivities.vue";
import Persons from "./persons.vue";
import Minehd from "./minehd.vue";
import Major from "./major.vue";
import Education from "./education.vue";
// import ActivePre from "./activePre.vue";
import { updateCount, loginOut } from "../../../api/api.js";
export default {
    name: "mine",
    data() {
        return {
            asd: true,
            lang: "",
            count: ""
        }
    },
    components: { Reactivities, Persons, Minehd, Major, Education },
    methods: {
        toMine () {
            // this.$router.go(0);
            // this.$router.push("/mine");
            location.reload();
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
        setSty () {
            this.$emit("transferSty", this.asd);
        },
        hdyl () {

        }
    },
    created () {
        this.lang = sessionStorage.getItem("lange");
    },
    mounted () {
        updateCount().then((res) => {
            this.count = res.data;
        })
    }
}
</script>

<style lang="scss" scoped>
.mine{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .topHeader{
        width: 100%;
        height: 50px;
        line-height: 50px;
        display: flex;
        justify-content: space-between;
        position: fixed;
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
    .reactivities{
        width: 100%;
        height: 50px;
    }
    .content{
        width: 100%;
        flex: 1;
        padding: 0 2%;
        display: flex;
        flex-direction: column;
        .person{
            padding:  4% 0;
        }
        .el-tabs{
            width: 100%;
            flex: 1;
            display: flex;
            flex-direction: column;
        }
    }
    .content /deep/ .is-active{
        border: 1px solid #006960;
        border-radius: 8px 8px 0px 0px;
        border-bottom: 2px solid #ffffff;
    }
    .content /deep/ .is-top{
        border-radius: 8px 8px 0px 0px;
    }
    .content /deep/ .el-tabs__header{
        margin: 0 0 0%;
        border-bottom: 1px solid #006960;
    }
    .content /deep/ .el-tabs__content{
        width: 100%;
        flex: 1;
        border: 1px solid #006960;
        border-top: none;
        overflow: hidden;
        overflow-y: auto;
    }
    // .active{
    //     border: 1px solid #006960;
    //     border-radius: 8px 8px 0px 0px;
    // }
}
</style>
