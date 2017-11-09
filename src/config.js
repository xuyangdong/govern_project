import _ from 'lodash'

// export const baseURL = "http://47.93.242.215:8927/manage"
export const baseURL = "http://47.93.242.215:8927"

const isProduction = process.env.NODE_ENV === "production"

const config = _.extend({
	// common config
	debug: !isProduction,
},{
	// dev config
	api:{
        category: {
            get: `${baseURL}/user/category/selectAllCategory`
        },
		article: {
			getListByCategory: (categoryId) => `${baseURL}/user/article/selectArticleInfoByCategoryId?categoryId=${categoryId}`,
			getByCategory: (categoryId) => `${baseURL}/user/article/selectArticleByCategoryId?categoryId=${categoryId}`,
			getById: (id) => `${baseURL}/user/article/selectArticleById?id=${id}`,
		},
		committee: {
			getById: (id) => `${baseURL}/btc/btc/selectBtcById?id=${id}`,
		}
    }
})

export default config
