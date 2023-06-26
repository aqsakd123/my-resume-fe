import {message, notification} from "antd";
import {t} from "i18next";
import {request} from "../axios-instance";
import {signOut} from "../scenes/login-signup/service/service";
import Page404 from "../scenes/global/404";
import {Button} from "@mui/material";

const localStorageItem = "auth_token"

message.config({
    maxCount: 3,
});

export function successInfo(value, callback) {
    const content =
        <>
            <span>{t(`MESSAGE.${value}`)}</span>
            {callback &&
            <Button variant="text" size={"small"} onClick={(...props) => {
                callback(...props)
                notification.destroy()
            }}>Undo</Button>
            }
        </>
    notification.success({
        description: content,
        message: t('NOTIFICATION'),
        duration: callback? 30 : 5,
        style: { top: '50px' }
    })
}

export function errorInfo(value) {
    if (value) {
        const content = t(`MESSAGE.${value}`)
        message.error({ className: 'message-top-bar', content: content })
    }
}

export const getJwtToken = () => {
    return JSON.parse(window.localStorage.getItem(localStorageItem))?.token
}

export const getUserInfo = () => {
    if (window.localStorage.getItem(localStorageItem)) {
        const user = JSON.parse(window.localStorage.getItem(localStorageItem))
        return user
    }
    return null
}

export const setJwtToken = (item) => {
    return window.localStorage.setItem(localStorageItem, JSON.stringify(item))
}

export const logOut = async () => {
    try {
        await signOut()
        localStorage.removeItem(localStorageItem)
    } catch (error) {
        errorInfo(error?.response?.data?.message)
    }
}

export function checkAuthorize(component, allowRolesList){
    const user = getUserInfo()
    if (user) {
        return component
    }
    return <Page404 />
}