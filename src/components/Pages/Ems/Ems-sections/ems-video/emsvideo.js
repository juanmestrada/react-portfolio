import React from 'react';
import classes from './emsvideo.module.scss';

const emsVideo = () => (
    <div className={classes.EmsVideo}>
        <video src='emsvr1.mp4' crossOrigin="anonymous" autoPlay loop={true} muted preload="false" webkit-playsinline="true" playsInline={true} ></video>
    </div>
);

export default emsVideo;