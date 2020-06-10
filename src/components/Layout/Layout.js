import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import css from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';

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
                <Toolbar isAuth={this.props.isAuthenticated} toggleDrawer={this.sideDrawerToggleHanler} />
                <SideDrawer
                    isAuth={this.props.isAuthenticated}
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

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token ? true : false
    }
}

export default connect(mapStateToProps)(Layout);