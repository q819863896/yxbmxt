<template>
    <div class="singsuccess">
        <div class="topHeader" ref="tophead">
            <div class="logoBox" ref="logoBox">
                <img class="logo" src="@/assets/images/logo.png" alt="" @click="toMine">
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
            <p class="back" @click="back">
                <i class="iconfont icon-fanhui"></i>
                {{lang === 'zh' ? '返回我的活动' : 'Return to my activities'}}
            </p>
            <p class="pic">
                <img src="@/assets/images/success.png" alt="">
            </p>
            <!-- 您已成功提交此次的报名信息，我们将在7个工作日内完成处理，请耐心等待。 -->
            <p class="txt">{{lang === 'zh' ? '您已成功提交此次的报名信息，我们将在7个工作日内完成处理，请耐心等待。' : 'You have successfully submitted the registration information. We will complete the processing within 7 working days. Please wait patiently.'}}</p>
        </div>
    </div>
</template>

<script>
import { updateCount, loginOut } from "../../../api/api.js";
export default {
    name: "singsuccess",
    data() {
        return {
            lang: "",
            count: ""
        }
    },
    methods: {
        toMine () {
            this.$router.push("/mine");
        },
        back() {
            this.$router.push("/mine");
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
    created() {
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
.singsuccess{
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
        width: 100%;
        // height: 40%;
        // margin: 15% 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
        .back{
            position: absolute;
            left: 0;
            top: 0;
            padding: 2% 0 2% 2%;
            cursor: pointer;
        }
        .pic{
            width: 150px;
            height: 150px;
            margin-top: 15%;
            img{
                width: 80%;
                height: 80%;
            }
        }
        .pic, .txt{
            text-align: center;
        }
    }
}
</style>
