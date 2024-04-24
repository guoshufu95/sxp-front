import request from '@/common/request'


// 登录
export function login(data) {
    return request({
        url: '/login',
        method: 'post',
        data: data
    })
}
