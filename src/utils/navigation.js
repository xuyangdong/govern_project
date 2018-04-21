const navigation = [{
	title:'中心简介',
	link:'',
	children:[{
		title:'中心概况',
		path: ['中心简介', '中心概况'],
		link:'/center_intro'
	},{
		title:'法律地位',
		path: ['中心简介', '法律地位'],
		link:'/center_law'
	},{
		title:'授权证书',
		path: ['中心简介', '授权证书'],
		link:'/center_certificate'
	},{
		title:'重点设备',
		path: ['中心简介', '重点设备'],
		link:'/center_facility'
	},{
		title:'地理位置',
		path: ['中心简介', '地理位置'],
		link:'/center_address'
	}]
}, {
	title:'检验范围',
	link:'',
	children:[{
		title:'火灾报警产品',
		path: ['检验范围', '火灾报警产品'],
		link:'/inspect_119'
	},{
		title:'火灾防护产品',
		path: ['检验范围', '火灾防护产品'],
		link:'/inspect_protect'
	},{
		title:'灭火设备产品',
		path: ['检验范围', '灭火设备产品'],
		link:'/inspect_outfire'
	},{
		title:'消防装备产品',
		link:'/inspect_equipment'
	},{
		title:'非3C认证产品',
		link:'/inspect_3c'
	}]
}, {
	title:'认证专栏',
	link:'/certification'
}, {
	title:'新闻动态',
	link:'/trends'
}, {
	title:'公众留言',
	link:'/leave_message'
}, {
	title:'企业用户',
	link:'/enterprise_user'
}, {
	title:'更多功能',
	link:'/all_features'
}]

export default navigation
