import React from 'react';
import css from './NavigationItems.module.css';
import Navigationitem from './NavigationItem/NavigationItem';

const navigationItems = props => {
    return (
        <ul className={css.NavigationItems}>
            <Navigationitem exact link='/' active>  BurgerBuilder  </Navigationitem>

            {props.isAuth ? <Navigationitem link='/orders'>  Orders  </Navigationitem> : null}
            
            {props.isAuth ?
                <Navigationitem link='/logout'> Logout </Navigationitem>
                : <Navigationitem link='/auth'> Auth </Navigationitem>}
        </ul>
    );
};

export default navigationItems;