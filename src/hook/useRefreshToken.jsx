import axios from "../axios";
import {getUserInfo, setJwtToken} from "../common/common-function";

const useRefreshToken = () => {
    const refresh = async () => {
        const payload = getUserInfo()
        const response = await axios.post('/refresh', payload);
        setJwtToken(response?.data)
        return response?.data?.token;
    }
    return refresh;
};

export default useRefreshToken;
