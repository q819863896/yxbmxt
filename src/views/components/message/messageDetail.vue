<template>
    <div class="wrap">
        <topheader />
        <h4>{{lang == "zh" ? "消息通知" : "Message Notification"}}</h4>
        <div class="detail">
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
import Topheader from "../../components/reactivities/reactivities.vue";
import { updateStatu } from "../../../api/api.js";
export default {
    name: "meDe",
    components: {Topheader},
    data() {
        return {
            lang: "",
            items: []
        }
    },
    created() {
        this.lang = sessionStorage.getItem("lange");
    },
    mounted(){
        updateStatu(this.$route.query).then((res) => {
            
        })
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
