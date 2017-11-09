import { actionNames } from "action-utils";
import config from "../config";
import _ from "lodash";
import { notification } from 'antd'

export const GET_COMMITTEE_INFO = actionNames('GET_COMMITTEE_INFO');
export function getCommitteeInfo(id) {
    return dispatch => {
        return fetch(config.api.committee.getById(id), {
            method: 'GET',
        }).then(res => res.json()).then(res => {
            if (res.status === 1) {
                dispatch({
                    type: GET_COMMITTEE_INFO[1],
                    payload: res.obj
                })
                return true
            } else {
                notification.error({
                    message: '失败',
                    description: '服务器错误，获取技术委员会信息失败'
                })
                return false
            }
        })
    }
}
