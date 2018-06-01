<style scoped>
    .index {
        width: 100%;
    }
    .pet-mb-32 {
        margin-bottom: 32px;
    }
    .pet-mb-160 {
        margin-bottom: 160px;
    }
</style>
<template>
    <div class="index">
        <Row type="flex" justify="center" align="middle" class="pet-mb-160" v-if="!created">
            <Col span="12">
            <Form ref="punchInfo" :model="punchInfo" :rules="ruleValidate" :label-width="80">
                <FormItem label="打卡目标" prop="name">
                    <Input v-model="punchInfo.name" placeholder="请输入打卡目标"></Input>
                </FormItem>
                <FormItem label="打卡描述" prop="desc">
                    <Input v-model="punchInfo.desc" placeholder="请输入打卡目标的描述"></Input>
                </FormItem>
                <FormItem label="工作类型" prop="cycle">
                    <RadioGroup v-model="punchInfo.cycle">
                        <Radio label="全职">
                            <span>全职</span>
                        </Radio>
                        <Radio label="兼职">
                            <span>兼职</span>
                        </Radio>
                        <Radio label="实习">
                            <span>实习</span>
                        </Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="激励金额">
                    <Input v-model="punchInfo.deposit" placeholder="请输入激励金额"></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleConfirmClick">确定</Button>
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
    import BigNumber from 'bignumber.js';
    import {Account} from 'nebulas';

    let nebPay = new NebPay();

    export default {
        data() {
            return {
                address: '',
                created: false,
                punchInfo: {
                    name: '',
                    desc: '',
                    cycle: '7',
                    deposit: ''
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '请输入打卡项目的名称', trigger: 'blur' }
                    ],
                    desc: [
                        { required: true, message: '请输入打卡项目的描述', trigger: 'blur' }
                    ],
                    cycle: [
                        { required: true, message: '请选择一个打卡周期', trigger: 'change' }
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
                this.showError();
            } else {
                this.timeoutObj = setTimeout(() => {
                    this.showWarning();
                }, 5000);
                util.getAccount(this);
            }
        },
        methods: {
            startApp() {
                clearTimeout(this.timeoutObj);
                this.loading = false;
            },
            showError() {
                this.$Modal.warning(util.PocketErr);
            },
            showWarning() {
                this.$Modal.warning(util.WalletWarning);
            },
            handleConfirmClick() {
                this.$refs['punchInfo'].validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        let info = {
                            name: this.punchInfo.name,
                            desc: this.punchInfo.desc,
                            cycle: parseInt(this.punchInfo.cycle)
                        };
                        this.handleCreate(info, this.punchInfo.deposit);
                    } else {
                        this.$Message.error('请将信息填写完整');
                    }
                });
            },
            handleCreate(info, value) {
                let to = util.getContractAddress(),
                    args = util.toSting([info]),
                    amount = value ? new BigNumber(value) : '0';
                nebPay.call(to, amount, 'create', args, {
                    listener: (data) => {
                        if (typeof data === 'object') {
                            this.created = true;
                        } else {
                            this.$Modal.error({
                                title: '创建失败',
                                content: '交易被取消，打卡创建失败'
                            });
                        }
                        this.loading = false;
                    }
                });
            }
        }
    };
</script>