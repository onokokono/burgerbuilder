import React from 'react';
import css from './NavigationItems.module.css';
import Navigationitem from './NavigationItem/NavigationItem';

const navigationItems = props => {
    return (
        <ul className={css.NavigationItems}>
            <Navigationitem exact link='/' active>  BurgerBuilder  </Navigationitem>
            <Navigationitem link='/orders'>  Orders  </Navigationitem>
        </ul>
    );
};

export default navigationItems;