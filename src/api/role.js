import request from '@/common/request'


// 获取角色列表
export function roleList() {
    return request({
        url: '/role/list',
        method: 'get',
    })
}

// 角色列表条件查询
export function getRoleByParams(data) {
    return request({
        url: '/role/getRoleByParams',
        method: 'post',
        data:data
    })
}

// 添加角色
export function addRole(data) {
    return request({
        url: '/role/create',
        method: 'post',
        data:data
    })
}

// 更新角色
export function updateRole(data) {
    return request({
        url: '/role/update',
        method: 'post',
        data:data
    })
}

// 通过id查询角色
export function getRoleById(data) {
    return request({
        url: '/role/getRoleById',
        method: 'post',
        data:data
    })
}

// 通过id查询角色
export function UpdateRoleStatus(data) {
    return request({
        url: '/role/updateRoleStatus',
        method: 'post',
        data:data
    })
}

// 通过id删除角色
export function deleteRole(data) {
    return request({
        url: '/role/delete',
        method: 'post',
        data:data
    })
}
