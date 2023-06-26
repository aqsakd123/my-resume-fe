import {tokens} from "../../theme";
import {Box} from "@mui/material";

const Welcome = ({}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box>
            <h1>Welcome</h1>
            Hello user, you can use this website to create you CV-web version and CV-PDF version.
            For further information, please press Take Tour button.
        </Box>

    );
};

export default Welcome;
