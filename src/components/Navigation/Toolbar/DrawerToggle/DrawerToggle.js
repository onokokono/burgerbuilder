import React from 'react';
import css from './DrawerToggle.module.css';

const drawerToggle = props => {
    return (
        <div className={css.DrawerToggle} onClick={props.toggleDrawer}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};

export default drawerToggle;