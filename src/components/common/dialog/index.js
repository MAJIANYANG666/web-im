import React, { Component } from "react";
import classnames from "classnames";
import ReactDOM from 'react-dom';
import Icon from '@component/common/Icon';

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
        let {show } = this.state
        // let classNames = classnames({
        //     'tooltip': true,
        //     [type]: type
        // });
        return (
          <div>
           {show ? <div className="dialog-outer">
               {showMask ? <div className="mask"></div> : null}
                <div className="dialog-inner">
                    <div className="close" onClick={this.close}>
                        <Icon type="closesstyle2"/>
                    </div>
                    <div className="title-container">{title}</div>
                    <div className="content-container">{content}</div>
                    <div className="footer-container">{footer}</div>
                </div>
            </div>:null}
          </div>
        );
    }
}

let d;
export function showDialog(props) {
    if (d) {
        closeDialog();
    }
    d = document.createElement('div');
    document.body.appendChild(d);
    ReactDOM.render(<Dialog {...props}/>, d);
    
}
export function closeDialog() {
    if (d) {
        ReactDOM.unmountComponentAtNode(d); //要添加
        d.parentNode.removeChild(d);
        d = null;
    }
}
