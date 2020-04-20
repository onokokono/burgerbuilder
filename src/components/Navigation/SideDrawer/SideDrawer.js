import React from 'react';
import css from './SideDrawer.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux';

const sideDrawer = props => {

    return (
        <Aux>
            <Backdrop display={props.display} backdropClick={props.backdropClick}  />
            <div className={ [css.SideDrawer, props.display ? css.Open : css.Close].join(' ') } >
                <div className={css.Logo} >
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>

    );
};

export default sideDrawer;