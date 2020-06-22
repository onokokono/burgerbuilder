import React, { useState } from 'react';
import Aux from '../../hoc/Aux';
import css from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

const Layout = (props) => {

    const [displayBackdrop, setDisplayBackdrop] = useState(false);

    const sideDrawerClosedHandler = () => {
        setDisplayBackdrop(false);
    }

    const sideDrawerToggleHanler = () => {
        setDisplayBackdrop(!displayBackdrop);
    }

    return (
        <Aux>
            <Toolbar isAuth={props.isAuthenticated} toggleDrawer={sideDrawerToggleHanler} />
            <SideDrawer
                isAuth={props.isAuthenticated}
                display={displayBackdrop}
                backdropClick={sideDrawerClosedHandler}
            />
            <main className={css.Content}>
                {props.children}
            </main>
        </Aux>
    );
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token ? true : false
    }
}

export default connect(mapStateToProps)(Layout);