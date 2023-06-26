import {ADD_COUNT_REFRESH_TIME, SETTING_USER_INFO} from "./action-constant";

const settingUserInfo = (payload) => ({
    type: SETTING_USER_INFO,
    payload: payload
})

const addCountRefreshTime = () => ({
    type: ADD_COUNT_REFRESH_TIME,
})

export { settingUserInfo, addCountRefreshTime }