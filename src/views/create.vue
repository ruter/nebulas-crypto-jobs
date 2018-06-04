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
                <FormItem label="职位类别" prop="category">
                    <Select v-model="job.category" placeholder="请选择职位类别">
                        <Option value="item.value" key="item.value">item.label</Option>
                    </Select>
                </FormItem>
                <FormItem label="职位名称" prop="title">
                    <Input v-model="job.title" placeholder="请输入职位名称"></Input>
                </FormItem>
                <FormItem label="工作性质" prop="type">
                    <RadioGroup v-model="job.type">
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
                <FormItem label="薪资范围" prop="salary">
                    <Input v-model="job.salary" placeholder="请输入薪资范围，如：10K~15K"></Input>
                </FormItem>
                <FormItem label="工作城市" prop="location">
                    <Input v-model="job.location" placeholder="请输入工作城市，如：北京"></Input>
                </FormItem>
                <FormItem label="工作经验" prop="exp">
                    <Select v-model="job.exp" placeholder="请选择工作经验">
                        <Option value="item.value" key="item.value">item.label</Option>
                    </Select>
                </FormItem>
                <FormItem label="学历要求" prop="edu">
                    <Select v-model="job.edu" placeholder="请选择最低学历">
                        <Option value="item.value" key="item.value">item.label</Option>
                    </Select>
                </FormItem>
                <FormItem label="详情链接">
                    <Input v-model="job.link" placeholder="请输入招聘职位的详情链接"></Input>
                </FormItem>
                <FormItem label="公司名称" prop="company">
                    <Input v-model="job.company" placeholder="请输入公司名称"></Input>
                </FormItem>
                <FormItem label="所在领域" prop="domain">
                    <Input v-model="job.domain" placeholder="请输入公司所在领域，如：云计算、游戏"></Input>
                </FormItem>
                <FormItem label="发展阶段" prop="phase">
                    <Input v-model="job.phase" placeholder="请输入公司所处发展阶段，如：成长型（A轮）"></Input>
                </FormItem>
                <FormItem label="公司规模" prop="scale">
                    <Input v-model="job.scale" placeholder="请输入公司规模，如：50~100人"></Input>
                </FormItem>
                <FormItem label="公司主页">
                    <Input v-model="job.website" placeholder="请输入公司官网主页"></Input>
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
                    title: '',
                    link: '',
                    category: '',
                    type: '全职',
                    salary: '',
                    exp: '',
                    edu: '',
                    location: '',
                    company: '',
                    website: '',
                    domain: '',
                    scale: '',
                    phase: ''
                },
                ruleValidate: {
                    title: [
                        { required: true, message: '请输入职位名称', trigger: 'blur' }
                    ],
                    category: [
                        { required: true, message: '请选择一个职位类别', trigger: 'change' }
                    ],
                    type: [
                        { required: true, message: '请选择一个工作性质', trigger: 'change' }
                    ],
                    salary: [
                        { required: true, message: '请输入薪资范围', trigger: 'blur' }
                    ],
                    exp: [
                        { required: true, message: '请选择工作经验', trigger: 'change' }
                    ],
                    edu: [
                        { required: true, message: '请选择最低学历要求', trigger: 'change' }
                    ],
                    location: [
                        { required: true, message: '请填写工作城市', trigger: 'blur' }
                    ],
                    company: [
                        { required: true, message: '请填写公司名称', trigger: 'blur' }
                    ],
                    domain: [
                        { required: true, message: '请填写公司所在领域', trigger: 'blur' }
                    ],
                    scale: [
                        { required: true, message: '请填写公司人数规模', trigger: 'blur' }
                    ],
                    phase: [
                        {required: true, message: '请填写公司所处发展阶段', trigger: 'blur' }
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
                nebPay.call(to, Unit.toBasic(0.001), 'createJob', args, {
                    listener: (data) => {
                        if (typeof data === 'object') {
                            // todo
                        } else {
                            this.$Modal.error({
                                title: '创建失败',
                                content: '交易被取消，职位发布失败'
                            });
                        }
                        this.loading = false;
                    }
                });
            }
        }
    };
</script>