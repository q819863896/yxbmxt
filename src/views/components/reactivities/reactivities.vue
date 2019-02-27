<template>
    <div class="reactivities">
        <div class="topHeader">
            <div class="logoBox" ref="logoBox">
                <img class="logo" src="@/assets/images/logo.png" alt="">
            </div>
            <div class="right">
                <router-link to="/message" class="message" ref="message">
                    <img src="@/assets/images/message.png" alt="">
                    <p></p>
                </router-link>
                <router-link to="/personInfo" class="personInfo" ref="personInfo">
                    <img class="personPic" src="@/assets/images/personInfo.png" alt="">
                </router-link>
                <div to="/logoout" class="logoout" ref="logoout" @click="logoout">
                    <img src="@/assets/images/logoout.png" alt="">
                </div>
            </div>
        </div>
        <div class="content">
            <router-view />
        </div>
    </div>
</template>

<script>
export default {
    name: "reactivities",
    data () {
        return {
            isCollapse: false,
        }
    },
    methods: {
        logoout () {
            this.$confirm('确认退出吗?', '提示', {
               confirmButtonText: '退出',
               cancelButtonText: '取消',
            }).then(() => {
               sessionStorage.removeItem('user');
               this.$router.push('/login');
            }).catch((err) => {
               console.error('loginErr', err);
            });
        },
    }
}
</script>

<style lang="scss" scoped>
.reactivities{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .topHeader{
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: space-between;
        .logoBox{
            width: 85%;
            height: 100%;
        }
        .right{
            flex: 1;
            height: 100%;
            display: flex;
            .message, .personInfo, .logoout{
                width: 3rem;
                height: 3rem;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                img{
                    width: 2.8rem;
                }
                .personPic{
                    width: 2rem;
                }
            }
            .message{
                position: relative;
                border-bottom: none;
                p{
                    position: absolute;
                    top: 16%;
                    right: 16%;
                    width: 6px;
                    height: 6px;
                    background: #CC0202;
                    border-radius: 50%;
                }
            }
        }
    }
    .content{
        width: 100%;
        flex: 1;
        margin-top: 50px;
    }
}
</style>
