import React from 'react'
import Bundle from './components/common/Bundle'
import BaseContainer from './containers/BaseContainer'
import ShopfrontContainer from 'bundle-loader?lazy!./containers/shopfront/ShopfrontContainer'
import PDFJSComponent from 'bundle-loader?lazy!./components/PDFJSComponent'
import ReactCanvasComponent from 'bundle-loader?lazy!./components/ReactCanvasComponent'

const Loading = () => (<div>Loading...</div>)

const createComponent = (component) => () => (
    <Bundle load={component}>
        {
            (Comp) => (Comp ? <Comp /> : <Loading />)
        }
    </Bundle>
)

const routes = [
    {
        path: '/',
        exact: true,
        component: BaseContainer,
        routes: [
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
