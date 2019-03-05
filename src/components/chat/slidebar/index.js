import React, { Component } from "react";
import { getToken } from "@utils/token";
import Icon from "@component/common/Icon";

import './index.css'

export default class SliderBar extends Component {
    render() {
        console.log(getToken());
        let tokenUser = getToken();
        let username = tokenUser ? tokenUser.user.username : "";
        return (
            <div className="slidebar">
                <div className="profile">
                    <div className="app-item avator">
                        <Icon type="user" />
                    </div>
                    <div>{username}</div>
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
                    <div className="app-item setting">
                        <Icon type="setting" />
                    </div>
                </div>
            </div>
        );
    }
}
