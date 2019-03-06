<template>
    <div class="reactivities">
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
            <router-view />
        </div>
        
    </div>
</template>

<script>
import { updateCount, loginOut } from "../../../api/api.js";
export default {
    name: "reactivities",
    data () {
        return {
            lang: "",
            count: ""
        }
    },
    methods: {
        toMine() {
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
.reactivities{
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
    .content{
        width: 100%;
        flex: 1;
        margin-top: 50px;
        overflow: hidden;
        overflow-y: auto;
    }
}
</style>
