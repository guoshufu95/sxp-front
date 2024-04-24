import request from '@/common/request'


// 登录
export function getDepts() {
    return request({
        url: '/dept/list',
        method: 'get',
    })
}

// 部门列表
export function getDeptList() {
    return request({
        url: '/dept/list',
        method: 'get',
    })
}

// 通过id查询详情
export function getDeptById(data) {
    return request({
        url: '/dept/getDeptById',
        method: 'post',
        data:data
    })
}

// 条件查询
export function deptByParams(data) {
    return request({
        url: '/dept/getDeptByParams',
        method: 'post',
        data:data
    })
}

// 添加
export function insert(data) {
    return request({
        url: '/dept/insert',
        method: 'post',
        data:data
    })
}

// 编辑
export function update(data) {
    return request({
        url: '/dept/update',
        method: 'post',
        data:data
    })
}

// 删除
export function del(data) {
    return request({
        url: '/dept/delete',
        method: 'post',
        data:data
    })
}
