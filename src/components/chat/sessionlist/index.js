import React, { Component } from 'react';
import './index.css'

export default class sessionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friendList: [
        {
          jid: 'asemo',
          name: 'test1',
          subscription: 'both'
        }
      ]
    }
    
  }
  componentWillMount() {
    sdk.conn.listen({
      onOpened: ( message ) => {          //连接成功回调
        this.getRosters();
      },
     } ) 
      
  }
  getRosters = () => [
    sdk.conn.getRoster({
      success: (rosters) => {
        rosters = rosters.filter((roster)=>{
          return roster.subscription === 'to'|| roster.subscription === 'to' 
        })

        this.setState({
          friendList: rosters
        })
      },
      error: (e)=>{
        alert(e)
      }
    })
  ]
  render() {
    let {friendList} = this.state
    return (
      <div className="sessionlist"> 
        {friendList.length ? friendList.map((friend)=>{
          return <SessionItem friend = {friend} key = {friend.name}/>
        }): null}
      </div> 
    )
  }
}

class SessionItem extends Component {
  render(){
    let {friend} = this.props
    return (
      <div className="session-item">
        {friend.name}
      </div>       
    )
  }
}