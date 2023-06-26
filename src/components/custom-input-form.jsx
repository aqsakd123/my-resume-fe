import {Form} from "antd";
import Input from "antd/es/input/Input";
import {Box, useTheme} from "@mui/material";
import {tokens} from "../theme";
import TextArea from "antd/es/input/TextArea";

const CustomInput = (props) => {
    const {isView, label, coverStyle, name, rules, style, ...restProps} = props
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Form.Item
            label={label}
            name={name}
            rules={rules}
            style={{ marginBottom: '0px', width : "100%", ...coverStyle }}
        >
            <Input
                className={`input-custom-resume${isView ? '-disabled' : ''}-${theme.palette.mode}`}
                readOnly={isView}
                style={{color: colors.primary[100], cursor: 'auto', ...style}}
                {...restProps}/>
        </Form.Item>
    );
};

export default CustomInput;
