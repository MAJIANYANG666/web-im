import React, { Component } from 'react';
import Dialog from '@component/common/dialog';
import './index.css'

export default class sessionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friendList: [
      ],
      showPanel: false,
    }
    
  }
  componentWillMount() {
    sdk.conn.listen({
      onOpened: ( message ) => {          //连接成功回调
        this.getRosters();
      },
      onRoster: function ( message ) {
        this.getRosters();
      },
      onPresence: (message) => {
        this.handlePresence(message);
    }  
     } ) 
      
  }
  handlePresence = (message) => {
     //对方收到请求加为好友
  if (message.type === 'subscribe') {
    // 显示同意/拒绝面板
    this.setState({
      showPanel: true,
    })
    this.subscribeMessage = message;
  }
  }
  agree = () => {
    let message = this.subscribeMessage;
    sdk.conn.subscribed({
      to: message.from,
      message : '[resp:true]'
    });
    sdk.conn.subscribe({//需要反向添加对方好友
      to: message.from,
      message : '[resp:true]'
    });
    this.setState({
      showPanel: false
  });
  }
  reject = () => {
    let message = this.subscribeMessage;
    sdk.conn.unsubscribe({
      to: message.from,
      message : 'rejectAddFriend'
    });
    this.setState({
      showPanel: false
  });
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
    let {friendList, showPanel} = this.state
    let message = this.subscribeMessage;
    return (
      <div className="sessionlist"> 
        {friendList.length ? friendList.map((friend)=>{
          return <SessionItem friend = {friend} key = {friend.name}/>
        }): null}
        {showPanel ? <Dialog className=""
         title = "好友申请" 
        content = {
          <div>
            <div>{message.from}邀请你加为好友</div>
            <div>留言：{message.status}</div>
          </div>
          }
        footer = {
          <div>
            <button className="reject" onClick = {this.reject}>拒绝</button>
            <button className="agree" onClick = {this.agree}>同意</button> 
          </div> 
        }
          />:null
        }
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