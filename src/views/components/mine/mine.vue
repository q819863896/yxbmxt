<template>
    <div class="mine">
        <reactivities />
        <div class="content">
            <persons @change="setSty" v-if="asd" />
            <el-tabs @change="setSty" v-if="asd" type="card">
                <el-tab-pane label="我的活动">
                    <minehd />
                </el-tab-pane>
                <el-tab-pane label="活动预览">
                    <active-pre />
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import Reactivities from "../reactivities/reactivities.vue";
import Persons from "./persons.vue";
import Minehd from "./minehd.vue";
import ActivePre from "./activePre.vue";
export default {
    name: "mine",
    data() {
        return {
            asd: true
        }
    },
    components: { Reactivities, Persons, Minehd, ActivePre },
    methods: {
        setSty () {
            this.$emit("transferSty", this.asd);
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
        .person{
            padding:  4% 0;
        }
    }
}
</style>
