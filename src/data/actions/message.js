import {GET_MSGS, SEND_TEXT_MSG, CHANGE_MSG_STATUS,createAction} from './actiontypes'
import {getToken} from '@utils/token'
import { getRosters,changeRosterWithMsg} from './session';
import eventEmitter from '@util/event';


export let addTextMessage = createAction(SEND_TEXT_MSG, 'to', 'msg');

function addTextMessageWithRosterChange(to,msg) {
  return (dispatch) => {
    dispatch(addTextMessage(to,msg))
    dispatch(changeRosterWithMsg(msg))
  }
}
export function init() {
  return (dispatch, getState)=>{
  sdk.conn.listen({
            onOpened: message => {
                //连接成功回调
                dispatch(getRosters());
            },
            onTextMessage: (message) =>{
              message.value = message.value || message.data
              dispatch(addTextMessageWithRosterChange(message.from,message))
            },
            onRoster: message => {
              dispatch(getRosters());
            },
            onPresence: message => {
                // this.handlePresence(message);
                eventEmitter.emit('presence',message)
            }
        });
  }
}

export function sendTextMessage(to, text, chatType) {
  return (dispatch, getState)=>{
    let id = sdk.conn.getUniqueId();                 // 生成本地消息id
    let msg = new WebIM.message('txt', id);      // 创建文本消息
    msg.set({
        msg: text,                  // 消息内容
        to: to,                          // 接收消息对象（用户id）
        roomType: false,
        success: function (id, serverMsgId) {
          msg.fromMe = true;
          msg.from = getToken().user.username;
            dispatch(addTextMessageWithRosterChange(to,msg))
        },
        fail: function(e){
            console.log("Send private text error");
        }
    });
    msg.body.chatType = chatType;
    sdk.conn.send(msg.body);
  }
}


/**
 *
 *  获取to的聊天消息
 * @export
 * @param {*} to
 */
export function getMsgs(to) {

}

/**
 *  
 *  改变消息的状态
 *  比如对方看到后显示已经看过，没看过下方显示消息未读
 * @export
 * @param {*} mid
 */
export function changeMessageStatus(mid) {

}