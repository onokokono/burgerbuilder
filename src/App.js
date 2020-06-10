import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionTypes from './store/actions/index';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

const asyncCheckout = asyncComponent( () => import('./containers/Checkout/Checkout'));
const asyncAuth = asyncComponent(() => import('./containers/Auth/Auth'));
const asyncOrders = asyncComponent(() => import('./containers/Orders/Orders'));

class App extends Component {
  componentDidMount() {
    this.props.autoTryLogin();
  }

  render() {

    let router = (
      <Switch>
        <Route path='/auth' component={asyncAuth} />
        <Route path='/' exact component={BurgerBuilder} />
        <Redirect to='/' />
      </Switch>
    );

    if (this.props.isAuth) {
      router = (
        <Switch>
          <Route path='/checkout' component={asyncCheckout} />
          <Route path='/orders' component={asyncOrders} />
          <Route path='/logout' component={Logout} />
          <Route path='/auth' component={asyncAuth} />
          <Route path='/' exact component={BurgerBuilder} />
          <Redirect to='/' />
        </Switch>
      );
    };

    return (
      <div>
        <Layout>
          {router}
        </Layout>
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token ? true : false
  }
}

const mapDispatchToProps = dispatch => {
  return {
    autoTryLogin: () => dispatch(actionTypes.authCheckState())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
