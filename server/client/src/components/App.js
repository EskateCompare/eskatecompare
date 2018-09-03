import React from 'react';
import {  Route, Switch } from 'react-router-dom';
import CompareProducts from './Containers/CompareProducts';
import Product from './Containers/Product';
import Home from './Home';
import GlobalHeader from './Globals/GlobalHeader';
import GlobalFooter from './Globals/GlobalFooter';

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

class App extends React.Component {
  componentDidMount() {
    localStorage.clear();
  }

  render() {
    return (
      <div>
        <Route path={[...navRoutes.map(route => route.path)]} component={GlobalHeader} />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/compare' component={CompareProducts} />
          <Route path='/product/:slug' component={Product} />
        </Switch>
        <GlobalFooter />
      </div>
    )
  }
}

export default App
