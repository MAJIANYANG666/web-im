import React, { Component } from 'react';
import BubblePanel from './bubblepanel'
import SessionList from './sessionlist'
import SlideBar from './slidebar'
import {connect} from 'react-redux';

import './index.css'

import {init} from '@data/actions/message'

@connect(()=>({

}),{
  init
})

export default class Chat extends Component {
  componentWillMount(){
    this.props.init()
  }
  render() {
    console.log(this.props)
    let {params} = this.props
    return (
      <div className="ctn-chat"> 
        <div>
          <SlideBar/>
          <SessionList chatType={params.chatType} chatId={params.chatId}/>
          {params.chatId? <BubblePanel chatType = {params.chatType} chatId = {params.chatId}/>: null}
        </div>
      </div> 
    )
  }
}