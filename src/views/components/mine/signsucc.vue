<template>
    <div class="singsuccess">
        <div class="topHeader" ref="tophead">
            <div class="logoBox" ref="logoBox">
                <img class="logo" src="@/assets/images/logo.png" alt="">
            </div>
            <div class="right">
                <router-link to="/message" class="message" ref="message">
                    <img src="@/assets/images/message.png" alt="">
                    <p></p>
                </router-link>
                <router-link to="/personInfo" class="personInfo" ref="personInfo">
                    <img class="personPic" src="@/assets/images/personInfo.png" alt="">
                </router-link>
                <div to="/logoout" class="logoout" ref="logoout" @click.native.prevent="logoout">
                    <img src="@/assets/images/logoout.png" alt="">
                </div>
            </div>
        </div>
        <div class="wrap">
            <p class="back" @click="back">
                <i class="iconfont icon-fanhui"></i>
                返回我的活动
            </p>
            <p class="pic">
                <img src="@/assets/images/success.png" alt="">
            </p>
            <p class="txt">您已成功提交此次的报名信息，我们将在7个工作日内完成处理，请耐心等待。</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "singsuccess",
    methods: {
        back() {
            this.$router.push("/mine")
        }
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
        display: flex;
        .logoBox{
            width: 85%;
        }
        .right{
            flex: 1;
            height: 100%;
            display: flex;
            .personInfo{
                display: flex;
                justify-content: center;
                align-items: center;
                img{
                    width: 80%;
                    height: 70%;
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
