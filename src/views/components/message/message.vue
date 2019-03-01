<template>
    <div class="message">
        <div class="title">
            <p>{{lang == 'zh' ? '消息通知' : 'Notification Message'}}</p>
            <span class="fontR" ref="numtit">(<span>{{num}}</span>{{lang == 'zh' ? '条新信息' : 'new messages'}})</span>
        </div>
        <div class="wrap" v-if="showFlag">
            <div class="item" v-for="(item, index) in items" :key="index">
                <div class="top">
                    <p>{{item.title}}</p><p class="newaa" v-if="item.isRead==0">new</p>
                </div>
                <div class="center">
                    <p>
                        <em>{{lang == 'zh' ? '活动名称' : 'Activity Name'}}</em>
                        <span>{{新湖三亚活动}}</span>
                    </p>
                    <p class="mr">
                        <em>{{lang == 'zh' ? '所在地区' : 'Location'}}</em>
                        <span>新湖三亚活动</span>
                    </p>
                    <p class="mr">
                        <em>{{lang == 'zh' ? '活动地点' : 'Place of activity'}}</em>
                        <span>新湖三亚活动</span>
                    </p>
                    <p class="mr">
                        <em>{{lang == 'zh' ? '参会时间' : 'Attendance time'}}</em>
                        <span>2019/09/20 10：00</span>
                    </p>
                </div>
                <!-- <p class="toDetail" @click="onetodetail">{{lang == 'zh' ? '详情' : 'details'}}></p> -->
                <router-link :to="{path:'/messagedetail', query:{cid:item.id}}"></router-link>
            </div>

            
        </div>

        <div class="detail" v-else>
            <p>
                您报名参加的活动审核已通过
            </p>
            <p class="time">
                2018/09/20 14:00
            </p>
            <p class="mt">
                <span>活动名称：</span> <span class="fontB">新湖三亚活动</span>
            </p>
            <p class="mt">
                <span>所在地区：</span> <span>新湖三亚活动</span>
            </p>
            <p class="mt">
                <span>活动地点：</span> <span>新湖三亚活动</span>
            </p>
            <p class="mt">
                <span>参会时间：</span> <span>2018/09/24 10：00</span>
            </p>
            <p class="mt">
                <span>审核状态：</span> <span>已批准</span>
            </p>
            <p class="mt">
                <span>审核备注：</span> <span></span>
            </p>
        </div>
    </div>
</template>

<script>
import { selectAll } from "../../../api/api.js";
export default {
    name: "message",
    data() {
        return {
            num: "",
            showFlag: true,
            lang: "",
            items: []
        }
    },
    methods: {
        onetodetail() {
            this.showFlag = false;
            this.$refs.numtit.style = 'display:none;'
        },
        getAllDate () {
            selectAll().then((res) => {
                if (res.statu == 1) {
                    this.num = res.data.length;
                    this.items = res.data;
                }
            })
        }
    },
    created () {
        this.lang = sessionStorage.getItem("lange");
    },
    mounted () {
        this.getAllDate();
    }
}
</script>

<style lang="scss" scoped>
.message{
    width: 100%;
    height: 100%;
    padding: 0 4%;
    list-style: none;
    .content{
        margin-top: -20px;
    }
    .title{
        width: 100%;
        line-height: 30px;
        display: flex;
        padding: 3% 0 1% 0;
        p{
            font-size: 18px;
        }
        .fontR{
            color: #D63434;
        }
    }
    .wrap{
        box-shadow: 0px 0px 10px #cccccc;
        border-radius: 4px;
        padding: 3% 2%;
        .item{
            padding: 2% 0 3% 0;
            border-bottom: 1px dashed #D8DDE6;
            .top{
                display: flex;
                line-height: 16px;
                .newaa{
                    width: 40px;
                    height: 16px;
                    border-radius: 8px;
                    background: #CC0202;
                    color: #ffffff;
                    text-align: center;
                    margin-left: 8px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
            }
            .center{
                display: flex;
                padding: 1% 0;
                .mr{
                    margin-left: 12px;
                }
            }
            .toDetail{
                color: #0070D2;
                font-size: 14px;
                cursor: pointer;
            }
            em{
                font-style: normal;
            }
        }
        
    }

    .detail{
        color: #17315C;
        box-shadow: 0px 0px 10px #cccccc;
        padding: 3%;
        .time{
            color: #586D90;
            font-size: 14px;
            padding: 1% 0;
        }
        .mt{
            margin-top: 4px;
            .fontB{
                color: #0070D2;
            }
        }
    }
}
</style>
