import React from 'react';
import 'common.scss'
import { Provider } from 'react-redux'
import { HashRouter, Route, Link } from 'react-router-dom'
import BaseContainer from './containers/BaseContainer'

export default class WrapperComponent extends React.Component {
    render() {
        const { store } = this.props
        return (
            <Provider store={store}>
              <HashRouter>
                <div>
                  <Route path="/" component={BaseContainer} />
                </div>
              </HashRouter>
            </Provider>
        )
    }
}
