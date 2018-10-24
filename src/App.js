import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom'
import Auth from './containers/Auth/Auth'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" component={Auth} />
      </Switch>
    );
  }
}

export default App;
