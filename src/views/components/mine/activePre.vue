<template>
    <div class="activePre">
        <div class="top">
            <div class="left">
                <p class="darkG" @click="edcuBtn">教育展</p>
                <p class="shallow" @click="majorBtn">专业展</p>
            </div>
            <div class="right" >
                <p v-for="(item, index) in mouths" :key="index" @mouseenter="checkMounth($event)" @mouseleave="leave($event)" ref="everMoun">{{item.text}}</p>
            </div>
        </div>
        <!--  -->
        <div class="wrap">
            <div class="tit">
                <span>{{typeText}}</span> <span>{{hx}}</span> <span>{{enterMounth}}</span>
            </div>
            <div class="sweek" id="sweek">
                <!-- <p>一</p><p>二</p><p>三</p><p>四</p><p>五</p><p>六</p><p>日</p>
                <p>一</p><p>二</p><p>三</p><p>四</p><p>五</p><p>六</p><p>日</p>
                <p>一</p><p>二</p><p>三</p><p>四</p><p>五</p><p>六</p><p>日</p>
                <p>一</p><p>二</p><p>三</p><p>四</p><p>五</p><p>六</p><p>日</p>
                <p>一</p><p>二</p><p>三</p> -->
            </div>
            <div class="sday" id="sday">
                <!-- <p>1</p><p>2</p><p>3</p><p>4</p><p>5</p><p>6</p><p>7</p><p>8</p><p>9</p><p>10</p><p>11</p><p>12</p><p>13</p><p>14</p><p>15</p><p>16</p><p>17</p><p>18</p><p>19</p><p>20</p><p>21</p><p>22</p><p>23</p><p>24</p><p>25</p><p>26</p><p>27</p><p>28</p><p>29</p><p>30</p><p>31</p> -->
            </div>
            <div class="sbody">

            </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery';
export default {
    name: "activePre",
    data() {
        return {
            mouths: [
                {
                    text: "1月"
                },
                {
                    text: "2月"
                },
                {
                    text: "3月"
                },
                {
                    text: "4月"
                },
                {
                    text: "5月"
                },
                {
                    text: "6月"
                },
                {
                    text: "7月"
                },
                {
                    text: "8月"
                },
                {
                    text: "9月"
                },
                {
                    text: "10月"
                },
                {
                    text: "11月"
                },
                {
                    text: "12月"
                }
            ],
            typeText: "",
            enterMounth: "",
            addActive: false,
            hx: ""
        }
    },
    methods: {
        edcuBtn () {
            this.typeText = "教育展";
        },
        majorBtn () {
            this.typeText = "专业展";
        },
         getCountDays(){
            var curDate = new Date();
            var curMonth = curDate.getMonth();
            curDate.setMonth(curMonth+1);
            curDate.setDate(0);
            return curDate.getDate();
        },
        checkMounth (e) {
            $("#sday").empty();
            $("#sweek").empty();
            let prevTxt = e.target.innerText;
            let txtMonth = prevTxt.replace(/月/g, "");
            this.enterMounth = e.srcElement.innerHTML;
            this.typeText = "教育展";
            e.currentTarget.className = "active";
            this.hx = "-";
            let nDate = new Date();
            let nYear = nDate.getFullYear();
            var month=txtMonth;
            var week = "日一二三四五六".split("")[new Date(Date.UTC(nYear, month-1, 1)).getDay()];
            var jtweek = parseInt("7123456".split("")[new Date(Date.UTC(nYear, month-1, 1)).getDay()]);
            console.log(month+"月份的第一天是："+ jtweek);
            console.log(typeof jtweek);
            nDate.setMonth(month);
            nDate.setDate(0);
            console.log(nDate.getDate());   // 每个月都有几天
            let dqdays = nDate.getDate();   // 每个月都有几天
            for(let i = 0; i < dqdays; i++) {
                let dayHtml = "";
                dayHtml += '<p class="appendHtmlCon">'+(i+1)+'</p>';
                $("#sday").append(dayHtml);
                $("#sday").addClass("sday");

                let weekHtml = "";

                weekHtml += '<p>'+jtweek+'</p>'+'<p>'+(jtweek+1)+'</p>'
                $("#sweek").html(weekHtml)
            }
        },
        leave (e) {
            e.currentTarget.className = "";
        }
    }
}
</script>

<style lang="scss" scoped>
.activePre{
    width: 100%;
    height: 100%;
    .top{
        width: 100%;
        height: 30px;
        line-height: 30px;
        display: flex;
        .left{
            width: 24%;
            height: 100%;
            display: flex;
            padding-right: 2%;
            p{
                width: 109px;
                text-align: center;
                border: 1px solid #006960;
            }
            .darkG{
                border-radius: 3px 0px 0px 3px;
                background: #006960;
                color: #ffffff;
                cursor: pointer;
            }
            .shallow{
                border-radius: 0px 3px 3px 0px;
                cursor: pointer;
            }
        }
        .right{
            flex: 1;
            height: 100%;
            display: flex;
            padding-left: 2%;
            p{
                flex: 1;
                text-align: center;
                border-top: 1px solid #006960;
                border-left: 1px solid #006960;
                border-bottom: 1px solid #006960;
                &:nth-last-child() {
                    border-right: 1px solid #006960;
                }
            }
            .january{
                border-radius: 3px 0px 0px 3px;
            }
            .december{
                border-radius: 0px 3px 3px 0px;
                border-right: 1px solid #006960;
            }
            .active{
                background: #006960;
                color: #ffffff;
            }
        }
    }
    .wrap{
        margin-top: 2%;
        .tit{
            width: 100%;
            height: 30px;
            line-height: 30px;
            background: #006960;
            color: #ffffff;
            text-align: center;
        }
        .sweek{
            width: 100%;
            height: 30px;
            line-height: 30px;
            display: flex;
            background: #006960;
            color: #ffffff;
            p{
                flex: 1;
                text-align: center;
                border-top: 1px solid #D8DDE6;
                border-left: 1px solid #D8DDE6;
                font-size: 12px;
                &:nth-last-child(){
                    border-right: 1px solid #D8DDE6;
                }
            }
        }
        .sday{
            width: 100%;
            height: 30px;
            line-height: 30px;
            display: flex;
            color: #006960;
            p{
                flex: 1;
                font-size: 12px;
                text-align: center;
            }
            .appendHtmlCon{
                flex: 1;
                font-size: 12px;
                text-align: center;
                color:red !important;
            }
        }
        
    }
}
</style>
