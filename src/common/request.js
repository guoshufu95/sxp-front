import axios from 'axios'
import store from "@/store";
import {Message} from 'element-ui'
import {delToken, getToken} from "@/common/auth";

//create an axios instance
const service = axios.create({
    baseURL: "/sxp", // url = base url + request url
    timeout: 3000000 // request timeout
})

// request拦截器
service.interceptors.request.use(
    config => {
        if (store.getters.token) {
            config.headers['token'] = 'Bearer ' + getToken("token")
            config.headers['Content-Type'] = 'application/json'
        }
        return config
    },
    error => {
        console.log(error)
        return Promise.reject(error)
    }
)

// response拦截器
service.interceptors.response.use(
    response => {

        const code = response.status
        if (code !== 200) {
            return Promise.reject(response.data.error())
        } else {

            return response.data
        }
    },
    error => {
        console.log("error: ", error.response.data)
        if (error.response.data.code !== 500) {
            if (error.response.data.code === 401) {
                delToken("token")
                window.location.href = '/login';
            } else {
                return error.response
            }
        } else {
            Message({
                message: '服务器内部错误',
                type: 'error',
                duration: 5 * 1000
            })
            return Promise.reject("error")
        }
    }
)

export default service
