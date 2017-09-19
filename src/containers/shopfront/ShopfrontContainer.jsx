import React from 'react'
import styles from './ShopfrontContainer.scss'

export default class ShopfrontContainer extends React.Component {
	render(){
		return (
			<div className={styles.container}>
				<div className={styles.partWrapper} style={{width:300}}>asdfasd</div>
				<div className={styles.partWrapper} style={{width:600}}>asdfasd</div>
				<div className={styles.partWrapper} style={{width:500}}>asdfasd</div>
				<div className={styles.partWrapper} style={{width:400}}>asdfasd</div>
				<div className={styles.partWrapper} style={{width:200}}>asdfasd</div>
				<div className={styles.partWrapper} style={{width:700}}>asdfasd</div>
			</div>
		)
	}
}
