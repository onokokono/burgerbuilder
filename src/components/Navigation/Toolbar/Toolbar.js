import React from 'react'
import Logo from '../../Logo/Logo';
import css from './Toolbar.module.css'
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../Toolbar/DrawerToggle/DrawerToggle';

const toolbar = props => {
    return (
        <header className={css.Toolbar}>
            <DrawerToggle toggleDrawer={props.toggleDrawer} > MENU </DrawerToggle>
            <div className={css.Logo} >
                <Logo />
            </div>
            <nav className={css.DesktopOnly} >
                <NavigationItems />
            </nav>
        </header>
    );
};

export default toolbar;