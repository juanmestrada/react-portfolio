import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NavigationItem.module.scss';

const navigationItem = (props) => {
    return (
        <li className={classes.NavigationItem} >
            <NavLink to={props.link} exact={props.exact} activeClassName={classes.active} value={props.children} onMouseOver={ () => props.onMouseEnter(props.value) } {...props}>{props.children}</NavLink>
        </li>
    )
}
    
export default navigationItem;
