import { actionNames } from "action-utils";
import config from "../config";
import _ from "lodash";
import { notification } from 'antd'

export const GET_MESSAGE_LIST = actionNames('GET_MESSAGE_LIST');
export function getMessageList(page, pageSize) {
    return dispatch => {
        return fetch(config.api.message.getMessageByPage, {
        // return fetch(config.api.message.getMessageByPage(page, pageSize), {
            method: 'GET',
            headers: {
                'Authorization': sessionStorage.getItem('accessToken')
            }
        }).then(res => res.json()).then(res => {
            if (res.status === 1) {
                dispatch({
                    type: GET_MESSAGE_LIST[1],
                    // 已通过：1 已驳回：2 待审核：0
                    payload: res.obj.filter(m => m.pass === 1)
                })
            } else {
                notification.error({
                    message: '失败',
                    description: res.errorMes
                })
            }
            return true
        })
    }
}

export const GET_CAPTCHA = actionNames('GET_CAPTCHA');
export function getCaptcha(page, pageSize) {
    return dispatch => {
        return fetch(config.api.message.getCaptcha, {
            method: 'GET',
            headers: {
                'Authorization': sessionStorage.getItem('accessToken')
            }
        }).then(res => res.blob()).then(res => {
            if (res) {
                dispatch({
                    type: GET_CAPTCHA[1],
                    payload: res
                })
            } else {
                notification.error({
                    message: '失败',
                    description: res.errorMes
                })
            }
            return true
        })
    }
}

export const LEAVE_MESSAGE = 'LEAVE_MESSAGE'
export const leaveMessage = (formData) => {
    return dispatch => {
        return fetch(config.api.message.leaveMessage, {
            method:'POST',
            body: formData,
            credentials: 'include',
            headers: {
                'Authorization': sessionStorage.getItem('accessToken')
            }
        }).then(res => res.json()).then(res => {
            if (res.status === 1) {
                console.log(res);
                notification.success({
                    message: '成功',
                    description: '发布成功'
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
