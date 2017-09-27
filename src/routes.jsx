import React from 'react'
import Bundle from './components/common/Bundle'
import BaseContainer from './containers/BaseContainer'
import HomeContainer from 'bundle-loader?lazy!./containers/home/HomeContainer'
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
        routes: [
            {
                path: '/',
                exact: true,
                component: createComponent(HomeContainer)
            },
            {
                path: '/shop',
                component: createComponent(ShopfrontContainer)
            },
            {
                path: '/canvas',
                component: createComponent(ReactCanvasComponent)
            },
            {
                path: '/pdf',
                component: createComponent(PDFJSComponent)
            },
        ]
    }
]

export default routes
