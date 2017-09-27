import React from 'react'
import styles from './HomeContainer.scss'

class HomeContainer extends React.Component {
	render() {
		return (
			<div className={styles.container}>
                <div className={styles.topImg}>
                    <img alt="top image" src=""/>
                    <div className={styles.slogan}>
                        提高质量，关注消防
                        <br/>
                        Improve quality, pay attention to fire fighting
                    </div>
                    <div className={styles.queryReport}>

                    </div>
                </div>
			</div>
		)
	}
}

export default HomeContainer
