import { Box, useTheme } from "@mui/material";
import {Tabs} from "antd";
import {tabItemList} from "./common/common-data";
import styled from "@emotion/styled";

const StyledTabs = styled.div`
                width: 100%; 
                display: flex; 
                justify-content: center; 
                align-items: center;
                
                .ant-tabs {
                    width: 50%;
                    border: 5px solid rgb(211 183 206 / 60%);
                    background-color: whitesmoke;
                    border-radius: 10px;
                    padding: 50px;
                }

                .ant-tabs-tab-active .ant-tabs-tab-btn{
                    color: white !important;
                    padding-left: 10px';
                    padding-right: 10px;
                    border-radius: 10px;
                    text-decoration: underline;
                    background-color: orange;
                },
`

const LoginSignupTab = () => {
    const theme = useTheme();

    return (
        <StyledTabs>
            <Tabs
                defaultActiveKey="1"
                type="card"
                size={"large"}
                items={tabItemList}
            />
        </StyledTabs>
    );
};

export default LoginSignupTab;
