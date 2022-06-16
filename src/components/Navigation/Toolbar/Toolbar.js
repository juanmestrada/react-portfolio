import React from 'react';
import classes from './Toolbar.module.scss';
import Logo from '../../Logo/Logo';
import { NavLink } from 'react-router-dom';

const toolbar = (props) => {
    let attachedClasses = [classes.menucontainer];
    if (props.open) {
        attachedClasses = [classes.menucontainer, classes.change];
    }
    return (
        <header className={classes.Toolbar}>
        <div className={classes.Logo}>
            <NavLink to="/">
                <Logo />
            </NavLink>
        </div>
        <div className={attachedClasses.join(' ')}  onClick={() => props.menuToggleClicked()}>
            <div className={classes.bar1}></div>
            <div className={classes.bar2}></div>
            <div className={classes.bar3}></div>
        </div>
    </header>
    )    
};

export default toolbar;