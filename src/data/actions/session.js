import {SET_CURRENT_SESSION, createAction} from './actiontypes';


export let setCurrentSession = createAction(SET_CURRENT_SESSION,'session')
export let setRosters = createAction(SET_ROSTERS. 'rosters')



export function getRosters() {
  return (dispatch, getState) =>{
    return new Promise((resolve, reject) => {
          sdk.conn.getRoster({
            success: rosters => {
                rosters = rosters.filter(roster => {
                    return (
                        roster.subscription === "both" ||
                        roster.subscription === "to"
                    );
                });
                dispatch(setRosters(rosters))
                resolve(rosters)
            },
            error: e => {
              reject(e);
            }
        });
    })
  }
}