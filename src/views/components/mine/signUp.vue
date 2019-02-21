<template>
    <div class="pickPeo">
        <el-form :model="pickPeo" :rules="pickPeoRules" ref="pickPeo" class="demo-ruleForm login-container">
            <div class="top">
                <h4>对接人基本信息</h4>
                <div class="listDiv">
                    <el-form-item label="姓名" prop="userName" style="position: relative">
                        <el-input type="text" name="userName" v-model.trim="pickPeo.userName" placeholder="姓名">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="职位" prop="position">
                        <el-input type="text" name="position" v-model.trim="pickPeo.position" auto-complete="off" placeholder="职位"></el-input>
                    </el-form-item>
                    <el-form-item label="电子邮箱" prop="email">
                        <el-input type="text" name="email" v-model.trim="pickPeo.email" auto-complete="off" placeholder="电子邮箱"></el-input>
                    </el-form-item>
                    <el-form-item label="国别" prop="country">
                        <el-select v-model="value" placeholder="请选择">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="电话" prop="tel">
                        <el-input type="text" name="tel" v-model.trim="pickPeo.tel" auto-complete="off" placeholder="电话"></el-input>
                    </el-form-item>
                    <el-form-item label="院校名称" prop="schoolName">
                        <el-input type="text" name="schoolName" v-model.trim="pickPeo.schoolName" auto-complete="off" placeholder="院校名称"></el-input>
                    </el-form-item>
                </div>
            </div>
            <div class="mid">
                <h4>其他信息</h4>
                <div class="listDiv">
                    <el-form-item label="参考资料" prop="country">
                        <el-select v-model="zlvalue" placeholder="请选择">
                            <el-option
                                v-for="item in zloptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="是否讲座" prop="lecture"><br>
                        <el-checkbox v-model="checked"></el-checkbox>
                    </el-form-item>
                </div>
            </div>
            <div class="under">
                <div class="untop">
                    <h4>附件信息</h4><span class="fontR">(备注：LOGO、PPT、其他)</span>
                </div>
                <div class="upLoad">
                    上传附件
                </div>
            </div>
            <div class="pickbtnGroup">
                <div class="contue" @click="pickContueBtn">报名</div>
                <div class="cancel" @click="pickCancelBtn">取消</div>
            </div>
        </el-form>
    </div>
</template>

<script>
export default {
    name: "signUp"
}
</script>

<style lang="scss" scoped>
    .pickPeo{
        width: 88%;
        margin: 0 6%;
        padding: 2%;
        box-shadow: 0px 0px 10px #cccccc;
        .el-form{
            width: 100%;
            .top{
                border-bottom: 1px dashed #D8DDE6;
                padding: 2% 0;
                .listDiv{
                    display: flex;
                    flex-wrap: wrap;
                }
            }
            .mid{
                border-bottom: 1px dashed #D8DDE6;
                padding: 2% 0;
                .listDiv{
                    display: flex;
                }
            }
            .under{
                padding: 2% 0;
                .untop{
                    display: flex;
                    line-height: 30px;
                    span{
                        font-size: 14px;
                        color: #CC0202;
                    }
                }
                .upLoad{
                    width: 86px;
                    height: 30px;
                    text-align: center;
                    line-height: 30px;
                    border: 1px solid #006960;
                    color: #006960;
                    border-radius: 4px;
                }
            }
            .pickbtnGroup{
                width: 50%;
                display: flex;
                margin-left: 22%;
                div{
                    width: 60px;
                    height: 30px;
                    text-align: center;
                    line-height: 30px;
                    margin-left: 30%;
                    border: 1px solid #006960;
                }
            }
            .el-form-item{
                width: 50%;
                padding: 0 2%;
                .el-select{
                    width: 100%;
                }
            }
        }
    }
</style>
