import request from '@/common/request'


// 登录
export function getUser() {
    return request({
        url: '/user/list',
        method: 'get',
    })
}

// 条件查询
export function getByParams(data) {
    return request({
        url: '/user/getByParams',
        method: 'post',
        data: data
    })
}

// 通过id查询详情
export function getById(data) {
    return request({
        url: '/user/getById',
        method: 'post',
        data: data
    })
}

// 更新
export function update(data) {
    return request({
        url: '/user/update',
        method: 'post',
        data: data
    })
}

//  添加
export function updateStatus(data) {
    return request({
        url: '/user/updateStatus',
        method: 'post',
        data: data
    })
}

//  删除
export function del(data) {
    return request({
        url: '/user/delete',
        method: 'post',
        data: data
    })
}

//  添加
export function insert(data) {
    return request({
        url: '/user/create',
        method: 'post',
        data: data
    })
}

