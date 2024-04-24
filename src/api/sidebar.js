import request from '@/common/request'

// 菜单列表
export function menus() {
    return request({
        url: '/menu/roleMenus',
        method: 'get',
    })
}
