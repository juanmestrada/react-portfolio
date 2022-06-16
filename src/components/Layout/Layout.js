import React from 'react';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import classes from './Layout.module.css';
import DrawerToggle from '../Navigation/SideDrawer/DrawerToggle/DrawerToggle';

const layout = (props) => {
    return (
        <React.Fragment>
            <Toolbar  {...props} />
            <DrawerToggle {...props}/>
                <main className={classes.Content}>
                    {props.children}
                </main>
        </React.Fragment>
    )
};

export default layout;