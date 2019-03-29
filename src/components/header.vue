<template>
    <div class="top">
        <img src="@/assets/images/logo.png" alt="">
        <el-select v-model="value" placeholder="请选择" @change="handleLange">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
        </el-select>
    </div>
</template>

<script>
import "../lang/index.js";
import { cun } from "../api/api.js";
export default {
    data() {
        return {
            value: "",
            options: [
                {
                    value: 'zh',
                    label: '中文',
                    id: 0
                },
                {
                    value: 'en',
                    label: 'English',
                    id: 1
                }
            ]
        }
    },
    created() {
        this.value = localStorage.lange;
    },
    mounted() {
        let params = {
            language: 0
        };
        console.log(params);
        sessionStorage.setItem("changeLang", params.language);
        cun(params).then((res) => {
            
        })
    },
    methods: {
        handleLange(e) {
            localStorage.setItem('lange',e);
            this.$i18n.locale = localStorage.lange;
            if (e == "en") {
                let params = {
                    language: 1
                };
                console.log(params);
                sessionStorage.setItem("changeLang", params.language);
                sessionStorage.setItem("yytype", "en");
                cun(params).then((res) => {

                })
            } else if (e == "zh") {
                let params = {
                    language: 0
                };
                console.log(params);
                sessionStorage.setItem("changeLang", params.language);
                sessionStorage.setItem("yytype", "zh");
                cun(params).then((res) => {
                    
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.top{
    width: 100%;
    height: 50px;
    display: flex;
    line-height: 50px;
    justify-content: space-between;
    padding-right: 20px;
    img{
        width: 150px;
        height: 50px;
    }
}
</style>
