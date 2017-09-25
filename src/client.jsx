import React from 'react';
import 'common.scss'
import { Provider } from 'react-redux'
import routes from './routes'

export default class WrapperComponent extends React.Component {
    render() {
        const { store } = this.props
        return (
            <Provider store={store}>{routes}</Provider>
        )
    }
}
