import React, { Component } from "react";
import classnames from "classnames";

import "./index.css";
export default class Dialog extends Component {
    static defaultProps = {
      showMask:true
    };
    state = {
      show: true
    };

    componentDidMount() {

    }

    close = () => {
      this.setState({
        show:false
      })
      let {onClose} = this.props;
      onClose && onClose();
    }
    render() {
        let { title, content, footer, showMask } = this.props;
        // let classNames = classnames({
        //     'tooltip': true,
        //     [type]: type
        // });
        return (
            <div className="dialog-outer">
               {showMask ? <div className="mask"></div> : null}
                <div className="dialog-inner">
                    <div className="close" onClick={this.close}>
                        关闭
                    </div>
                    <div className="title-container">{title}</div>
                    <div className="content-container">{content}</div>
                    <div className="footer-container">{footer}</div>
                </div>
            </div>
        );
    }
}
