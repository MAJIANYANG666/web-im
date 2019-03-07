import React, { Component } from 'react';
import './index.css'
export default class Trans extends Component {
  state ={
    value: ''
  }
  transTime = () => {
    let { value } = this.textContent
    this.textContent.value = value.toUpperCase()
  }
  transTime2 = (e) =>{
    this.setState({
      value: e.target.value.toUpperCase()
    })
  }
  render () {
    let {value} = this.state
    return (
      <div className="transtime">
        <h2>非受控组件</h2>  
        <input type="text" onChange={this.transTime} ref={(ins)=>{this.textContent = ins}}/>
        <h2>受控组件</h2>
        <input type="text" onChange={this.transTime2} value={value} />
      </div>
    )
  }
}