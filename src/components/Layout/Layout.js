import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import css from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        displayBackdrop: false
    };

    sideDrawerClosedHandler = () => {
        this.setState({ displayBackdrop: false })
    }

    sideDrawerToggleHanler = () => {
        this.setState( prevState => ({displayBackdrop: !prevState.displayBackdrop}) );
    }

    render() {
        return (
            <Aux>
                <Toolbar toggleDrawer={this.sideDrawerToggleHanler} />
                <SideDrawer
                    display={this.state.displayBackdrop}
                    backdropClick={this.sideDrawerClosedHandler}
                />
                <main className={css.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

export default Layout;