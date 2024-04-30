import VueRouter from 'vue-router'
import Router from 'vue-router'
import login from "@/components/login/login.vue";
import home from "@/components/basic/home.vue";
import Vue from "vue";
import Sys from "@/components/sys/sys.vue";
import LocalUser from "@/components/user/localUser.vue";
import RemoteUser from "@/components/user/remoteUser.vue";
import LocalService from "@/components/service/localService.vue";
import localRole from "@/components/role/localRole.vue";
import remoteRole from "@/components/role/remoteRole.vue";
import localServerTask from "@/components/task/localServerTask.vue";
import localFrontTask from "@/components/task/localFrontTask.vue";
import mixTask from "@/components/task/delayTask.vue";
import remoteTask from "@/components/task/remoteTask.vue";
import localTest from "@/components/test/localTest.vue";
import remoteTest from "@/components/test/remoteTest.vue";
import mixTest from "@/components/test/mixTest.vue";
import Dept from "@/components/dept/index.vue";
import Menu from "@/components/menu/index.vue";

Vue.use(Router)

const routes = [
    {
        path: "/",
        redirect: "/home",
    },
    {
        path: "/home",
        name: "home",
        component: home,
        children: [
            {
                path: "sys",
                component: Sys
            },
            {
                path: "user/local",
                component: LocalUser
            },
            {
                path: "user/remote",
                component: RemoteUser
            },
            {
                path: "service/local",
                component: LocalService
            },
            {
                path: "service/remote",
                component: RemoteUser
            },
            {
                path: "role/local",
                component: localRole
            },
            {
                path: "role/remote",
                component: remoteRole
            },
            {
                path: "task/local/server",
                component: localServerTask
            },
            {
                path: "task/local/front",
                component: localFrontTask
            },
            {
                path: "task/delay",
                component: mixTask
            },
            {
                path: "task/remote",
                component: remoteTask
            },
            {
                path: "test/local",
                component: localTest
            },
            {
                path: "test/remote",
                component: remoteTest
            },
            {
                path: "test/mix",
                component: mixTest
            },
            {
                path: "dept",
                component: Dept
            },
            {
              path: "menu",
              component: Menu
            }
        ]
    },

    {
        path: "/login",
        name: "login",
        component: login
    },
]

const sxpRoutes = new VueRouter({
    mode: 'history',
    routes
})


export default sxpRoutes
