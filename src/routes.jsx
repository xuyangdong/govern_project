import React from 'react'
import {Router, Route, hashHistory} from 'react-router'
import BaseContainer from './containers/BaseContainer'
import App from './App'
import ReactCanvasComponent from './components/ReactCanvasComponent'
import ShopfrontContainer from './containers/shopfront/ShopfrontContainer'

const routes = (
	<Router history={hashHistory}>
		<Route path="/" component={BaseContainer}>
			<Route path="index" component={ShopfrontContainer} />
			<Route path="app" component={App} />
			<Route path="pdf" component={ReactCanvasComponent} />
		</Route>
	</Router>
)

export default routes
