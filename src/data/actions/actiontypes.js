// export function regStatus(state) {
//     return {
//         type: REG_START_CHANGE,
//         payload: {
//             state: state
//         }
//     }
// }

// export const regStatus = createAction(REG_START_CHANGE,'state','dsc','asd')
// regStatus(3,2,1)

export function createAction(type, ...actionArgs) {
    return (...args) => {
        let action = {type: type, payload: {}};
        actionArgs.forEach((arg, index) => {
            action.payload[actionArgs[index]] = args[index];
        });
        return action;
    }
}
// sessions
export const REG_STATE_CHANGE = 'reg_state_change';

export const SET_CURRENT_SESSION = 'set_current_session';

export const SET_ROSTERS = 'set_rosters'

export const SEND_TEXT_MSG = 'send_text_msg';

export const GET_MSGS = 'get_msgs';

export const CHANGE_MSG_STATUS = 'change_msg_status';