import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import CoverResume from "./components/cover-resume";
import ResumeForm from "./resume-form";
import './style/style-resume.css'

const MyResume = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box>
            <ResumeForm/>
        </Box>
    );
};

export default MyResume;
