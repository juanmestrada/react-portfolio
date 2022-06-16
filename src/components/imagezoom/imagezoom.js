import React from 'react';
import classes from './imagezoom.module.scss'

const Imgzoom = (props) => {
	return (
		<div  className={[classes.Scroll, classes[props.trans]].join(' ')} style={{
			opacity: props.trans === 'exiting' ? 0 : 1
		}}>
			<img src='vrheadset.gif' alt='vr'/>
		</div>
	)
};

export default Imgzoom;