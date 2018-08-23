import agent from '../agent';

import React from 'react';
import { connect } from 'react-redux';

import {  Route, Switch, Redirect } from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import ProductPage from './Containers/ProductPage';
import Home from './Home';
import GlobalHeader from './Globals/GlobalHeader';

import {Container} from 'semantic-ui-react';

const history = createHistory();

const mapStateToProps = function(state) {
  return ({
    ...state.main
  })
}

const mapDispatchToProps = dispatch => ({
  onLoad: () =>
    dispatch({ type: 'APP_LOAD' })
})

class App extends React.Component {

  componentDidMount() {
    //localStorage.clear();
    this.props.onLoad();
  }

  render() {
    return (
      <div>
      <Container>
      <GlobalHeader />
        <Switch>
          <Route exact path='/' component={ProductPage} />
          <Route exact path='/home' component={Home} />
        </Switch>
        </Container>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
