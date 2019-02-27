<template>
    <div class="mine">
        <reactivities />
        <div class="content">
            <persons @change="setSty" v-if="asd" />
            <el-tabs @change="setSty" v-if="asd" type="card">
                <el-tab-pane label="教育展" >
                    <education />
                </el-tab-pane>
                <el-tab-pane label="专业展" >
                    <major />
                </el-tab-pane>
                <el-tab-pane label="我的活动" >
                    <minehd />
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import Reactivities from "../reactivities/reactivities.vue";
import Persons from "./persons.vue";
import Minehd from "./minehd.vue";
import Major from "./major.vue";
import Education from "./education.vue";
// import ActivePre from "./activePre.vue";
export default {
    name: "mine",
    data() {
        return {
            asd: true
        }
    },
    components: { Reactivities, Persons, Minehd, Major, Education },
    methods: {
        setSty () {
            this.$emit("transferSty", this.asd);
        },
        hdyl () {

        }
    }
}
</script>

<style lang="scss" scoped>
.mine{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .reactivities{
        width: 100%;
        height: 50px;
    }
    .content{
        width: 100%;
        flex: 1;
        padding: 0 2%;
        display: flex;
        flex-direction: column;
        .person{
            padding:  4% 0;
        }
        .el-tabs{
            width: 100%;
            flex: 1;
            display: flex;
            flex-direction: column;
        }
    }
    .content /deep/ .is-active{
        border: 1px solid #006960;
        border-radius: 8px 8px 0px 0px;
        border-bottom: 2px solid #ffffff;
    }
    .content /deep/ .is-top{
        border-radius: 8px 8px 0px 0px;
    }
    .content /deep/ .el-tabs__header{
        margin: 0 0 0%;
        border-bottom: 1px solid #006960;
    }
    .content /deep/ .el-tabs__content{
        width: 100%;
        flex: 1;
        border: 1px solid #006960;
        border-top: none;
    }
    // .active{
    //     border: 1px solid #006960;
    //     border-radius: 8px 8px 0px 0px;
    // }
}
</style>
