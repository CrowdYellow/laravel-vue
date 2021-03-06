import {
    fetch,
    post,
    put,
    patch,
    destroy
} from "./index";
import {
    FRONTEND_CAPTCHA,
    FRONTEND_VERIFICATION,
    FRONTEND_REGISTER,
    FRONTEND_SOCIALS_LOGIN,
    FRONTEND_LOGIN,
    FRONTEND_CURRENT,
    FRONTEND_TOPICS,
    FRONTEND_COMMENTS,
    FRONTEND_USER,
    FRONTEND_UPDATE_PASSWORD,
    FRONTEND_CATEGORY,
} from "./api";

// 获取分类列表
export  function getCategory() {
    return fetch(FRONTEND_CATEGORY);
}
// 获取图片验证码
export function getPicVerificationCodes(data) {
    return post(FRONTEND_CAPTCHA, data)
}
// 获取手机验证码
export function getPhoneVerificationCodes(data) {
    return post(FRONTEND_VERIFICATION, data)
}
// 用户注册
export function register(data) {
    return post(FRONTEND_REGISTER, data)
}
// 用户登录
export function login(data) {
    return post(FRONTEND_LOGIN, data)
}
// 获取登录用户信息
export function userInfo(token) {
    return fetch(FRONTEND_USER, {}, {
        Authorization: 'Bearer ' + token
    })
}
// 修改用户名
export function updateUsername(token, data) {
    return patch(FRONTEND_USER, data, {
        Authorization: 'Bearer ' + token
    })
}
// 修改密码
export function updatePassword(token, data) {
    return patch(FRONTEND_UPDATE_PASSWORD, data, {
        Authorization: 'Bearer ' + token
    })
}