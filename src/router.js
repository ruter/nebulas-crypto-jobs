const routers = [{
    path: '/',
    meta: {
        title: 'CryptoJobs'
    },
    component: (resolve) => require(['./views/index.vue'], resolve)
}, {
    path: '/create',
    meta: {
        title: '发布职位'
    },
    component: (resolve) => require(['./views/create.vue'], resolve)
}, {
    path: '/carousel',
    meta: {
        title: '首页轮播'
    },
    component: (resolve) => require(['./views/carousel.vue'], resolve)
}, {
    path: '/account',
    meta: {
        title: '个人中心'
    },
    component: (resolve) => require(['./views/account.vue'], resolve)
}, {
    path: '/about',
    meta: {
        title: '关于'
    },
    component: (resolve) => require(['./views/about.vue'], resolve)
}];
export default routers;