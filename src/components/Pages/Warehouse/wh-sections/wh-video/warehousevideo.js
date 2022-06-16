import React from 'react';
import classes from './warehousevideo.module.scss';

const warehouseVideo = () => (
    <div className={classes.warehouseVideo}>
        <video src='warehousevr.mp4' crossOrigin="anonymous" autoPlay loop={true} muted preload="false" webkit-playsinline="true" playsInline={true} ></video>
    </div>
);

export default warehouseVideo;