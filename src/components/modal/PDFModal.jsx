import React from 'react'
import { Modal } from 'antd'
import PropTypes from 'prop-types'
import styles from './PDFModal.scss'
import PDFJSComponent from '../PDFJSComponent'

class PDFModal extends React.Component {
    static propTypes = {
        visible: PropTypes.bool,
        onOk: PropTypes.func,
        onCancel: PropTypes.func,
        file: PropTypes.object,
    }

    render() {
        const { visible, onOk, onCancel, file } = this.props
        return (
            <Modal
                className={styles.container}
                title="检验报告详情"
                visible={visible}
                onOk={onOk}
                onCancel={onCancel}
                width={1000}
                footer={null}
            >
                <PDFJSComponent file={file} />
            </Modal>
        )
    }
}

export default PDFModal
