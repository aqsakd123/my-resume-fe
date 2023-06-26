import {RUN_SPIN, SETTING_CHANGE_LANGUAGE, SETTING_TOGGLE_THEME, STOP_SPIN} from "./action-constant";

const toggleTheme = () => ({
    type: SETTING_TOGGLE_THEME
})

const changeLanguageState = (payload) => ({
    type: SETTING_CHANGE_LANGUAGE,
    payload: payload
})

const runSpin = () => ({
    type: RUN_SPIN,
})

const stopSpin = () => ({
    type: STOP_SPIN,
})


export { toggleTheme, changeLanguageState, runSpin, stopSpin }