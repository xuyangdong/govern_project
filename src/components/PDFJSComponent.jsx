import React from 'react'
import {PDFJS} from 'pdfjs-dist'
import _ from 'lodash'
import PropTypes from 'prop-types'
import styles from './PDFJSComponent.scss'
import waterMask from 'publicRes/img/water-mask.png'

function paintWaterMask( canvas){
	let ctx = canvas.getContext('2d')
	let image = new Image()
	image.src = waterMask
	image.onload=function(){
		let height =  parseInt(canvas.style.height.slice(0,canvas.style.height.length-2))
		let width = parseInt(canvas.style.width.slice(0,canvas.style.width.length-2))
		ctx.translate(width/2,height/2)
        ctx.rotate(315*Math.PI/180);
		ctx.translate(-width/2,0)
	    ctx.globalAlpha=0.2;
        ctx.drawImage(image,20,0,width,image.height);
	}
}

export default class PDFJSComponent extends React.Component {
	constructor(){
		super()
		this.state = {
			pdf:{}
		}
	}
	componentWillReceiveProps(nextProps){
		let fileReader = new FileReader()
		fileReader.onload = e => {
			let base64 = e.target.result
			let loadingTask = PDFJS.getDocument({data:atob(base64.split(',')[1])})
			loadingTask.then(pdf => {
				console.log(pdf)
				this.setState({
					pdf:pdf,
				})
			})
		}
		if(nextProps.file){
			fileReader.readAsDataURL(nextProps.file)
		}
	}
	paintPDFPage(){
		const pdf = this.state.pdf
		if(pdf.pdfInfo){
			let totalPage = pdf.pdfInfo.numPages
			for(let i = 1;i<=totalPage;i++){
				let canvas = this.refs[`page-${i}`]
				paintWaterMask(canvas)
				pdf.getPage(i).then(page => {
					var scale = 1
					var viewport = page.getViewport(scale)
					var context = canvas.getContext('2d')
					var devicePixelRatio = window.devicePixelRatio || 1
					var backingStoreRatio = context.webkitBackingStorePixelRatio ||
                            context.mozBackingStorePixelRatio ||
                            context.msBackingStorePixelRatio ||
                            context.oBackingStorePixelRatio ||
                            context.backingStorePixelRatio || 1
					canvas.width = viewport.width
					canvas.height = viewport.height
					var ratio = devicePixelRatio / backingStoreRatio
					if (devicePixelRatio !== backingStoreRatio) {

				        var oldWidth = canvas.width;
				        var oldHeight = canvas.height;

				        canvas.width = oldWidth * ratio;
				        canvas.height = oldHeight * ratio;

				        canvas.style.width = oldWidth + 'px';
				        canvas.style.height = oldHeight + 'px';

				        // now scale the context to counter
				        // the fact that we've manually scaled
				        // our canvas element
				        context.scale(ratio, ratio);

				    }
					var renderContext = {
				      canvasContext: context,
				      viewport: viewport
				    }
					var renderTask = page.render(renderContext)

					renderTask.then(function () {
				      console.log('Page rendered');
					  paintWaterMask(canvas)
				    })
				})
			}
		}
	}

	componentDidUpdate(){
		this.paintPDFPage()
		document.oncontextmenu=new Function("event.returnValue=false;");
		document.onselectstart=new Function("event.returnValue=false;");
	}
	render(){
		const {pdf} = this.state
		let totalPage = 0
		if(pdf.pdfInfo){
			totalPage = pdf.pdfInfo.numPages
		}
		return (
			<div className={styles.container}>
			{_.range(1,totalPage+1).map(v => {
				return (
					<canvas className={styles.canvas} ref={`page-${v}`}  key={`page-${v}`}></canvas>
				)
			})}
			</div>
		)
	}
}
