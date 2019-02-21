<template>
    <div class="activedetail">
        <!-- <topheader /> -->
        <div class="topHeader">
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
        <div class="wrap">
            <p class="back">
                <i class="iconfont icon-fanhui"></i>
                返回活动列表
            </p>
            <div class="top">
                <div class="left">
                    <p class="txt">您报名参加的活动审核已通过</p>
                    <p class="fontC">2018/08/01</p>
                </div>
                <div class="right">
                    <p>立即报名</p>
                </div>
            </div>
            <div class="itemDetail">
                <p>
                    <span>活动名称</span>：<span>新湖三亚活动</span>
                </p>
                <p>
                    <span>所在地点</span>：<span>北京市</span>
                </p>
                <p>
                    <span>活动地点</span>：<span>新湖财富</span>
                </p>
                <p>
                    <span>详细地址</span>：<span>海淀区上地三街</span>
                </p>
                <p>
                    <span>活动时间</span>：<span>2018/09/01 13:00:00-2018/09/03 14:00:00</span>
                </p>
            </div>
            <!-- 活动介绍 -->
            <div class="activejs">
                <div class="tit">活动介绍</div>
                <p>凯撒活动和零六年初就你就回答不垃圾啊后来还得零八陆军海军飒飒的八十八立刻就会三零搭载了阿贾克斯登陆报错京哈的沙龙不支持</p>
            </div>
            <!-- 活动对接人 -->
            <div class="activedjr">
                <div class="tit">活动对接人</div>
                <p>
                    <span>姓名</span>：<span>李女士</span>
                </p>
                <p>
                    <span>联系电话</span>：
                </p>
                <div class="pic">
                    <img src="@/assets/images/success.png" alt="">
                </div>
            </div>
            <!-- 会场图片 -->
            <div class="picwrap">
                <div class="tit">会场图片</div>
                <div class="picDiv">
                    <img src="@/assets/images/success.png" alt="">
                    <img src="@/assets/images/success.png" alt="">
                    <img src="@/assets/images/success.png" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import topheader from "../reactivities/reactivities.vue";
export default {
    name: "activedetail",
    components: { topheader },
    data() {
        return {

        }
    },

}
</script>

<style lang="scss" scoped>
.activedetail{
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
        }
    }
    .wrap{
        padding: 2%;
        .back{
            cursor: pointer;
            padding: 1% 0 3% 0;
        }
        .top{
            width: 100%;
            display: flex;
            justify-content: space-between;
            padding-bottom: 2%;
            .left{
                width: 90%;
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
                p{
                    width: 90px;
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
        .tit{
            width: 100%;
            background: #F3F6F9;
        }
    }
}
</style>
