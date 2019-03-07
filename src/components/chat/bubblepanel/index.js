import React, { Component } from 'react';
import Trans from "@component/common/trans";
import './index.css'
export default class bubblePanel extends Component {
  state = {
    time : new Date().toLocaleString()
  }
  componentDidMount(){
    this.timer = setInterval(()=>{
      this.setState({
        time:new Date().toLocaleString()
      })
    },1000)
  }
  componentWillUnmount() {
    clearInterval(this.timer)
  }
  render() {
    let { time } = this.state
    return (
      <div className="bubblePanel"> 
        {time}
        <Trans/>
      </div> 
    )
  }
}