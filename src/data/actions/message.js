import {GET_MSGS, SEND_TEXT_MSG, CHANGE_MSG_STATUS,createAction} from './actiontypes'

export let addTextMessage = createAction(SEND_TEXT_MSG, 'to', 'msg');

export function sendTextMessage(to, text, chatType) {
  return (dispatch, getState)=>{
    let id = sdk.conn.getUniqueId();                 // 生成本地消息id
    let msg = new WebIM.message('txt', id);      // 创建文本消息
    msg.set({
        msg: text,                  // 消息内容
        to: to,                          // 接收消息对象（用户id）
        roomType: false,
        success: function (id, serverMsgId) {
            dispatch(addTextMessage(to,msg))
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