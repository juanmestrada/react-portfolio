import React from 'react';
import classes from './DrawerToggle.module.scss';
import NavigationItems from '../../NavigationItems/NavigationItems';

const drawerToggle = (props) => {
    let attachedClasses = [classes.DrawerToggle, classes.Close];
    if (props.open) {
        attachedClasses = [classes.DrawerToggle, classes.Open];
    }
    return (
    <div className={attachedClasses.join(' ')} onClick={props.menuToggleClicked}>
        <NavigationItems onMouseEnter={props.onMouseEnter} />
    </div>
)
};

export default drawerToggle;