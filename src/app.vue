<style>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .ivu-layout-header {
        z-index: 999;
    }
    .layout-logo{
        width: 128px;
        height: 30px;
        text-align: center;
        background: #5b6270;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 15px;
        left: 20px;
    }
    .layout-nav{
        width: 440px;
        margin: 0 auto;
        margin-right: 20px;
    }
    .layout-footer-center{
        text-align: center;
    }
    .gradient-0 {
        color: #fff;
        background: #36D1DC;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #5B86E5, #36D1DC);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #5B86E5, #36D1DC); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }
    .gradient-1 {
        color: #fff;
        background: #fc00ff;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #00dbde, #fc00ff);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #00dbde, #fc00ff); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }
    .gradient-2 {
        color: #fff;
        background: #FBD3E9;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #BB377D, #FBD3E9);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #BB377D, #FBD3E9); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }
    .gradient-3 {
        color: #fff;
        background: #FC5C7D;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #6A82FB, #FC5C7D);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #6A82FB, #FC5C7D); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }
    .text-center {
        text-align: center;
    }
    .text-left {
        text-align: left;
    }
    .text-right {
        text-align: right;
    }
    .mt8 {
        margin-top: 8px;
    }
    .mr8 {
        margin-right: 8px;
    }
    .mb32 {
        margin-bottom: 32px;
    }
    .state0 {
        margin-top: 16px;
        font-size: 16px;
        color: #2d8cf0;
    }
    .state1 {
        margin-top: 8px;
        font-size: 16px;
        color: #19be6b;
    }
    .state-1 {
        margin-top: 8px;
        font-size: 16px;
        color: #ed3f14;
    }
</style>
<template>
    <div class="layout">
        <Layout>
            <Header :style="{position: 'fixed', width: '100%'}">
                <Menu mode="horizontal" theme="dark" active-name="home">
                    <div class="layout-logo">
                        <h2 style="line-height: 30px;color: #fff;">CryptoJobs</h2>
                    </div>
                    <div class="layout-nav">
                        <router-link to="/">
                            <MenuItem name="home">
                                <Icon type="planet"></Icon>
                                首页
                            </MenuItem>
                        </router-link>
                        <Submenu name="3">
                            <template slot="title">
                                <Icon type="paper-airplane"></Icon>
                                创建
                            </template>
                            <router-link to="/create">
                                <MenuItem name="create">
                                    <Icon type="coffee"></Icon>
                                    发布职位
                                </MenuItem>
                            </router-link>
                            <router-link to="/carousel">
                                <MenuItem name="carousel">
                                    <Icon type="images"></Icon>
                                    首页轮播
                                </MenuItem>
                            </router-link>
                        </Submenu>
                        <router-link to="/account">
                            <MenuItem name="account">
                                <Icon type="cube"></Icon>
                                个人中心
                            </MenuItem>
                        </router-link>
                        <router-link to="/about">
                            <MenuItem name="about">
                                <Icon type="bug"></Icon>
                                关于
                            </MenuItem>
                        </router-link>
                    </div>
                </Menu>
            </Header>
            <Content :style="{margin: '88px 20px 0', padding: '32px 0', background: '#fff', minHeight: '500px'}">
                <router-view></router-view>
            </Content>
            <Footer class="layout-footer-center">2018 &copy; Nebulas Crypto Jobs</Footer>
        </Layout>
    </div>
</template>
<script>
    export default {
        data() {
            return {

            };
        },
        created() {

        },
        mounted() {

        },
        beforeDestroy() {

        },
        methods: {

        }
    };
</script>