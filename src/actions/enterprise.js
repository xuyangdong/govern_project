import { actionNames } from "action-utils";
import config from "../config";
import _ from "lodash";
import { notification } from 'antd'

export const GET_ENTERPRISE = 'GET_ENTERPRISE'
export const getEnterprise = () => {
    return dispatch => {
        return fetch(config.api.enterprise.getEnterprise, {
            method: 'GET',
            headers: {
                'enterprise_common_authorization': sessionStorage.getItem('enterpriseAccessToken')
            }
        }).then(res => res.json()).then(res => {
            if (res.status === 1) {
                dispatch({
                    type: GET_ENTERPRISE,
                    payload: res.obj
                })
            }
            return res
        })
    }
}

export const GET_ENTERPRISE_BY_ID = 'GET_ENTERPRISE_BY_ID'
export const getEnterpriseById = (id) => {
    return dispatch => {
        return fetch(config.api.enterprise.getEnterpriseById(id), {
            method: 'GET',
            headers: {
                'enterprise_inner_authorization': sessionStorage.getItem('enterprisePrivateAccessToken')
            }
        }).then(res => res.json()).then(res => {
            if (res.status === 1) {
                dispatch({
                    type: GET_ENTERPRISE_BY_ID,
                    payload: res.obj
                })
            }
            return res
        })
    }
}

export const MODIFY_PUBLIC_PASSWORD = 'MODIFY_PUBLIC_PASSWORD'
export const modifyPublicPassword = (formData) => {
    return dispatch => {
        return fetch(config.api.enterprise.publicPassword, {
            method:'POST',
            headers: {
                'enterprise_inner_authorization': sessionStorage.getItem('enterprisePrivateAccessToken')
            },
            body: formData
        }).then(res => res.json()).then(res => {
            if (res.status === 1) {
                notification.success({
                    message:'修改成功',
                    description: res.errorMes
                })
                console.log(res);
                return true
            } else {
                notification.error({
                    message:'修改失败',
                    description: res.errorMes
                })
                return false
            }
        })
    }
}

export const MODIFY_PRIVATE_PASSWORD = 'MODIFY_PRIVATE_PASSWORD'
export const modifyPrivatePassword = (formData) => {
    return dispatch => {
        return fetch(config.api.enterprise.privatePassword, {
            method:'POST',
            headers: {
                'enterprise_inner_authorization': sessionStorage.getItem('enterprisePrivateAccessToken')
            },
            body: formData
        }).then(res => res.json()).then(res => {
            if (res.status === 1) {
                notification.success({
                    message:'修改成功',
                    description: res.errorMes
                })
                return true
            } else {
                notification.error({
                    message:'修改失败',
                    description: res.errorMes
                })
                return false
            }
        })
    }
}


export const ENTERPRISE_LOGIN_SUCCESS = 'ENTERPRISE_LOGIN_SUCCESS'
export const enterpriseLogin = (enterpriseName, password) => {
    return dispatch => {
        let formData = new FormData()
        formData.append('enterpriseName', enterpriseName)
        formData.append('password', password)
        return fetch(config.api.enterprise.publicLogin, {
            method:'POST',
            body: formData
        }).then(res => res.json()).then(res => {
            if (res.status === 1) {
                sessionStorage.setItem('enterpriseAccessToken', res.obj.accessToken)
                // sessionStorage.setItem('info', JSON.stringify(res.obj.userBase))
                // dispatch({
                //     type: LOGIN_SUCCESS,
                //     isLogin: true,
                //     info: res.obj.userBase
                // })
                console.log(res);
                return true
            } else {
                notification.error({
                    message:'登录失败',
                    description: res.errorMes
                })
                return false
            }
        })
    }
}

export const ENTERPRISE_PRIVATE_LOGIN_SUCCESS = 'ENTERPRISE_PRIVATE_LOGIN_SUCCESS'
export const enterprisePrivateLogin = (enterpriseName, innerPassword) => {
    return dispatch => {
        let formData = new FormData()
        formData.append('enterpriseName', enterpriseName)
        formData.append('innerPassword', innerPassword)
        return fetch(config.api.enterprise.privateLogin, {
            method:'POST',
            body: formData
        }).then(res => res.json()).then(res => {
            if (res.status === 1) {
                sessionStorage.setItem('enterprisePrivateAccessToken', res.obj.accessToken)
                // sessionStorage.setItem('info', JSON.stringify(res.obj.userBase))
                // dispatch({
                //     type: LOGIN_SUCCESS,
                //     isLogin: true,
                //     info: res.obj.userBase
                // })
                console.log(res);
                return true
            } else {
                notification.error({
                    message:'登录失败',
                    description: res.errorMes
                })
                return false
            }
        })
    }
}
