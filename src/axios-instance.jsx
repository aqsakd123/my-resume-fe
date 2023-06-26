import axios from 'axios'
import {errorInfo, getJwtToken, getUserInfo, logOut, setJwtToken, successInfo} from "./common/common-function";

axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';

const localStorageItem = "auth_token"
const jwtExpiredCode = "JWT.EXPIRED"
const jwtWrong = "JWT.WRONG"

const axiosInstance = axios.create()

axiosInstance.interceptors.request.use(
    (config) => {
        if (!config.headers['Authorization']) {
            const jwtToken = getJwtToken()
            const authController = ["/register", "/signIn", "/refresh", "/signOut"]
            if (jwtToken && jwtToken !== "null" && (!authController.includes(config.url)) ) {
                config.headers['Authorization'] = `Bearer ${jwtToken}`;
            }
        }
        return config
    },
(error) => {
        return Promise.reject(error)
    }
)

axiosInstance.interceptors.response.use(
    (config) => {
        return config
    },
    async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.data?.message) {
            if (error?.response?.data?.message === jwtExpiredCode && error?.response?.status === 401) {
                const payload = getUserInfo()
                const res = await axiosInstance.post("/refresh", payload)
                    .catch(r => {
                        errorInfo('CHANGE_JWT_FAILED')
                    })
                setJwtToken(res?.data)
                let newAccessToken = res?.data?.token
                if(!newAccessToken) {
                    errorInfo('CHANGE_JWT_FAILED')
                }
                prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return axiosInstance(prevRequest);
            } else if (error?.response?.data?.message === jwtWrong && error?.response?.status === 401){
                errorInfo(jwtWrong)
                // process delete all user info and navigate to logout page
            } else {
                errorInfo(error?.response?.data?.message)
            }
        } else if (error?.response?.status !== 401) {
            let msg
            switch (error?.response?.status) {
                case 403:
                    msg = 'NO_PERMISSION'
                    break;
                case 413:
                    msg = 'TOO_LARGE_CALL'
                    break;
                default:
                    msg = 'ERROR_OCCURRED'
            }
            errorInfo(msg)
        }

        return Promise.reject(error);
    }
)

export default axiosInstance;
