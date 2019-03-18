<template>
    <div class="person">
        <p>{{userNames}}</p>
        <span>{{weeks}}，</span><span>{{dates}}</span>
    </div>
</template>

<script>
import { showName } from "../../../api/api.js";
export default {
    name: "person",
    data() {
        return {
            lang: "",
            userNames: "",
            weeks: "",
            dates: ""
        }
    },
    methods: {
        getName () {
            showName().then((res) => {
                this.userNames = res.data;
            })
        },
        getWeek () {
            let Dates = new Date();
            let Years = Dates.getFullYear();
            let Month = Dates.getMonth() + 1;
            let Days = Dates.getDate();
            let NowWeek = Dates.getDay();
            // 星期
            
            if (Month < 10) {
                Month = "0" + Month;
            } else {
                Month;
            }

            if (Days < 10) {
                Days = "0" + Days;
            } else {
                Days;
            }
            this.dates = Years + "-" + Month + "-" + Days;
        },
        getNowWeek () {
            if (this.lang == "zh") {
                let Dates = new Date();
                let weekDay = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
                this.weeks = weekDay[Dates.getDay()];
            } else {
                let Dates = new Date();
                let weekDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                this.weeks = weekDay[Dates.getDay()];
            }
        }
    },
    created () {
        this.getWeek();
        // this.lang = sessionStorage.getItem("lange");
        this.lang = localStorage.getItem("lange");
    },
    mounted () {
        this.getName();
        this.getNowWeek();
    }
}
</script>

<style lang="scss" scoped>

</style>
