import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';

import Layout from './hoc/Layout/Layout';
import StartPage from './containers/StartPage/StartPage';
import OrderBuilder from './containers/OrderBuilder/OrderBuilder';
import Checkout from './containers/Checkout/Checkout';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import Orders from './containers/Orders/Orders';

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }
  
  render() {
    let routes = (
      <Switch>
        <Route path="/" exact component={StartPage} />
        <Route path="/auth" component={Auth} />
        <Route path="/soups" render={() => (
              <OrderBuilder menuPart={"soups"} />
        )}/>
        <Route path="/kidsMenu" render={() => (
              <OrderBuilder menuPart={"kidsMenu"} />
        )}/>
        <Route path="/mainCourse" render={() => (
              <OrderBuilder menuPart={"mainCourse"} />
        )}/>
        <Route path="/desserts" render={() => (
              <OrderBuilder menuPart={"desserts"} />
        )}/>
        <Route path="/checkout" component={Checkout} />
        <Redirect to="/" />
      </Switch>
    );

    if(this.props.isAuth) {
      routes = (
        <Switch>
          <Route path="/" exact component={StartPage} />
          <Route path="/orders" component={Orders} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={Auth} />
          <Route path="/soups" render={() => (
                <OrderBuilder menuPart={"soups"} />
          )}/>
          <Route path="/kidsMenu" render={() => (
                <OrderBuilder menuPart={"kidsMenu"} />
          )}/>
          <Route path="/mainCourse" render={() => (
                <OrderBuilder menuPart={"mainCourse"} />
          )}/>
          <Route path="/desserts" render={() => (
                <OrderBuilder menuPart={"desserts"} />
          )}/>
          <Route path="/checkout" component={Checkout} />
          <Redirect to="/" />
        </Switch>
      )
    }

    return (
      <div className="App">
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);