import React, { Component } from 'react';
import logo from './logo.svg';
import {Provider} from 'react-redux';
import store from './data/create';
import { Router, Route, IndexRoute } from "react-router";
import './App.css';
import history from '@history/history.js'

import SignUp from '@component/sign/singup';
import Login from '@component/sign/login';
import Chat from '@component/chat';
import {getToken} from '@utils/token.js'
class App extends Component {
  // componentWillReceiveProps() {
    
  // }
  componentWillMount(){
    let token = getToken()
    if(token) {
      //什么都不做
    }else{
      history.push('/login')
    }
  }
  render() {
    return (
      <div className="main">
          {this.props.children}
      </div>
    );
  }
}
/**
 *  #hash
 *  /login -> 登录页面
 *  /signup -> 注册页面
 *  /chat -> 聊天页面
 *  /chat/single/:uid -> 单聊
 *  /chat/group/:uid -> 群聊
 *  memory
 *      类似tab
 *  hash
 *    hashChange
 *    location.hash='#123'
 *    location.hash='#234'
 *    window.onhashChange = function () {console.log(location.hash)}
 *  browser
 *    history.pushState/replaceState
 *    history.popState
 *    服务端支持
 */
export default class Main extends Component {
  render() {
    return (
      <Provider store={store} history>
        <Router history={history}>
          <Route path="/" component = {App}>
            <Route path="/signup" component = {SignUp}></Route>
            <Route path="/login" component = {Login}></Route>
            <Route path="/chat" component = {Chat}></Route>
            <Route path="/chat/:chatType/:chatId" component = {Chat}></Route>   
          </Route>
        </Router>
      </Provider>
    )
  }
}

