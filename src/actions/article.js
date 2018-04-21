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

export const GET_RECOMMEND_ARTICLE = actionNames('GET_RECOMMEND_ARTICLE');
export function getRecommendArticle() {
    return dispatch => {
        return fetch(config.api.article.getRecommend, {
            method: 'GET',
        }).then(res => res.json()).then(res => {
            if (res.status === 1) {
                dispatch({
                    type: GET_RECOMMEND_ARTICLE[1],
                    payload: res.obj
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
                return res.obj
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

export const CLEAR_ARTICLE_LIST_BY_CATEGORY = 'CLEAR_ARTICLE_LIST_BY_CATEGORY'
export function clearArticleListByCategory() {
    return dispatch => {
        dispatch({
            type: CLEAR_ARTICLE_LIST_BY_CATEGORY,
        })
    }
}

export const GET_CATEGORY = actionNames('GET_CATEGORY');
export function getCategory() {
    return (dispatch, getState) => {
        return fetch(config.api.category.get, {
            method: 'GET',
        }).then(res => res.json()).then(res => {
            dispatch({
                type: GET_CATEGORY[1],
                payload: res
            })
        })
    }
}

export const SET_DETAIL_ID = 'SET_DETAIL_ID';
export function setDetailId(id) {
    return (dispatch) => {
        dispatch({
            type: SET_DETAIL_ID,
            payload: {
                id,
            }
        })
    }
}


export const SEARCH_ARTICLE = 'SEARCH_ARTICLE'
export const searchArticle = (formData) => {
    return dispatch => {
        return fetch(config.api.article.search, {
            method:'POST',
            body: formData,
        }).then(res => res.json()).then(res => {
            if (res.status === 1) {
                dispatch({
                    type: SEARCH_ARTICLE,
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
