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
                <span>{{typeText}}</span>-<span>{{enterMounth}}</span>
            </div>
        </div>
    </div>
</template>

<script>
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
            typeText: "教育展",
            enterMounth: "",
            addActive: false,
        }
    },
    methods: {
        edcuBtn () {
            this.typeText = "教育展";
        },
        majorBtn () {
            this.typeText = "专业展";
        },
        checkMounth (e) {
            console.log(e);
            let prevTxt = e.srcElement.innerHTML;
            this.enterMounth = e.srcElement.innerHTML;
            e.currentTarget.className = "active";
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
                border: 1px solid #006960;
                border-right: none;
                &:nth-child(1) {
                    border: 3px 0px 0px 3px;
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
}
</style>
