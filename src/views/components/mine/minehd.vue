<template>
    <div class="minehd">
        <div class="search">
            <el-input v-model="name" :placeholder="lang=='zh' ? '会议名称' : 'Event Name'"></el-input>
            <img @click="searchName" src="@/assets/images/find.png" alt="">
        </div>
        <div class="mid">
            <div class="sstj">
                <!-- 按创建时间排序 -->
                <el-select v-model="creatTimeValue" :placeholder="lang=='zh' ? '按创建时间排序' : 'Sort by Creation Time'" @change="timeType">
                    <el-option
                        v-for="item in creatTimeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <!-- 所有地区 -->
                <el-select v-model="allAreaValue" :placeholder="lang=='zh' ? '所有地区' : 'Location'" @change="areaType">
                    <el-option value="allDq" :label="lang=='zh' ? '全部' : 'All Areas'">全部</el-option>
                    <el-option
                        v-for="item in allAreaOptions"
                        :key="item.id"
                        :label="item.city"
                        :value="item.city">
                    </el-option>
                </el-select>
            </div>
            <div class="ddpic" v-loading="loading" v-if="yesData">
                <div class="toActive" v-for="(item, index) in items" :key="index">
                    <router-link :to="{path:'/myactivedetail', query:{cid:item.campaign.id}}">
                        <dl>
                            <dt>
                                <img :src="item.enrolmentAttachment[0].attachmentUrl" alt="">
                            </dt>
                            <dd>
                                <p class="fontBlue">{{item.campaign.name}}</p>
                                <p>
                                    <i class="iconfont icon-dizhi"></i>
                                    <span>{{item.campaign.area}}</span>
                                </p>
                                <p>
                                    <i class="iconfont icon-shijian"></i>
                                    <span>{{item.campaign.campTime}}</span>
                                </p>
                                <p>
                                    <i class="iconfont icon-dizhi1"></i>
                                    <span>{{item.campaign.building}}</span>
                                </p>
                            </dd>
                        </dl>
                        <p class="signUp">{{lang=='zh' ? '查看报名' : 'Check Registration'}}</p>
                    </router-link>
                </div>
                    <!-- <dl v-for="(item,index) in items" :key="index" v-else>
                        <router-link :to="{path:'/activedetail',query:{cid:item.id}}">
                            <dt>
                                <img src="@/assets/images/success.png" alt="">
                            </dt>
                            <dd>
                                <p class="fontBlue">{{item.name}}</p>
                                <p>
                                    <i class="iconfont icon-dizhi"></i>
                                    <span>{{item.area}}</span>
                                </p>
                                <p>
                                    <i class="iconfont icon-shijian"></i>
                                    <span>{{item.startDate}}</span>-<span>{{item.endDate}}</span>
                                </p>
                                <p>
                                    <i class="iconfont icon-dizhi1"></i>
                                    <span>{{item.building}}</span>
                                </p>
                            </dd>
                        </router-link>
                    </dl> -->
            </div>
            <div class="noData" v-if="noData">
                <p>{{lang=='zh' ? '您还有没报名活动！' : 'Have you signed up yet?'}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { showbmxx, byname, filterss, cityData } from "../../../api/api.js";
export default {
    name: "minehd",
    data() {
        return {
            lang: "",
            name: "",
            yesData: true,
            noData: false,
            // 创建时间
            creatTimeOptions: [
                {
                    value: '2',
                    label: '按开始时间排序-Sort by start time'
                },
                {
                    value: '3',
                    label: '按结束时间排序-Sort by end time'
                }
            ],
            creatTimeValue: "",
            // 所有地区
            allAreaOptions: [],
            allAreaValue: "",
            items: [],
            loading: false
        }
    },
    methods: {
        searchName () {
            this.items = [];
            let params = {
                name: this.name
            };
            byname(params).then((res) => {
                this.items = res.data;
            })
        },
        // 按时间
        timeType (val) {
            this.creatTimeValue = val;
            console.log(this.allAreaValue);
            let params = {
                date: this.creatTimeValue,
                address: this.allAreaValue
            }
            filterss(params).then((res) => {
                this.items = res.data
            })
        },
        // 按地区
        areaType(val) {
            if (val == "allDq") {
                this.getAllData();
            } else {
                this.allAreaValue = val;
                this.items = [];
                let params = {
                    date: this.creatTimeValue,
                    address: this.allAreaValue
                };
                filterss(params).then((res) => {
                    this.items = res.data
                })
            }
        },
        getAllData() {
            // let Socket = new WebSocket(baseURL+'/campaign/showbmxx.do', [protocol]);
            // console.log(Socket.readyState());
            // let params = {
            //     lang: this.lang
            // };
            showbmxx().then((res) => {
                this.loading = true;
                if(res.statu == 1) {
                    if (res.message == "您还没有已报名的活动") {
                        this.yesData = false;
                        this.noData = true;
                        this.loading = false;
                    } else {
                        this.yesData = true;
                        this.noData = false;
                        this.loading = false;
                        this.items = res.data;
                    }
                    // this.items = res.data;
                    // this.loading = false;
                } else {
                    this.loading = false;
                    this.$message({
                        message: res.message,
                        type: 'warning'
                    });
                }
            })
        },
        getCity() {
            cityData().then((res) => {
                // console.log(res);
                this.allAreaOptions = res.data;
            })
        }
    },
    created () {
        // this.lang = sessionStorage.getItem("lange");
        this.lang = localStorage.getItem("lange");
    },
    mounted () {
        this.getAllData();
        this.getCity();
    }
}
</script>

<style lang="scss" scoped>
.minehd{
    width: 100%;
    height: 100%;
    list-style: none;
    padding: 2%;
    display: flex;
    flex-direction: column;
    .search{
        width: 33.3%;
        height: 50px;
        position: relative;
        img{
            position: absolute;
            right: 0;
            top: 0;
            width: 40px;
            height: 40px;
            cursor: pointer;
        }
    }
    .mid{
        background: #F9F9FB;
        width: 100%;
        flex: 1;
        .sstj{
            margin-bottom: 2%;
        }
        .ddpic{
            width: 100%;
            .toActive{
                width: 96%;
                padding: 0 2%;
                border-bottom: 1px dashed #cccccc;
                margin: 0 2%;
                a{
                    display: inline-block;
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    dl{
                        display: flex;
                        padding: 2% 0;
                        dt{
                            width: 128px;
                            height: 128px;
                            img{
                                width: 100%;
                                height: 100%;
                                min-width: 128px;
                            }
                        }
                        dd{
                            margin-left: 8px;
                            p{
                                line-height: 30px;
                            }
                            .fontBlue{
                                color: #0070D2;
                                font-size: 14px;
                            }
                        }
                    }
                    .signUp{
                        width: 100px;
                        height: 30px;
                        text-align: center;
                        line-height: 30px;
                        background: #006960;
                        color: #ffffff;
                        border-radius: 4px;
                    }
                }
            }
        }
        .noData{
            width: 100%;
            height: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            // height: 100%;
        }
    }
}
</style>
