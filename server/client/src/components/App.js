import React from 'react';
import { connect } from 'react-redux';
import {  Route, Switch, Redirect } from 'react-router-dom';
import CompareProducts from './Containers/CompareProducts';
import Product from './Containers/Product';
import Home from './Home';
import GlobalHeader from './Globals/GlobalHeader';
import GlobalFooter from './Globals/GlobalFooter';

import { resetRedirect } from '../actions/Main';

const navRoutes = [
  {
    path: '/compare',
    component: CompareProducts
  },
  {
    path: '/product/:slug',
    component: Product
  },
]

const mapStateToProps = state => ({
  ...state.Main
})

const mapDispatchToProps = dispatch => ({
  resetRedirect: () => dispatch(resetRedirect())
})

class App extends React.Component {


  componentDidMount() {
    localStorage.clear();
  }

  render() {
    if (this.props.redirectTo != null) {
      this.props.resetRedirect();
      return ( <Redirect to={this.props.redirectTo} push={false} /> );
    }
    return (
      <div>
        <Route path={[...navRoutes.map(route => route.path)]} component={GlobalHeader} />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/compare' component={CompareProducts} />
          <Route exact path='/product/:slug' component={Product} />
        </Switch>
        <GlobalFooter />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
