import React from 'react';
import {  Route, Switch, Redirect, withRouter } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import CompareProducts from './Containers/CompareProducts';
import Product from './Containers/Product';
import Home from './Home';
import GlobalHeader from './Globals/GlobalHeader';

const history = createHistory();

export default class App extends React.Component {
  render() {
    return (
      <div>
        <GlobalHeader />
        <Switch>
          <Route exact path='/' component={CompareProducts} />
          <Route exact path='/product' component={Product} />
        </Switch>
      </div>
    )
  }
}