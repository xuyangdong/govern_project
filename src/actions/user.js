import { actionNames } from "action-utils";
import config from "../config";
import _ from "lodash";
import { notification } from 'antd'

export const GET_PHONE_CODE = 'GET_PHONE_CODE'
export const getPhoneCode = (phone) => {
    let formData = new FormData()
    formData.append('mobile', phone)
    return dispatch => {
        return fetch(config.api.user.getPhoneCode, {
            method:'POST',
            body: formData,
            headers: {
                'Authorization': sessionStorage.getItem('accessToken')
            }
        }).then(res => res.json()).then(res => {
            if (res.status === 1) {
                console.log(res);
                return true
            } else {
                notification.error({
                    message: '失败',
                    description: res.errorMes
                })
                return false
            }
        })
    }
}

export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const register = (formData) => {
    return dispatch => {
        return fetch(config.api.user.register, {
            method:'POST',
            body: formData,
            headers: {
                'Authorization': sessionStorage.getItem('accessToken')
            }
        }).then(res => res.json()).then(res => {
            if (res.status === 1) {
                console.log(res);
                notification.success({
                    message: '成功',
                    description: '注册成功'
                })
                return true
            } else {
                notification.error({
                    message: '失败',
                    description: res.errorMes
                })
                return false
            }
        })
    }
}

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const login = (user,password) => {
    return dispatch => {
        let formData = new FormData()
        formData.append('mobile', user)
        formData.append('password', password)
        return fetch(config.api.user.login, {
            method:'POST',
            body: formData
        }).then(res => res.json()).then(res => {
            if (res.status === 1) {
                sessionStorage.setItem('accessToken', res.obj.accessToken)
                sessionStorage.setItem('info', JSON.stringify(res.obj.userBase))
                dispatch({
                    type: LOGIN_SUCCESS,
                    isLogin: true,
                    info: res.obj.userBase
                })
                return true
            } else {
                notification.error({
                    message:'失败',
                    description: res.errorMes
                })
                return false
            }
        })
    }
}

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const logout = () => {
    return dispatch => {
        return fetch(config.api.user.logout, {
            method:'POST',
            headers: {
                'Authorization': sessionStorage.getItem('accessToken')
            }
        }).then(res => res.json()).then(res => {
            if (res.status === 1) {
                sessionStorage.removeItem('accessToken')
                sessionStorage.removeItem('info')
                dispatch({
                    type: LOGOUT_SUCCESS,
                    isLogin: false,
                })
                return true
            } else {
                notification.error({
                    message:'失败',
                    description: res.errorMes
                })
                return false
            }
        })
    }
}
