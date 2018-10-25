import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom'
import Auth from './containers/Auth/Auth'
import Registration from './containers/Registration/Registration'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={Auth} />
        <Route path="/registration" component={Registration} />
      </Switch>
    );
  }
}

export default App;
