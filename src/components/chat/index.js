import React, { Component } from 'react';
import BubblePanel from './bubblepanel'
import SessionList from './sessionlist'
import SlideBar from './slidebar'

import './index.css'

export default class Chat extends Component {
  render() {
    console.log(this.props)
    return (
      <div className="ctn-chat"> 
        <div>
          <SlideBar/>
          <SessionList/>
          <BubblePanel/>
        </div>
      </div> 
    )
  }
}