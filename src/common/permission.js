import sxpRoutes from "@/router"
import {getToken} from "@/common/auth";

sxpRoutes.beforeEach((to, from, next) => {
    const token = getToken("token")
    if (token) {
        if (to.path === "/login") {
            next('/')
        } else {
            next()
        }
    } else {
        if (to.path === '/login') {
            next()
        } else {
            alert("请先登录")
            next('/login')
        }

    }
})
