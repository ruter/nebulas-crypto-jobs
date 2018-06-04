<style scoped>
    .index {
        width: 100%;
    }
</style>
<template>
    <div class="index">
        <Row type="flex" justify="center" align="middle">
            <Col span="12">
            <Form ref="job" :model="job" :rules="ruleValidate" :label-width="80">
                <FormItem label="图片地址" prop="image">
                    <Input v-model="job.image" placeholder="请输入要展示的图片地址"></Input>
                </FormItem>
                <FormItem label="图片链接" prop="link">
                    <Input v-model="job.link" placeholder="请输入图片跳转的链接"></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleConfirmClick">确定发布</Button>
                </FormItem>
            </Form>
            </Col>
            <Spin size="large" fix v-if="loading"></Spin>
        </Row>
    </div>
</template>
<script>
    import util from '../libs/util';
    import NebPay from '../libs/nebpay';
    import {Account, Unit} from 'nebulas';

    let nebPay = new NebPay();

    export default {
        data() {
            return {
                address: '',
                job: {
                    link: '',
                    image: ''
                },
                ruleValidate: {
                    image: [
                        { required: true, message: '请输入要展示的图片地址', trigger: 'blur' }
                    ],
                    link: [
                        {required: true, message: '请输入图片点击跳转的链接', trigger: 'blur' }
                    ]
                },
                loading: true,
                timeoutObj: null
            }
        },
        watch: {
            address() {
                this.startApp();
            }
        },
        created() {
            if (util.noWallet) {
                this.loading = false;
                this.$Modal.warning(util.PocketErr);
            } else {
                this.timeoutObj = setTimeout(() => {
                    this.$Modal.warning(util.WalletWarning);
                }, 5000);
                util.getAccount(this);
            }
        },
        methods: {
            startApp() {
                clearTimeout(this.timeoutObj);
                this.loading = false;
            },
            handleConfirmClick() {
                this.$refs['job'].validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        this.handleCreate();
                    } else {
                        this.$Message.error('请将信息填写完整');
                    }
                });
            },
            handleCreate() {
                let to = util.getContractAddress(),
                    args = util.toSting([this.job]);
                nebPay.call(to, 0.1, 'createCarousel', args, {
                    listener: (data) => {
                        if (typeof data === 'object') {
                            // todo
                        } else {
                            this.$Modal.error({
                                title: '创建失败',
                                content: '交易被取消，首页轮播图失败'
                            });
                        }
                        this.loading = false;
                    }
                });
            }
        }
    };
</script>