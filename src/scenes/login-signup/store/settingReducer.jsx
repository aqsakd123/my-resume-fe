import {ADD_COUNT_REFRESH_TIME, SETTING_USER_INFO} from "./action-constant";

const initialValue = {
    logged: false,
    refreshTime: 0
}

const userReducer = (state = initialValue, action) => {
    switch (action.type) {
        case SETTING_USER_INFO:
            return {
                ...state,
                ...action.payload
            }
        case ADD_COUNT_REFRESH_TIME:
            return {
                ...state,
                refreshTime: state.refreshTime + 1
            }
        default:
            return state
    }
}

export const selectUserInfo = (state) => state.users

export default userReducer

