<template>
    <div class="wrap">
        <topheader />
        <h4>{{lang == "zh" ? "消息通知" : "Message Notification"}}</h4>
        <div class="detail">
            <p>
                {{this.items.isApproval}}
            </p>
            <p class="time">
                {{this.items.campaign.startDate}}
            </p>
            <p class="mt">
                <!-- 活动名称 -->
                <span>{{lang == "zh" ? "活动名称" : "Event Name"}}：</span> <span class="fontB">{{this.items.campaign.name}}</span>
            </p>
            <p class="mt">
                <!-- 所在地区 -->
                <span>{{lang == "zh" ? "所在地区" : "Location"}}：</span> <span>{{this.items.campaign.area}}</span>
            </p>
            <p class="mt">
                <!-- 活动地点 -->
                <span>{{lang == "zh" ? "活动地点" : "Venue Address"}}：</span> <span>{{this.items.campaign.building}}</span>
            </p>
            <p class="mt">
                <!-- 更改信息 -->
                <span>{{lang == "zh" ? "更改信息" : "Change Information"}}：</span> <span>{{this.items.campaign.startDate}}</span>
            </p>
            <p class="mt">
                <!-- 审核状态 -->
                <span>{{lang == "zh" ? "审核状态" : "Review Status"}}：</span> <span>{{this.items.isApproval}}</span>
            </p>
            <p class="mt">
                <!-- 审核备注 -->
                <span>{{lang == "zh" ? "审核备注" : "Review Notes"}}：</span> <span>{{this.items.approvalText}}</span>
            </p>
        </div>
    </div>
</template>

<script>
import Topheader from "../../components/reactivities/reactivities.vue";
import { updateStatu, bmxxjl } from "../../../api/api.js";
export default {
    name: "meDe",
    components: {Topheader},
    data() {
        return {
            lang: "",
            items: []
        }
    },
    methods: {
        // 展示消息详细
        showDetail () {
            let params = {
                nid: this.$route.query.nid
            };
            bmxxjl(params).then((res) => {
                if (res.statu == 1) {
                    this.items = res.data;
                }
            })
        },
        // 判断已读状态
        flagRead () {
            let params = {
                nid: this.$route.query.cid
            };
            updateStatu(params).then((res) => {
                
            })
        }
    },
    created() {
        this.lang = sessionStorage.getItem("lange");
    },
    mounted(){
        this.showDetail();
        this.flagRead();
        // updateStatu(this.$route.query).then((res) => {
            
        // })
    }
}
</script>

<style lang="scss" scoped>
.wrap{
    h4{
        margin-left: 15%;
        margin-top: 4%;
    }
    .detail{
        width: 80%;
        margin: 1% 10% 0 10%;
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
