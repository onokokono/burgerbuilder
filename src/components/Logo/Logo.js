import React from 'react';
import burgerLogo from '../../assets/images/burgerLogo.png';
import css from './Logo.module.css';

const logo = props =>{
    return (
        <div className={css.Logo}>
            <img src={burgerLogo} alt='logo' ></img>
        </div>
    );
};

export default logo;