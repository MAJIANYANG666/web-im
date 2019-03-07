import React, { Component } from "react";
import { getToken } from "@utils/token";
import Icon from "@component/common/Icon";
import Avator from '@component/common/avator';
import {showDialog, closeDialog} from "@component/common/dialog";
import './index.css'

export default class SliderBar extends Component {
  state = {
    showPanel: false
  }
  showAddRosterPanel = () => {
    showDialog({
      content: 
        <div className = "input-container">
          <input type="text" ref={(ins)=>{this.nickname=ins}} placeholder="输入名字"/>
        </div>,
      
      footer:
        <div className="footer">
          <button className="btn" onClick={this.addRoster}>确定</button>
        </div>,
      // onCLose = {1}
      title:"添加好友"
    })
    // this.setState({
    //   showPanel:true
    // })
  }
  addRoster = () => {
    sdk.conn.subscribe({
      to: this.nickname.value,
      message: '加个好友呗!'   
  });
    closeDialog()
    // this.setState({
    //   showPanel: false
    // })
  }
    render() {
        console.log(getToken());
        let tokenUser = getToken();
        let username = tokenUser ? tokenUser.user.username : "";
        let {showPanel} = this.state;
        return (
            <div className="slidebar">
                <div className="profile">
                    <div className="app-item">
                        <Avator/>
                    </div>
                    <div className="name">{username}</div>
                </div>
                <div className="menus">
                    <div className="app-item chat">
                        <Icon type="chat" />
                    </div>
                    <div className="app-item group">
                        <Icon type="hc-im-an-artist-and-" />
                    </div>
                </div>
                <div className="footer">
                    <div className="app-item setting" onClick= {this.showAddRosterPanel}>
                        <Icon type="setting" />
                    </div>
                </div>
                {/* {showPanel ? <Dialog 
                  content= {
                    <div className = "input-container">
                      <input type="text" ref="nickname" placeholder="输入名字"/>
                    </div>
                  }
                  footer={
                    <div className="footer">
                      <button className="btn" onClick={this.addRoster}>确定</button>
                    </div>
                  }
                  // onCLose = {1}
                  title="添加好友">

                </Dialog>: null} */}
            </div>
        );
    }
}
