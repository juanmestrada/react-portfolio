import React from 'react';
import classes from './NavigationItems.module.scss';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact value="home" {...props} >Home</NavigationItem>
        <NavigationItem link="/project1" value="social" {...props}>Trummi</NavigationItem>
        <NavigationItem link="/project2" value="cs" {...props}>Citadelscandal</NavigationItem>
        <NavigationItem link="/project3" value="warehouse" {...props}>Warehouse</NavigationItem>
        <NavigationItem link="/project4" value="ems" {...props}>EMS</NavigationItem>
        <NavigationItem link="/project5" value="covid" {...props}>Covid News</NavigationItem>
        <NavigationItem link="/contact" value="contact" {...props}>Contact</NavigationItem>
    </ul>  
);

export default navigationItems;