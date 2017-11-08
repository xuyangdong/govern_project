import { actionNames } from "action-utils";
import config from "../config";
import _ from "lodash";
import { notification } from 'antd'

export const GET_ARTICLE_LIST = actionNames('GET_ARTICLE_LIST');
export function getArticleList() {
    return dispatch => {
        return fetch(config.api.article.getAll, {
            method: 'GET',
        }).then(res => res.json()).then(res => {
            if (res.status === 1) {
                dispatch({
                    type: GET_ARTICLE_LIST[1],
                    payload: res
                })
            } else {
                notification.error({
                    message: '失败',
                    description: '服务器错误，获取文章列表失败'
                })
            }
            return true
        })
    }
}

export const GET_ARTICLE_DETAIL = actionNames('GET_ARTICLE_DETAIL');
export function getArticleDetail(id) {
    return dispatch => {
        return fetch(config.api.article.getById(id), {
            method: 'GET',
        }).then(res => res.json()).then(res => {
            if (res.status === 1) {
                dispatch({
                    type: GET_ARTICLE_DETAIL[1],
                    payload: res.obj
                })
                return true
            } else {
                notification.error({
                    message: '失败',
                    description: '服务器错误，获取文章详细内容失败'
                })
                return false
            }
        })
    }
}

export const GET_ARTICLE_BY_CATEGORY = actionNames('GET_ARTICLE_BY_CATEGORY');
export function getArticleByCategory(id) {
    return dispatch => {
        return fetch(config.api.article.getByCategory(id), {
            method: 'GET',
        }).then(res => res.json()).then(res => {
            if (res.status === 1) {
                dispatch({
                    type: GET_ARTICLE_BY_CATEGORY[1],
                    payload: res.obj
                })
                return true
            } else {
                notification.error({
                    message: '失败',
                    description: '服务器错误，获取文章失败'
                })
                return false
            }
        })
    }
}

export const GET_ARTICLE_LIST_BY_CATEGORY = actionNames('GET_ARTICLE_LIST_BY_CATEGORY');
export function getArticleListByCategory(id) {
    return dispatch => {
        return fetch(config.api.article.getListByCategory(id), {
            method: 'GET',
        }).then(res => res.json()).then(res => {
            if (res.status === 1) {
                dispatch({
                    type: GET_ARTICLE_LIST_BY_CATEGORY[1],
                    payload: res.obj
                })
                return true
            } else {
                notification.error({
                    message: '失败',
                    description: '服务器错误，获取文章列表失败'
                })
                return false
            }
        })
    }
}

export const GET_CATEGORY = actionNames('GET_CATEGORY');
export function getCategory() {
    return (dispatch, getState) => {
        const cache = getState().getIn(['article', 'category'])
        if (cache.size === 0) {
            return fetch(config.api.category.get, {
                method: 'GET',
            }).then(res => res.json()).then(res => {
                dispatch({
                    type: GET_CATEGORY[1],
                    payload: res
                })
            })
        } else {
            return cache
        }
    }
}
