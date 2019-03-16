import React, { Component } from "react";

import { connect } from "react-redux";
import Avator from "@component/common/avator";
import { sendTextMessage } from "@data/actions/message";
import classnames from "classnames";
import "./index.css";

@connect(
    state => ({
        currentSession: state.session.current,
        msglist: state.message.msglist
    }),
    {
        sendTextMessage
    }
)
export default class BubblePanel extends Component {
    sendTextMessage = () => {
        let { sendTextMessage, chatType, currentSession } = this.props;
        sendTextMessage(
            currentSession.name,
            this.refs.msginput.value,
            chatType
        );
        this.refs.msginput.value = "";
    };
    getMsgs = () => {
        let { msglist, currentSession } = this.props;
        if (!currentSession) {
            return [];
        }
        return msglist[currentSession.name] || [];
    };
    render() {
        let { currentSession } = this.props;

        debugger
        let msgs = this.getMsgs();
        console.log(msgs.length)
        return (
            <div className="ctn-bubblepanel">
                <div className="title">
                    {currentSession ? currentSession.name : ""}
                </div>
                <div className="ctn-msglist">
                    <div className="ctn-msglist-inner">
                        { msgs.map(msg => {
                            return <BubbleItem key={msg.id} msg= {msg}></BubbleItem>;
                        }) }
                    </div>
                </div>
                <div className="ctn-msg-sender">
                    <textarea placeholder="输入消息" ref="msginput" />
                    <button className="button" onClick={this.sendTextMessage}>
                        发送
                    </button>
                </div>
            </div>
        );
    }
}

class BubbleItem extends Component {
  render() {
    let {msg} = this.props;
    let fromMe = true;

    let messageItemClassName = classnames({
      'message-item':true,
      'you': !fromMe,
      'me': fromMe
    })
    console.log(123)
    return (

      <div className = {messageItemClassName}>
        {!fromMe ? <div className={messageItemClassName}>
          <Avator/>>
        </div> : null}
        <div className="message-item-inner">
          <div className="name">
            {fromMe ? msg.from : msg.to}
          </div>
          <div className="message-text">
            {msg.value}
          </div>
        </div>
        {fromMe ? <div className="avator-outer">
          <Avator/>
        </div> : null}
      </div>
    )
  }
}

// import React, { Component } from 'react';
// import Trans from "@component/common/trans";
// import './index.css'
// export default class bubblePanel extends Component {
//   state = {
//     time : new Date().toLocaleString()
//   }
//   componentDidMount(){
//     this.timer = setInterval(()=>{
//       this.setState({
//         time:new Date().toLocaleString()
//       })
//     },1000)
//   }
//   componentWillUnmount() {
//     clearInterval(this.timer)
//   }
//   render() {
//     let { time } = this.state
//     return (
//       <div className="bubblePanel">
//         {time}
//         <Trans/>
//       </div>
//     )
//   }
// }
