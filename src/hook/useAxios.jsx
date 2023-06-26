import {useEffect} from "react";
import {axiosPrivate} from "../axios";
import useRefreshToken from "./useRefreshToken";
import {errorInfo, getJwtToken} from "../common/common-function";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const jwtExpiredCode = "JWT.EXPIRED"
    const jwtWrong = "JWT.WRONG"

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    const jwtToken = getJwtToken()
                    const authController = ["/register", "/signIn", "/refresh", "/signOut"]
                    if (jwtToken && jwtToken !== "null" && (!authController.includes(config.url)) ) {
                        config.headers['Authorization'] = `Bearer ${jwtToken}`;
                    }
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.data?.message) {
                    if (error?.response?.data?.message === jwtExpiredCode && error?.response?.status === 401) {
                        const newAccessToken = await refresh();
                        if(!newAccessToken) {
                            errorInfo('CHANGE JWT FAILED')
                        }
                        prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                        return axiosPrivate(prevRequest);
                    } else if (error?.response?.data?.message === jwtWrong && error?.response?.status === 401){
                        errorInfo(jwtWrong)
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
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [refresh])

    return axiosPrivate;
}

export default useAxiosPrivate;
