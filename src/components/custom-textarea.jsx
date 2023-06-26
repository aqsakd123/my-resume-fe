import {Form, Tabs} from "antd";
import Input from "antd/es/input/Input";
import {Box, useTheme} from "@mui/material";
import {tokens} from "../theme";
import TextArea from "antd/es/input/TextArea";

const CustomTextArea = (props) => {
    const {row, isView, placeholder, name, rules, style, formStyle, formProps, ...restProps} = props
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <>
                <Form.Item
                    name={name}
                    rules={rules}
                    style={{ marginBottom: '0px', width: '100%', ...formStyle }}
                    {...formProps}
                >
                    <TextArea
                        readOnly={isView}
                        className={`input-custom-resume${isView ? '-disabled' : ''}-${theme.palette.mode}`}
                        placeholder={placeholder}
                        autoSize={{
                            minRows: row || 1,
                            maxRows: 20,
                        }}
                        style={{color: colors.primary[100], ...style}}
                        {...restProps}
                    />
                </Form.Item>
        </>

    );
};

export default CustomTextArea;
