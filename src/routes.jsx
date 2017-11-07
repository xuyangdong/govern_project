import React from 'react'
import Bundle from './components/common/Bundle'
import BaseContainer from './containers/BaseContainer'
import HomeContainer from 'bundle-loader?lazy!./containers/home/HomeContainer'
import ContentContainer from 'bundle-loader?lazy!./containers/content/ContentContainer'
import ListContainer from 'bundle-loader?lazy!./containers/content/ListContainer'
import ShopfrontContainer from 'bundle-loader?lazy!./containers/shopfront/ShopfrontContainer'
import PDFJSComponent from 'bundle-loader?lazy!./components/PDFJSComponent'
import ReactCanvasComponent from 'bundle-loader?lazy!./components/ReactCanvasComponent'

const Loading = () => (<div>Loading...</div>)

const createComponent = (component) => (props) => (
    <Bundle load={component}>
        {
            (Comp) => (Comp ? <Comp {...props}/> : <Loading />)
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
                path: '/content',
                exact: true,
                component: createComponent(ContentContainer)
            },{
                path: '/canvas',
                component: createComponent(ReactCanvasComponent)
            },{
                path: '/pdf',
                component: createComponent(PDFJSComponent)
            },
        ]
    }
]

export default routes
