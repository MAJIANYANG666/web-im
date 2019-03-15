import React, { Component } from "react";
import Avator from "@component/common/avator";
import { showDialog, closeDialog } from "@component/common/dialog";
import { Link } from "react-router";
import "./index.css";
import {connect} from 'react-redux';
import {setCurrentSession} from '@data/actions/session';

export default class sessionList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            friendList: [],
            showPanel: false
        };
    }
    componentWillMount() {
        sdk.conn.listen({
            onOpened: message => {
                //连接成功回调
                this.getRosters();
            },
            onRoster: message => {
                this.getRosters();
            },
            onPresence: message => {
                this.handlePresence(message);
            }
        });
    }
    handlePresence = message => {
        //对方收到请求加为好友
        if (message.type === "subscribe") {
            // 显示同意/拒绝面板
            this.subscribeMessage = message;
            //   this.setState({
            //     showPanel: true,
            // });
            this.showPresenceDialog();
        }
    };
    showPresenceDialog = () => {
        let message = this.subscribeMessage;
        showDialog({
            title: "好友申请",
            content: (
                <div>
                    <div>{message.from}邀请你加为好友</div>
                    <div>留言：{message.status}</div>
                </div>
            ),
            footer: (
                <div>
                    <button className="reject" onClick={this.reject}>
                        拒绝
                    </button>
                    <button className="agree" onClick={this.agree}>
                        同意
                    </button>
                </div>
            )
        });
    };
    agree = () => {
        let message = this.subscribeMessage;
        sdk.conn.subscribed({
            to: message.from,
            message: "[resp:true]"
        });
        sdk.conn.subscribe({
            //需要反向添加对方好友
            to: message.from,
            message: "[resp:true]"
        });
        //   this.setState({
        //     showPanel: false
        // });
        closeDialog();
    };
    reject = () => {
        let message = this.subscribeMessage;
        sdk.conn.unsubscribe({
            to: message.from,
            message: "rejectAddFriend"
        });
        //   this.setState({
        //     showPanel: false
        // });
        closeDialog();
    };
    getRosters = () => {
        sdk.conn.getRoster({
            success: rosters => {
                rosters = rosters.filter(roster => {
                    return (
                        roster.subscription === "both" ||
                        roster.subscription === "to"
                    );
                });

                this.setState({
                    friendList: rosters
                });
            },
            error: e => {
                alert(e);
            }
        });
    };
    render() {
        let { friendList, showPanel } = this.state;
        let message = this.subscribeMessage;
        let {chatId} = this.props
        return (
            <div className="sessionlist">
                {friendList.length
                    ? friendList.map(friend => {
                      let isSelected = friend.name ===chatId;
                          return (
                              <SessionItem friend={friend} key={friend.name} isSelected = {isSelected}/>
                          );
                      })
                    : null}
                {/* {showPanel ? (
                    <Dialog
                        className=""
                        title="好友申请"
                        content={
                            <div>
                                <div>{message.from}邀请你加为好友</div>
                                <div>留言：{message.status}</div>
                            </div>
                        }
                        footer={
                            <div>
                                <button
                                    className="reject"
                                    onClick={this.reject}
                                >
                                    拒绝
                                </button>
                                <button className="agree" onClick={this.agree}>
                                    同意
                                </button>
                            </div>
                        }
                    />
                ) : null} */}
            </div>
        );
    }
}

@connect(
  (state) => ({

  }),
  {
    setCurrentSession
  }
)

class SessionItem extends Component {
  itemClick = () =>{
    let {setCurrentSession,friend} = this.props;
    setCurrentSession(friend)
  }

    render() {
        let { friend, isSelected} = this.props;
        console.log(111)
        console.log(friend)
        let url = `chat/single/${friend.name}`
        return <div className={ isSelected ? "session-item-outer selected":"session-item-outer"}>
        <Link to={url} className="session-item" onClick={this.itemClick}>
          <div className="ctn-avator">
            <Avator/>
          </div>
          <div className="session-inner">
            <div className="name">{friend.name}</div>
            <div className="msg-preview"></div>
          </div>    
        </Link>  
        </div>;
    }
}
