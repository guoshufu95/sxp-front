import request from '@/common/request'

// 任务列表
export function taskList(data) {
    return request({
        url: '/task/list',
        method: 'post',
        data:data
    })
}

// 条件查询任务
export function addTask(data) {
    return request({
        url: '/task/create',
        method: 'post',
        data:data
    })
}

// id返回详情
export function getById(data) {
    return request({
        url: '/task/getById',
        method: 'post',
        data:data
    })
}

// 根据id删除
export function deleteById(data) {
    return request({
        url: '/task/deleteById',
        method: 'post',
        data:data
    })
}

// 查询任务
export function getTasksByParam(data) {
    return request({
        url: '/task/getByParam',
        method: 'post',
        data:data
    })
}

// 更新任务
export function updateTask(data) {
    return request({
        url: '/task/update',
        method: 'post',
        data:data
    })
}


