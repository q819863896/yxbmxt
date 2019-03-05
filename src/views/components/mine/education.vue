<template>
    <div class="major">
        <div class="search">
            <el-input v-model="name" :placeholder="lang=='zh' ? '会议名称' : 'Event Name'"></el-input>
            <img @click="search" src="@/assets/images/find.png" alt="">
        </div>
        <div class="mid">
            <div class="sstj">
                <!-- <el-select v-model="createvalue" :placeholder="lang=='zh' ? '按创建时间排序' : 'Sort by Creation Time'" @change="timeType">
                    <el-option
                        v-for="item in createTimeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="allAreaValue" :placeholder="lang=='zh' ? '所有地区' : 'Location'" @change="areaType">
                    <el-option value="allDq" :label="lang=='zh' ? '全部' : 'All Areas'">全部</el-option>
                    <el-option
                        v-for="item in allAreaOptions"
                        :key="item.id"
                        :label="item.city"
                        :value="item.city">
                    </el-option>
                </el-select> -->
                <el-date-picker
                    v-model="birthdayName"
                    format="yyyy-MM" 
                    value-format="yyyy-MM"
                    @change="changeMonth"
                    type="month"
                    :placeholder="lang=='zh' ? '选择日期' : 'Date'">
                    <!-- 选择日期 -->
                </el-date-picker>
            </div>
            <div class="ddpic" v-loading="loading">
                <dl v-for="(item, index) in items" :key="index">
                    <router-link :to="{path:'/activedetail', query:{cid:item.id}}">
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
                </dl>
            </div>
        </div>
    </div>
</template>

<script>
import { campAll, bynameandtypeCamp, cityData, filterss, bydateandaddressCamp, bydate } from "../../../api/api.js";
export default {
    name: "major",
    data() {
        return {
            lang: "",
            name: "",
            createTimeOptions: [
                {
                    value: '2',
                    label: '按开始时间排序-Sort by start time'
                },
                {
                    value: '3',
                    label: '按结束时间排序-Sort by end time'
                }
            ],
            allAreaOptions: [],
            createvalue: "",
            allAreaValue: "",
            birthdayName: "",
            items: [],
            loading: false
        }
    },
    methods: {
        search () {
            this.items = [];
            let params = {
                type: "教育",
                name: this.name
            };
            bynameandtypeCamp(params).then((res) => {
                this.loading = true;
                if (res.statu == 1) {
                    this.loading = false;
                    this.items = res.data;
                }
            })
        },
        changeMonth (val) {
            console.log(val);
            let params = {
                type: "教育",
                date: val
            };
            bydate(params).then((res) => {
                console.log(res);
            })
        },
        getDate () {
            let params = {
                type: "教育"
            };
            campAll(params).then((res) => {
                this.loading = true;
                if (res.statu == 1) {
                    this.loading = false;
                    this.items = res.data;
                }
            })
        },
        getCity () {
            cityData().then((res) => {
                this.allAreaOptions = res.data;
            })
        },
        // 按时间
        timeType(val) {
            this.items = [];
            console.log(this.allAreaValue);
            this.createvalue = val;
            let params = {
                date: this.createvalue,
                address: this.allAreaValue,
                type: "教育"
            };
            bydateandaddressCamp(params).then((res) => {
                this.items = res.data;
            })
        },
        // 按地区筛选
        areaType(val) {
            if (val == "allDq") {
                this.getDate();
            } else {
                this.allAreaValue = val;
                this.items = [];
                let params = {
                    date: this.createvalue,
                    address: this.allAreaValue,
                    type: "教育"
                };
                bydateandaddressCamp(params).then((res) => {
                    this.items = res.data
                })
            }
        }
    },
    created () {
        this.lang = sessionStorage.getItem("lange");
    },
    mounted () {
        this.getDate();
        this.getCity();
    }
}
</script>

<style lang="scss" scoped>
.major{
    width: 100%;
    height: 100%;
    list-style: none;
    padding: 2%;
    .search{
        width: 33.3%;
        position: relative;
        margin-bottom: 2%;
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
        .sstj{
            margin-bottom: 2%;
        }
    }
    .ddpic{
        dl{
            display: flex;
            padding: 2% 0;
            a{
                display: inline-block;
                width: 100%;
                display: flex;
                dt{
                    width: 128px;
                    height: 128px;
                    img{
                        width: 100%;
                        height: 100%;
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
        }
        
    }
}
</style>
