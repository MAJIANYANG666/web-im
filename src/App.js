import React, { Component } from 'react';
import logo from './logo.svg';
import SignUp from './components/sign/singup';
import {Provider} from 'react-redux';
import {connect} from 'react-redux';

import store from './data/create';

import './App.css';
@connect(
  state => ({
      loginState: state.sign.loginState
  }),
  {

  }
)
class App extends Component {
  // componentWillReceiveProps() {
    
  // }
  render() {
    return (
      <div className="main">
          <SignUp />
      </div>
    );
  }
}

export default class Main extends Component {
  render() {
    return (
      <Provider store={store}>
          <App />
      </Provider>
    )
  }
}

