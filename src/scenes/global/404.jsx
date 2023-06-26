import { useNavigate } from "react-router-dom"
import {Box} from "@mui/material";
import {useEffect} from "react";
import {useLocation} from "react-router-dom";

const Page404 = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);
    const location = useLocation()

    const goToResumeList = () => navigate('/resume')

    useEffect(() => {
        const searchParams = new URLSearchParams(location?.search);
        if(searchParams?.get('uuid')){
            navigate('/static-resume/detail/' + searchParams?.get('uuid'))
        }
    }, [])

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <img src={"assets/404.png"} alt={'404'} style={{ width: '50%', height: '50%', borderRadius: '10px' }}/>
        </Box>
    )
}

export default Page404
