import { createSlice } from "@reduxjs/toolkit";
import i18n from "i18next";
import {RUN_SPIN, SETTING_CHANGE_LANGUAGE, SETTING_TOGGLE_THEME, STOP_SPIN} from "./action-constant";

const initialValue = {
    theme: "dark",
    language: "",
    spin: false,
}

const settingReducer = (state = initialValue, action) => {
    switch (action.type) {
        case SETTING_TOGGLE_THEME:
            return {
                ...state,
                theme: state.theme === 'light'? 'dark' : "light"
            }
        case SETTING_CHANGE_LANGUAGE:
            return {
                ...state,
                language: action.payload
            }
        case RUN_SPIN:
            return {
                ...state,
                spin: true
            }
        case STOP_SPIN:
            return {
                ...state,
                spin: false
            }
        default:
            return state
    }
}

export const selectSetting = (state) => state.settings

export default settingReducer

