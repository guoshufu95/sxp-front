import request from '@/common/request'

// 返回菜单列表
export function getMenus() {
    return request({
        url: '/menu/list',
        method: 'get',
    })
}

// 条件查询
export function getMenusByParam(data) {
    return request({
        url: '/menu/getMenusByParam',
        method: 'post',
        data:data
    })
}

// 更新菜单
export function createMenu(data) {
    return request({
        url: '/menu/create',
        method: 'post',
        data:data
    })
}


// 更新菜单
export function updateMenu(data) {
    return request({
        url: '/menu/update',
        method: 'post',
        data:data
    })
}

// 通过id获取菜单详情
export function getMenuById(data) {
    return request({
        url: '/menu/getMenuById',
        method: 'post',
        data: data
    })
}


// 删除菜单
export function deleteMenu(data) {
    return request({
        url: '/menu/delete',
        method: 'post',
        data:data
    })
}
