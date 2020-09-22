import { SET_ALERT, REMOVE_ALERT } from '../type';
const initialState = [];

export default function(state = initialState, action){
    const { type, payload} = action ;

    switch(type){
        case SET_ALERT:
            return [...state, payload  /*ค่าใหม่ที่ถูกส่งมา setState */];
        case REMOVE_ALERT :
            return state.filter(alert => alert.id !== payload);
        default:
            return state  /*ใช้ state เดิมที่ไม่มีการเปลี่ยนค่า */;
    }
}