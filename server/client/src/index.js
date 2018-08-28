import App from './components/App';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import React from 'react';
import store from './store';

import { BrowserRouter as Router, Route } from 'react-router-dom';

ReactDOM.render((
  <Provider store={store}>
    <Router>
      <Route component={App} />
    </Router>
  </Provider>
), document.getElementById('root'));
