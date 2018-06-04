<style scoped>
    .index {
        width: 100%;
    }
    .carousel-item {
        height: 320px;
        text-align: center;
        background-color: #DEDEDE;
    }
    .carousel-item p {
        color: #fff;
        font-size: xx-large;
        line-height: 10;
    }
    .job-title a {
        font-size: large;
    }
    .job-req {
        color: #777;
        font-style: normal;
    }
    .job-bg-gray {
        background-color: #fafafa;
    }
    .job-cell {
        padding: 8px;
    }
</style>
<template>
    <div class="index" style="min-height: 640px;">
        <!--<Row type="flex" justify="center" align="middle">-->
            <!--<Col span="12">-->
                <!--<div class="mb32" style="text-align: center">-->
                    <!--<Input v-model="keyword" size="large" placeholder="请输入要查找的打卡目标唯一 ID...">-->
                        <!--<Button slot="append" @click.native="handleSearchClick">搜索</Button>-->
                    <!--</Input>-->
                <!--</div>-->
            <!--</Col>-->
        <!--</Row>-->
        <Row type="flex" justify="center" align="middle" class="mb32">
            <Col span="12">
                <Carousel autoplay :autoplay-speed="2500" loop>
                    <CarouselItem v-for="carousel in carousels" :key="carousel.hash">
                        <div class="carousel-item">
                            <a :href="carousel.link" target="_blank">
                                <img :src="carousel.image">
                            </a>
                        </div>
                    </CarouselItem>
                    <CarouselItem v-for="idx in (6 - carousels.length)" :key="idx">
                        <div class="carousel-item">
                            <p>虚位以待</p>
                        </div>
                    </CarouselItem>
                </Carousel>
            </Col>
        </Row>
        <Row type="flex" justify="center" align="middle" class="mb32">
            <Col span="12">
                <div class="text-center">
                    <h2>当前共有 <span style="color: #0095ff;">{{ total }}</span> 个职位</h2>
                </div>
            </Col>
        </Row>
        <Row type="flex" justify="center" align="middle" v-for="(job, idx) in jobs" :key="job.hash">
            <Col span="12" class="job-cell" :class="{'job-bg-gray': idx % 2 != 0}">
                <Row type="flex">
                    <Col span="12">
                        <div class="job-title">
                            <a :href="job.link" target="_blank">{{ job.title }}</a>
                            &nbsp;
                            <span>[{{ job.location }}]</span>
                        </div>
                        <span class="mr8"><em class="job-req">月薪： </em>{{ job.salary }}</span>
                        <span class="mr8"><em class="job-req">经验：</em> {{ job.exp }}</span>
                        <span class="mr8"><em class="job-req">学历： </em>{{ job.edu }}</span>
                        <br>
                        <span>{{ job.datetime }}</span>
                    </Col>
                    <Col span="12">
                        <div class="job-title">
                            <a :href="job.website" target="_blank">{{ job.company }}</a>
                        </div>
                        <span class="mr8"><em class="job-req">领域：</em> {{ job.domain }}</span>
                        <span class="mr8"><em class="job-req">创始人：</em>XXX</span>
                        <br>
                        <span class="mr8"><em class="job-req">阶段：</em> {{ job.phase }}</span>
                        <span class="mr8"><em class="job-req">规模：</em>{{ job.scale }}</span>
                    </Col>
                </Row>
            </Col>
        </Row>

        <Row type="flex" justify="center" align="middle" v-if="total > limit">
            <Col span="12">
                <Page :total="total" :current="page" :page-size="limit" @change="handlePageChange"></Page>
            </Col>
        </Row>
        <Spin size="large" fix v-if="loading"></Spin>
    </div>
</template>
<script>
    import util from '../libs/util';
    import {Neb, HttpRequest} from 'nebulas';

    let neb = new Neb();
    neb.setRequest(new HttpRequest(util.ChainHost));

    let nebApi = neb.api;

    export default {
        data() {
            return {
                chain_id: null,
                keyword: '',
                carousels: [],
                jobs: [],
                page: 1,
                limit: 10,
                total: 0,
                loading: true
            }
        },
        created() {
            nebApi.getNebState().then((state) => {
                this.chain_id = state.chain_id;
                this.getJobs();
                this.getCarousels();
            });
        },
        methods: {
            getJobs() {
                let to = util.getContractAddress(),
                    args = util.toSting([this.page, this.limit])
                nebApi.call({
                    chainID: this.chain_id,
                    from: to,
                    to: to,
                    value: 0,
                    gasPrice: 1000000,
                    gasLimit: 2000000,
                    contract: {
                        'function': 'getJobs',
                        args: args
                    }
                }).then((resp) => {
                    let data = util.parse(resp.result);
                    this.jobs = data.jobs;
                    this.total = data.size;
                    this.loading = false;
                });
            },
            getCarousels() {
                let to = util.getContractAddress();
                nebApi.call({
                    chainID: this.chain_id,
                    from: to,
                    to: to,
                    value: 0,
                    gasPrice: 1000000,
                    gasLimit: 2000000,
                    contract: {
                        'function': 'getCarousel',
                        args: '[]'
                    }
                }).then((resp) => {
                    this.carousels = util.parse(resp.result);
                });
            },
            handlePageChange(page) {
                this.loading = true;
                this.page = page;
                this.getJobs();
            }
        }
    };
</script>