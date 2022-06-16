import React from 'react';
import classes from './Warehouse.module.css';
import WarehouseVideo from './wh-sections/wh-video/warehousevideo';
import WarehouseAbout from './wh-sections/wh-about/warehouseabout';

const warehousePage = () => (
    <div className={classes.Warehouse}>
        <WarehouseVideo />
        <WarehouseAbout />
    </div>
);

export default warehousePage;