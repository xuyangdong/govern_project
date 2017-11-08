import _ from 'lodash'

// export const baseURL = "http://47.93.242.215:8927/manage"
export const baseURL = "http://47.93.242.215:8927/user"

const isProduction = process.env.NODE_ENV === "production"

const config = _.extend({
	// common config
	debug: !isProduction,
},{
	// dev config
	api:{
        category: {
            get: `${baseURL}/category/selectAllCategory`
        },
		article: {
			getListByCategory: (categoryId) => `${baseURL}/article/selectArticleInfoByCategoryId?categoryId=${categoryId}`,
			getByCategory: (categoryId) => `${baseURL}/article/selectArticleByCategoryId?categoryId=${categoryId}`,
			getById: (id) => `${baseURL}/article/selectArticleById?id=${id}`,
		}
    }
})

export default config
