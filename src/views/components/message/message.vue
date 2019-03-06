<template>
    <div class="message">
        <div class="title">
            <p>{{lang == 'zh' ? '消息通知' : 'Notification Message'}}</p>
            <span v-if="this.count != 0" class="fontR" ref="numtit">(<span>{{num}}</span>{{lang == 'zh' ? '条新信息' : 'new messages'}})</span>
        </div>
        <div class="wrap">
            <router-link class="item" v-for="(item, index) in items" :key="index" :to="{path:'/messagedetail', query:{nid:item.notification.campaignId}}">
                <div class="top">
                    <p>{{item.notification.title}}</p><p class="newaa" v-if="item.notification.isRead==0">new</p>
                </div>
                <div class="center">
                    <p>
                        <em>{{lang == 'zh' ? '活动名称' : 'Activity Name'}}</em>：
                        <span>{{item.campaign.name}}</span>
                    </p>
                    <p class="mr">
                        <em>{{lang == 'zh' ? '所在地区' : 'Location'}}</em>：
                        <span>{{item.campaign.city}}</span>
                    </p>
                    <p class="mr">
                        <em>{{lang == 'zh' ? '活动地点' : 'Place of activity'}}</em>：
                        <span>{{item.campaign.address}}</span>
                    </p>
                    <p class="mr">
                        <em>{{lang == 'zh' ? '参会时间' : 'Attendance time'}}</em>：
                        <span>{{item.campaign.startDate}}</span>
                    </p>
                </div>
                <router-link :to="{path:'/messagedetail', query:{cid:item.id}}"></router-link>
            </router-link>
        </div>
    </div>
</template>

<script>
import { selectAll, updateStatu, updateCount } from "../../../api/api.js";
export default {
    name: "message",
    data() {
        return {
            count: "",
            num: "",
            lang: "",
            items: []
        }
    },
    methods: {
        // 获取消息通知的
        getAllDate () {
            selectAll().then((res) => {
                console.log(res);
                if (res.statu == 1) {
                    this.items = res.data;
                }
            })
        },
        getstatu () {
            updateCount().then((res) => {
                this.count = res.data;
                this.num = res.data;
            })
        }
    },
    created () {
        this.lang = sessionStorage.getItem("lange");
    },
    mounted () {
        this.getAllDate();
        this.getstatu();
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
            display: inline-block;
            width: 100%;
            height: 100%;
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
                p{
                    flex: 1;
                }
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
