import { Map, List } from 'immutable'
import { SEARCH_ARTICLE, SET_DETAIL_ID, GET_ARTICLE_LIST_BY_CATEGORY, GET_ARTICLE_LIST, GET_ARTICLE_DETAIL, GET_ARTICLE_BY_CATEGORY, GET_CATEGORY } from '../actions/article'

const initialState = Map({
    category: List([]),
    articleList: List([]),
    articleDetail: {},
    articleByCategory: [],
    articleListByCategory: [],
    searchResult: [],
    hasDetailId: -1
})

const article = (state = initialState, action) => {
    let list = []
    switch (action.type) {
        case GET_CATEGORY[1]:
            list = action.payload.obj
            list.sort((a, b) => a.id - b.id)
            const cate = list.map(l => ({key: l.id, id: l.id, name: l.name}))
            return state.set('category', List(cate))
        case GET_ARTICLE_LIST[1]:
            list = action.payload.obj.map(o => ({key: o.articleId, isTop: o.isTop, isRed: o.isRed, title: o.title, publishTime: o.publishTime, source: o.source, categoryId: o.categoryId}))
            return state.set('articleList', List(list))
        case GET_ARTICLE_DETAIL[1]:
            return state.set('articleDetail', action.payload)
        case GET_ARTICLE_BY_CATEGORY[1]:
            return state.set('articleByCategory', action.payload)
        case GET_ARTICLE_LIST_BY_CATEGORY[1]:
            return state.set('articleByCategory', action.payload)
        case SET_DETAIL_ID:
            return state.set('hasDetailId', action.payload.id)
        case SEARCH_ARTICLE:
            return state.set('searchResult', action.payload)
    default:
        return state
    }
}

export default article
