import { actionNames } from "action-utils";
import config from "../config";
import _ from "lodash";
import { notification } from 'antd'

export const GET_REPORT_LIST = actionNames('GET_REPORT_LIST');
export function getReportList() {
    return dispatch => {
        return fetch(config.api.report.getReportList, {
            method: 'GET',
        }).then(res => res.json()).then(res => {
            if (res.status === 1) {
                dispatch({
                    type: GET_REPORT_LIST[1],
                    payload: res.obj
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

export const GET_REPORT_DETAIL = actionNames('GET_REPORT_DETAIL');
export function getReportDetail(id) {
    return dispatch => {
        return fetch(config.api.report.getReportDetail(id), {
            method: 'GET',
        }).then(res => res.json()).then(res => {
            if (res.status === 1) {
                dispatch({
                    type: GET_REPORT_DETAIL[1],
                    payload: res.obj
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

export const SEARCH_REPORT = 'SEARCH_REPORT'
export const searchReport = (formData) => {
    return dispatch => {
        return fetch(config.api.report.search, {
            method:'POST',
            body: formData,
        }).then(res => res.json()).then(res => {
            if (res.status === 1) {
                dispatch({
                    type: SEARCH_REPORT,
                    payload: res.obj
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
