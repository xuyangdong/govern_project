import _ from 'lodash'

// export const baseURL = "http://47.93.242.215:8927/manage"
export const baseURL = "http://47.93.242.215:8928"

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
			search: `${baseURL}/user/article/fuzzySearchArticle`,
            getRecommend: `${baseURL}/user/article/getRecommendArticle`
		},
		committee: {
			getById: (id) => `${baseURL}/btc/btc/selectBtcById?id=${id}`,
		},
		user: {
			getPhoneCode: `${baseURL}/user/user/getRegisterVerifyCode`,
			register: `${baseURL}/user/user/register`,
			login: `${baseURL}/user/user/login`,
			logout: `${baseURL}/user/user/logout`,
			updatePassword: `${baseURL}/user/user/updatePassword`,
			findPassword: `${baseURL}/user/user/retrievePassword`
		},
		enterprise: {
			getEnterprise: `${baseURL}/user/enterprise/getEnterprise`,
			getEnterpriseById: (id) => `${baseURL}/user/enterprise/getEnterpriseById?id=${id}`,
			publicLogin: `${baseURL}/user/enterprise/userLogin`,
			privateLogin: `${baseURL}/user/enterprise/enterpriseLogin`,
			publicPassword: `${baseURL}/user/enterprise/modifyPassword`,
			privatePassword: `${baseURL}/user/enterprise/modifyInnerPassword`,
		},
		message: {
			getCaptcha: `${baseURL}/user/leaveMessage/getCaptcha`,
			leaveMessage: `${baseURL}/user/leaveMessage/insertLeaveMessage`,
			getMessageByPage: `${baseURL}/user/leaveMessage/selectAllLeaveMessageByPage`
			// getMessageByPage: (page, pageSize) => `${baseURL}/user/leaveMessage/selectAllLeaveMessageByPage?page=${page}&pageSize=${pageSize}`
		},
        report: {
            getReportList: `${baseURL}/user/firstReportView/selectAllFirstReportViewByPage`,
            getInvalidReportList: `${baseURL}/user/invalidReportView/getAllInvalidReportView`,
            getReportDetail: (id) => `${baseURL}/user/secondReportView/selectById/${id}`,
            search: `${baseURL}/user/firstReportView/fuzzySearchFirstReportView`,
			reportFile: (id) => `${baseURL}/user/report/getReportFilePathById?id=${id}`,

            // getReportByPage: (page, pageSize) => `${baseURL}/user/reportInfo/selectAllReportInfoByPage?page=${page}&pageSize=${pageSize}`,
        }
    }
})

export default config
