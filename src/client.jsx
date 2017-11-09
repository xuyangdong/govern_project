import React from 'react';
import 'common.scss'
import { Provider } from 'react-redux'
import { HashRouter as Router, Route, Link } from 'react-router-dom'
import BaseContainer from './containers/BaseContainer'
import Children from './components/common/SubRoutes'
import routes from './routes'

export default class WrapperComponent extends React.Component {
    render() {
        const { store } = this.props
        return (
            <Provider store={store}>
                <Router>
                    <Children routes={routes} />
                </Router>
            </Provider>
        )
    }
}
