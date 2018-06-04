<style scoped>
    .index {
        width: 100%;
    }
</style>
<template>
    <div class="index">
        <Row type="flex" justify="center" align="middle">
            <Col span="20">
            <div class="mb32">
                <h1>关于「CryptoJobs」</h1>
                <h3>CryptoJobs 是基于星云链开发的一款招聘信息发布应用。</h3>
                <h3>在 CryptoJobs 中你可以选择支付 0.001 NAS 用于创建普通的文字招聘信息，或者支付 0.1 NAS 发布首页轮播图信息。</h3>
                <h3>普通的文字招聘信息将会永久存在星云链上，它们不会被删除或篡改，你不用担心发布的招聘链接的指向遭到恶意篡改而造成损失。</h3>
                <h3>首页轮播图信息的存在时长为 1 个月，在相应的信息过期后我们将会进行下架处理，以确保其他用户发布的信息能够得到展示。</h3>
            </div>
            <div>
                <h1>FAQ</h1>
                <Collapse value="1">
                    <Panel name="1">
                        我应该如何发布招聘信息？
                        <p slot="content">
                            你只需要在菜单栏的「创建」下打开你要创建的信息类型「首页轮播」或「发布职位」，填写相应信息即可创建。
                        </p>
                    </Panel>
                    <Panel name="2">
                        在发布信息前我需要准备些什么？
                        <p slot="content">
                            CryptoJobs 的使用依赖于 Chrome 浏览器的「星云钱包插件」，如果你还没有安装，则需要先<a href="https://github.com/ChengOrangeJu/WebExtensionWallet" target="_blank">安装 NAS 钱包插件</a>，此外你的账户中还需要有发布招聘信息所需的 NAS.
                        </p>
                    </Panel>
                    <Panel name="3">
                        为什么我发布的招聘信息不能马上看到？
                        <p slot="content">
                            因为区块链的特性，数据的写入是需要耗费相对于传统中心化服务更长的时间的，这个时间一般不会超过 30s，请耐心等待数据的写入。
                        </p>
                    </Panel>
                </Collapse>
            </div>
            </Col>
        </Row>
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
