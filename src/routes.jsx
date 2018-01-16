import React from 'react'
import Bundle from './components/common/Bundle'
import BaseContainer from './containers/BaseContainer'
import AllFeatures from 'bundle-loader?lazy!./components/common/AllFeatures'
import HomeContainer from 'bundle-loader?lazy!./containers/home/HomeContainer'
import ContentContainer from 'bundle-loader?lazy!./containers/content/ContentContainer'
import ListContainer from 'bundle-loader?lazy!./containers/content/ListContainer'
import SearchResultContainer from 'bundle-loader?lazy!./containers/content/SearchResultContainer'
import CommitteeContainer from 'bundle-loader?lazy!./containers/committee/CommitteeContainer'
import LeaveMessageContainer from 'bundle-loader?lazy!./containers/message/LeaveMessageContainer'
import SearchReportContainer from 'bundle-loader?lazy!./containers/report/SearchReportContainer'
import ReportDetailContainer from 'bundle-loader?lazy!./containers/report/ReportDetailContainer'
import ShopfrontContainer from 'bundle-loader?lazy!./containers/shopfront/ShopfrontContainer'
import PDFJSComponent from 'bundle-loader?lazy!./components/PDFJSComponent'
import ReactCanvasComponent from 'bundle-loader?lazy!./components/ReactCanvasComponent'

import TestComponent from './components/modal/TestComponent'

const Loading = () => (<div>Loading...</div>)

const createComponent = (component, contentName) => (props) => (
    <Bundle load={component}>
        {
            (Comp) => (Comp ? <Comp contentName={contentName} {...props}/> : <Loading />)
        }
    </Bundle>
)

const routes = [
    {
        path: '/',
        component: BaseContainer,
        routes: [{
                path: '/',
                exact: true,
                component: createComponent(HomeContainer)
            },{
                path: '/all_features',
                name: '全部功能',
                component: createComponent(AllFeatures)
            },{
                path: '/center_intro',
                name: '中心简介 > 中心概况',
                component: createComponent(ContentContainer, '中心概况')
            },{
                path: '/center_law',
                name: '中心简介 > 法律地位',
                component: createComponent(ContentContainer, '法律地位')
            },{
                path: '/center_certificate',
                name: '中心简介 > 授权证书',
                component: createComponent(ContentContainer, '授权证书')
            },{
                path: '/center_facility',
                name: '中心简介 > 重点设备',
                component: createComponent(ListContainer, '重点设备')
            },{
                path: '/center_address',
                name: '中心简介 > 地理位置',
                component: createComponent(ContentContainer, '地理位置')
            },{
                path: '/inspect_119',
                name: '检验范围 > 火灾报警产品',
                component: createComponent(ListContainer, '火灾报警产品')
            },{
                path: '/inspect_protect',
                name: '检验范围 > 火灾防护产品',
                component: createComponent(ListContainer, '火灾防护产品')
            },{
                path: '/inspect_outfire',
                name: '检验范围 > 灭火设备产品',
                component: createComponent(ListContainer, '灭火设备产品')
            },{
                path: '/inspect_equipment',
                name: '检验范围 > 消防装备产品',
                component: createComponent(ListContainer, '消防装备产品')
            },{
                path: '/inspect_3c',
                name: '检验范围 > 非3C认证产品',
                component: createComponent(ListContainer, '非3C认证产品')
            },{
                path: '/search/:keyword',
                name: '搜索结果',
                component: createComponent(SearchResultContainer)
            },{
                path: '/contact',
                name: '联系电话',
                component: createComponent(ContentContainer, '联系电话')
            },{
                path: '/notification',
                name: '通知公告',
                component: createComponent(ListContainer, '通知公告')
            },{
                path: '/trends',
                name: '行业动态',
                component: createComponent(ListContainer, '行业动态')
            },{
                path: '/imgNews',
                name: '图片新闻',
                component: createComponent(ListContainer, '图片新闻')
            },{
                path: '/law',
                name: '法律法规',
                component: createComponent(ListContainer, '法律法规')
            },{
                path: '/committee_one_work',
                name: '技术委员会 > 一分委工作动态',
                component: createComponent(ListContainer, '一分委工作动态')
            },{
                path: '/committee_two_work',
                name: '技术委员会 > 二分委工作动态',
                component: createComponent(ListContainer, '二分委工作动态')
            },{
                path: '/committee_three_work',
                name: '技术委员会 > 三分委工作动态',
                component: createComponent(ListContainer, '三分委工作动态')
            },{
                path: '/committee_eight_work',
                name: '技术委员会 > 八分委工作动态',
                component: createComponent(ListContainer, '八分委工作动态')
            },{
                path: '/committee_iso_work',
                name: '技术委员会 > ISO/TC21/SC6工作动态',
                component: createComponent(ListContainer, 'ISO/TC21/SC6工作动态')
            },{
                path: '/committee_one',
                name: '技术委员会 > 一分委',
                component: createComponent(CommitteeContainer, '一分委')
            },{
                path: '/committee_two',
                name: '技术委员会 > 二分委',
                component: createComponent(CommitteeContainer, '二分委')
            },{
                path: '/committee_three',
                name: '技术委员会 > 三分委',
                component: createComponent(CommitteeContainer, '三分委')
            },{
                path: '/committee_eight',
                name: '技术委员会 > 八分委',
                component: createComponent(CommitteeContainer, '八分委')
            },{
                path: '/committee_iso',
                name: '技术委员会 > ISO/TC21/SC6',
                component: createComponent(CommitteeContainer, 'ISO')
            },{
                path: '/leave_message',
                name: '公众留言',
                component: createComponent(LeaveMessageContainer)
            },{
                path: '/search_report',
                exact: true,
                name: '检验报告查询',
                component: createComponent(SearchReportContainer)
            },{
                path: '/search_report/:id',
                hasProps: '/search_report',
                name: '检验报告详情',
                component: createComponent(ReportDetailContainer)
            },{
                path: '/content',
                exact: true,
                component: createComponent(ContentContainer)
            },{
                path: '/canvas',
                component: createComponent(ReactCanvasComponent)
            },{
                path: '/pdf',
                component: createComponent(PDFJSComponent)
            },{
                path: '/test',
                component: TestComponent
            }
        ]
    }
]

export default routes
