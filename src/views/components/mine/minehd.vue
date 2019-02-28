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
                    <el-option
                        v-for="item in allAreaOptions"
                        :key="item.id"
                        :label="item.city"
                        :value="item.city">
                    </el-option>
                </el-select>
            </div>
            <div class="ddpic">
                    <dl v-for="(item,index) in items" :key="index" >
                        <!-- activedetail -->
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
                    </dl>
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
            // 创建时间
            creatTimeOptions: [
                {
                    value: '1',
                    label: '按创建时间排序'
                },
                {
                    value: '2',
                    label: '按开始时间排序'
                },
                {
                    value: '3',
                    label: '按结束时间排序'
                }
            ],
            creatTimeValue: "",
            // 所有地区
            allAreaOptions: [],
            allAreaValue: "",
            items: []
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
            this.allAreaValue = val;
            console.log(this.creatTimeValue);
            this.items = [];
            let params = {
                date: this.creatTimeValue,
                address: this.allAreaValue
            };
            filterss(params).then((res) => {
                this.items = res.data
            })
        },
        getAllData() {
            let params = {
                lang: this.lang
            };
            showbmxx(params).then((res) => {
                if(res.statu == 1) {
                    this.items = res.data;
                } else {
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
                this.allAreaOptions = res.data
            })
        }
    },
    created () {
        this.lang = sessionStorage.getItem("lange");
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
    height: 1000px;
    list-style: none;
    padding: 2%;
    overflow: hidden;
    overflow-y: auto;
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
        width: 100%;
        flex: 1;
        .sstj{
            margin-bottom: 2%;
        }
        .ddpic{
            width: 100%;
            height: 100%;
            
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
    
}
</style>
