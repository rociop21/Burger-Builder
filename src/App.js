import React, {Component} from 'react';
import './App.css';
import { connect } from 'react-redux';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { BrowserRouter as Router, Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Checkout from './containers/Checkout/Checkout';
import SignUp from './containers/Auth/SignUp';
import SignIn from './containers/Auth/SignIn';
import Orders from './containers/Orders/Orders';
import LogOut from './containers/Auth/LogOut';
import * as actions from './store/actions/index';

class App extends Component {

  componentDidMount () {
    this.props.onAutoLogIn();
  }

  render () {

    let routes = (
      <Switch>
        <Route exact path="/" component={BurgerBuilder}/>
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route exact path="/" component={BurgerBuilder}/>
          <Route path="/checkout" component={Checkout}/>
          <Route path="/signup" component={SignUp} />
          <Route path="/logout" component={LogOut} />
          <Route path="/orders" component={Orders} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
    <Router>
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    </Router>
  );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.logIn.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAutoLogIn: () => dispatch(actions.checkState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
