<template>
    <div class="minehd">
        <div class="search">
            <el-input v-model="name" placeholder="会议名称"></el-input>
            <img src="@/assets/images/find.png" alt="">
        </div>
        <div class="mid">
            <div class="sstj">
                <el-select v-model="value" placeholder="按创建时间排序">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="value" placeholder="所有地区">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="ddpic">
                <dl>
                    <dt>
                        <img src="@/assets/images/success.png" alt="">
                    </dt>
                    <dd>
                        <p class="fontBlue">新湖三亚活动</p>
                        <p>
                            <i class="iconfont icon-dizhi"></i>
                            <span>北京市朝阳区</span>
                        </p>
                        <p>
                            <i class="iconfont icon-shijian"></i>
                            <span>北京市朝阳区</span>
                        </p>
                        <p>
                            <i class="iconfont icon-dizhi1"></i>
                            <span>北京市朝阳区</span>
                        </p>
                        <p @click="toactive">跳转</p>
                    </dd>
                </dl>
            </div>
        </div>
    </div>
</template>

<script>
import { showbmxx } from "../../../api/api.js";
export default {
    name: "minehd",
    data() {
        return {
            name: "",
            options: [
                {
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }
            ],
            value: ''
        }
    },
    methods: {
        toactive() {
            this.$router.push("/activedetail");
        },
        getAllData() {
            showbmxx().then((res) => {
                console.log(res);
            })
        },
    },
    mounted () {
        this.getAllData();
    }
}
</script>

<style lang="scss" scoped>
.minehd{
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
</style>
