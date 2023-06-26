import {Box} from "@mui/material";
import LoginForm from "../component/login";
import SignUpForm from "../component/signup";

export const tabItemList = [
    {
        label: <h2 style={{ width: '200px', display: 'flex', justifyContent: 'center' }}>Login</h2>,
        key: '1',
        children:
            <Box sx={{ paddingTop: "50px" }}>
                <LoginForm />
            </Box>
    },
    {
        label: <h2 style={{ width: '200px', display: 'flex', justifyContent: 'center' }}>Sign Up</h2>,
        key: '2',
        children:
            <Box sx={{ paddingTop: "50px" }}>
                <SignUpForm />
            </Box>
    },
]
