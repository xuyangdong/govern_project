import React from 'react'
import styles from './ContentContainer.scss'
import reportIcon from 'publicRes/img/report.png'
import fireIcon from 'publicRes/img/fireicon.png'
import CommonButton from '../../components/common/Button'
import Breadthumb from '../../components/common/Breadthumb'
import ListContent from './ListContent'
import RightBlockContainer from './RightBlockContainer'

class ContentContainer extends React.Component {
    state = {
    }

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.breadthumb}><Breadthumb /></div>
                <div className={styles.content}>
                    <div className={styles.left}>
                        <ListContent />
                    </div>
                    <div className={styles.right}>
                        <RightBlockContainer></RightBlockContainer>
                    </div>
                </div>
            </div>
        )
    }
}

export default ContentContainer
