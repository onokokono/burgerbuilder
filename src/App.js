import React, { useEffect, Suspense } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionTypes from './store/actions/index';

const Checkout = React.lazy(() => import('./containers/Checkout/Checkout'));
const Auth = React.lazy(() => import('./containers/Auth/Auth'));
const Orders = React.lazy(() => import('./containers/Orders/Orders'));

const App = (props) => {

  useEffect(() => {
    props.autoTryLogin();

  }, [props]);

  let router = (
    <Switch>
      <Route path='/auth' render={(props) => <Auth {...props} />} />
      <Route path='/' exact component={BurgerBuilder} />
      <Redirect to='/' />
    </Switch>
  );

  if (props.isAuth) {
    router = (
      <Switch>
        <Route path='/checkout' render={(props) => <Checkout {...props} />} />
        <Route path='/orders' render={(props) => <Orders {...props} />} />
        <Route path='/logout' component={Logout} />
        <Route path='/auth' render={(props) => <Auth {...props} />} />
        <Route path='/' exact component={BurgerBuilder} />
        <Redirect to='/' />
      </Switch>
    );
  };

  return (
    <div>
      <Layout>
        <Suspense fallback={<p> Loading... </p>} >
          {router}
        </Suspense>
      </Layout>
    </div>
  );

}

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
