import React from 'react';
import {  Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import CompareProducts from './Containers/CompareProducts';
import Product from './Containers/Product';
// import Home from './Home';
import GlobalHeader from './Globals/GlobalHeader';
import GlobalFooter from './Globals/GlobalFooter';

// const history = createHistory();

export default class App extends React.Component {
<<<<<<< 7f385c55c8d7cd41166ced1707ec22f94c0e0c38

  componentDidMount() {
    //localStorage.clear();
  }
=======
  // componentDidMount() {
  //   localStorage.clear();
  // }
>>>>>>> refactored redux actions and reducers to handle loading states more efficiently

  render() {
    return (
      <div>
        <GlobalHeader />
        <Switch>
          <Route exact path='/' component={CompareProducts} />
          <Route exact path='/product/:slug' component={Product} />
        </Switch>
        <GlobalFooter />
      </div>
    )
  }
}
