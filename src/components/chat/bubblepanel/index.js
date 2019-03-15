import React, { Component } from "react";

import { connect } from "react-redux";
import { sendTextMessage } from "@data/actions/message";
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
      let {msglist, currentSession} = this.props;
      return msglist[currentSession.name] || [];
    };
    render() {
        let { currentSession } = this.props;
        let msgs = this.getMsgs();
        return (
            <div className="ctn-bubblepanel">
                <div className="title">
                    {currentSession ? currentSession.name : ""}
                </div>
                <div className="ctn-msgList">
                    { msgs.map(msg => {
                        return <div key={msg.id}>{msg.value}</div>;
                    })}
                </div>
                <div className="ctn-msg-sender">
                    <textarea placeholder="输入消息" ref="msginput" />
                    <button className="button" onClick={this.sendTextMessage}>
                        {" "}
                        发送
                    </button>
                </div>
            </div>
        );
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
