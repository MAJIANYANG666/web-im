import React, { Component } from "react";

import {connect} from 'react-redux'
import "./index.css";

@connect(
  (state)=>({
    currentSession: state.session.current,
  })

)
export default class BubblePanel extends Component {
    render() {
      let {currentSession} = this.props;
        return (
            <div className="ctn-bubblepanel">
                <div className="title">
                {currentSession ? currentSession.name : ''}
                </div>
                <div className="ctn-msgList" ></div>
                <div className="ctn-msg-sender">
                  <textarea placeholder="输入消息"/>
                  <button className="button">发送</button>
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
