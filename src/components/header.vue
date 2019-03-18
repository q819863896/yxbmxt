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
export default {
    data() {
        return {
            value: "zh",
            options: [
                {
                    value: 'zh',
                    label: '中文'
                },
                {
                    value: 'en',
                    label: 'English'
                }
            ]
        }
    },
    created() {
        console.log(localStorage.lange);
        this.value = localStorage.lange;
    },
    methods: {
        handleLange(e) {
            console.log(e);
            console.log(this.$i18n.locale);
            localStorage.setItem('lange',e);
            this.$i18n.locale = localStorage.lange;
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
