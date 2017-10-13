import React from 'react'
import styles from './Advertisement.scss'

class Advertisement extends React.Component {
    state = {
        speed: 16,
        statusX: 1,
        statusY: 1,
        x: 50,
        y: 50,
        WIDTH: 0,
        HEIGHT: 0,
        interval: null
    }

    constructor(props) {
        super(props)
        this.handleAnimation = this.handleAnimation.bind(this)
        this.handleRun = this.handleRun.bind(this)
        this.handlePause = this.handlePause.bind(this)
        this.handleResume = this.handleResume.bind(this)
        this.handleClose = this.handleClose.bind(this)
    }

    componentDidMount() {
        this.handleAnimation()
    }

    handleAnimation() {
        const ad = this.refs.advertisement
        const WIDTH =  document.documentElement.clientWidth - ad.offsetWidth
        const HEIGHT =  document.documentElement.clientHeight - ad.offsetHeight
        const interval = setInterval(this.handleRun, this.state.speed);
        this.setState({WIDTH, HEIGHT, interval})
    }

    handleRun() {
        let {statusX, statusY, x, y, WIDTH, HEIGHT} = this.state
        this.refs.advertisement.style.left = x + 'px';
        this.refs.advertisement.style.top = y + 'px';
        x = x + (statusX ? 1 : -1)
        y = y + (statusY ? 1 : -1)
        if (x < 0) { this.setState({statusX: 1}) }
        if (x > WIDTH) { this.setState({statusX: 0}) }
        if (y < 0) { this.setState({statusY: 1}) }
        if (y > HEIGHT) { this.setState({statusY: 0}) }
        this.setState({x, y})
    }

    handlePause() {
        clearInterval(this.state.interval)
    }

    handleResume() {
        const interval = setInterval(this.handleRun, this.state.speed)
        this.setState({interval})
    }

    handleClose() {
        this.refs.advertisement.style.display = 'none'
    }

    render() {
        return (
            <div ref="advertisement" className={styles.container} onMouseOver={this.handlePause} onMouseOut={this.handleResume}>
                <span className={styles.close} onClick={this.handleClose}>x</span>
                <div className={styles.news}>这是一条浮动新闻</div>
            </div>
        )
    }
}

export default Advertisement
