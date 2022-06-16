import React from 'react';
import classes from './Ems.module.scss';
import EmsVideo from './Ems-sections/ems-video/emsvideo';
import EmsAbout from './Ems-sections/ems-about/emsabout';

const ems = () => (
    <div className={classes.Ems}>
        <EmsVideo />
        <EmsAbout />
    </div>
);

export default ems;