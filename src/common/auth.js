import Cookies from 'js-cookie'

//  从cookie获取token
export function getToken(key) {
    return Cookies.get(key)
}

// 设置token到cookie
export function setToken(key, token) {
    return Cookies.set(key, token, "0")
}

export function delToken(key, user) {
    return Cookies.remove(key, user)
}

export function setUser(key, user) {
    return Cookies.set(key, user)
}
